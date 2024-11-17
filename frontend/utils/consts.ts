export const RADII_FHE_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "int32",
            name: "securityZone",
            type: "int32",
          },
        ],
        internalType: "struct inEuint32",
        name: "t1",
        type: "tuple",
      },
    ],
    name: "addTagForProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "profile",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "publicKey",
        type: "bytes32",
      },
    ],
    name: "fetchTagsForProfile",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const RADII_ABI = [
  {
    inputs: [
      {
        internalType: "contract IWorldID",
        name: "_worldId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_appId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_actionId",
        type: "string",
      },
      {
        internalType: "address",
        name: "_sign_deployed_addr",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "_schemaId",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "DuplicateNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "advertiser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contentId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32[]",
        name: "tagsTargeted",
        type: "uint32[]",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "attestationId",
        type: "uint64",
      },
    ],
    name: "AdvertPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "Advertisers",
    outputs: [
      {
        internalType: "address",
        name: "advertiser",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "verificationLevel",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ProfileTags",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[]",
        name: "tags",
        type: "uint32[]",
      },
    ],
    name: "addTagsToProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllAdsForAdvertiser",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bidId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amountPaid",
            type: "uint256",
          },
          {
            internalType: "uint32[]",
            name: "tagsTargeted",
            type: "uint32[]",
          },
        ],
        internalType: "struct Radii.AdvertPurchaseBid[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTagsForProfile",
    outputs: [
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isp",
    outputs: [
      {
        internalType: "contract ISP",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "contentId",
        type: "string",
      },
      {
        internalType: "uint32[]",
        name: "tagsTargeted",
        type: "uint32[]",
      },
      {
        internalType: "uint256",
        name: "viewCount",
        type: "uint256",
      },
    ],
    name: "purchaseAdvert",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32[]",
        name: "tags",
        type: "uint32[]",
      },
    ],
    name: "removeTagsFromProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "schemaId",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyOrbAndExecute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const RADII_CONTRACT = "0x845989d5D093Bd4d19BFA83A0400bd6074B2838C";

export const ORB_VERIFICATION = false;

export const WORLD_ID_APP_ID = "app_staging_880029eb1d4dcab87e776d2ed1a36be7";
