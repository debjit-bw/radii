// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 0x42FF98C4E85212a5D31358ACbFe76a621b50fC02
// app_staging_880029eb1d4dcab87e776d2ed1a36be7
// abcd
// 0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD
// 1197

interface IWorldID {
	/// @notice Reverts if the zero-knowledge proof is invalid.
	/// @param root The of the Merkle tree
	/// @param groupId The id of the Semaphore group
	/// @param signalHash A keccak256 hash of the Semaphore signal
	/// @param nullifierHash The nullifier hash
	/// @param externalNullifierHash A keccak256 hash of the external nullifier
	/// @param proof The zero-knowledge proof
	/// @dev  Note that a double-signaling check is not included here, and should be carried by the caller.
	function verifyProof(
		uint256 root,
		uint256 groupId,
		uint256 signalHash,
		uint256 nullifierHash,
		uint256 externalNullifierHash,
		uint256[8] calldata proof
	) external view;
}

library ByteHasher {
	/// @dev Creates a keccak256 hash of a bytestring.
	/// @param value The bytestring to hash
	/// @return The hash of the specified value
	/// @dev `>> 8` makes sure that the result is included in our field
	function hashToField(bytes memory value) internal pure returns (uint256) {
		return uint256(keccak256(abi.encodePacked(value))) >> 8;
	}
}

contract Radii {
    mapping(address => uint32[]) public ProfileTags;

	uint64 public schemaId;
	ISP public immutable isp;

    struct AdvertPurchaseBid {
        uint256 bidId;
        string contentId;
        uint256 amountPaid;
        uint32[] tagsTargeted;
    }

    struct Advertisor {
        address advertiser;
        AdvertPurchaseBid[] adsPurchased;
        uint8 verificationLevel;
    }
    mapping(address => Advertisor) public Advertisers;

    event AdvertPurchased(address advertiser, string contentId, uint256 amountPaid, uint32[] tagsTargeted, uint64 attestationId);

    using ByteHasher for bytes;
    IWorldID internal immutable worldId;
    mapping(uint256 => bool) internal nullifierHashes;
    error DuplicateNullifier(uint256 nullifierHash);
    uint256 internal immutable groupId = 1;
    uint256 internal immutable externalNullifierHash;

	constructor(
		IWorldID _worldId, 
		string memory _appId, 
		string memory _actionId,
		address _sign_deployed_addr, // 0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD
		uint64 _schemaId // 239
	) {
		worldId = _worldId;
		externalNullifierHash = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
		isp = ISP(_sign_deployed_addr);
		schemaId = _schemaId;
	}

    function verifyOrbAndExecute(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public returns (bool) {
		// First, we make sure this person hasn't done this before
		if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);

		// We now verify the provided proof is valid and the user is verified by World ID
		worldId.verifyProof(
			root,
			groupId,
			abi.encodePacked(signal).hashToField(),
			nullifierHash,
			externalNullifierHash,
			proof
		);

		// We now record the user has done this, so they can't do it again (proof of uniqueness)
		nullifierHashes[nullifierHash] = true;

		// Finally, execute your logic here, for example issue a token, NFT, etc...
		// Make sure to emit some kind of event afterwards!
        Advertisers[signal].verificationLevel = 2;

        return true;
    }

    function addTagsToProfile(uint32[] calldata tags) public {
        for (uint32 i = 0; i < tags.length; i++) {
            ProfileTags[msg.sender].push(tags[i]);
        }
    }

    function removeTagsFromProfile(uint32[] calldata tags) public {
        for (uint32 i = 0; i < tags.length; i++) {
            for (uint32 j = 0; j < ProfileTags[msg.sender].length; j++) {
                if (ProfileTags[msg.sender][j] == tags[i]) {
                    ProfileTags[msg.sender][j] = ProfileTags[msg.sender][ProfileTags[msg.sender].length-1];
                    ProfileTags[msg.sender].pop();
                    break;
                }
            }
        }
    }

    function getTagsForProfile() public view returns (uint32[] memory) {
        return ProfileTags[msg.sender];
    }

    function purchaseAdvert(string calldata contentId, uint32[] calldata tagsTargeted, uint256 viewCount) public payable {
        uint256 expectedBidAmount = tagsTargeted.length * viewCount * 1000 gwei;
        // require(msg.value >= expectedBidAmount, "Insufficient funds to purchase advert");

        AdvertPurchaseBid memory newBid = AdvertPurchaseBid({
            bidId: Advertisers[msg.sender].adsPurchased.length,
            contentId: contentId,
            amountPaid: msg.value,
            tagsTargeted: tagsTargeted
        });

        Advertisers[msg.sender].adsPurchased.push(newBid);

        // Transfer the excess funds back to the sender
        if (msg.value > expectedBidAmount) {
            payable(msg.sender).transfer(msg.value - expectedBidAmount);
        }

        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(msg.sender);
        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: abi.encode(contentId, tagsTargeted, viewCount)
        });
        uint64 attestationId = isp.attest(a, "", "", "");

        // Emit an event to notify the advert purchase
        emit AdvertPurchased(msg.sender, contentId, msg.value, tagsTargeted, attestationId);
    }

    function getAllAdsForAdvertiser() public view returns (AdvertPurchaseBid[] memory) {
        return Advertisers[msg.sender].adsPurchased;
    }
}

contract Radius is ERC20 {
    uint constant _initial_supply = 100 * (10**18);  // setting variable for how many of your own tokens are initially put into your wallet, feel free to edit the first number but make sure to leave the second number because we want to make sure our supply has 18 decimals
    address[] admins;

    /* ERC 20 constructor takes in 2 strings, feel free to change the first string to the name of your token name, and the second string to the corresponding symbol for your custom token name */
    constructor() ERC20("Radius", "RADIUS") {
        _mint(msg.sender, _initial_supply);
        admins.push(msg.sender);
    }

    function addAdmin(address _admin) public {
        require(msg.sender == admins[0], "Only the owner can add an admin");
        admins.push(_admin);
    }

    function mintToAddress(address _to, uint256 _amount) public {
        // check if any of the admins are calling this function
        bool isAdmin = false;
        for (uint i = 0; i < admins.length; i++) {
            if (msg.sender == admins[i]) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Only admins can mint new tokens");

        _mint(_to, _amount);
    }
}