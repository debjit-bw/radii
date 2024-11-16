export const RADII_FHE_ABI = [
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    },
                    {
                        "internalType": "int32",
                        "name": "securityZone",
                        "type": "int32"
                    }
                ],
                "internalType": "struct inEuint32",
                "name": "t1",
                "type": "tuple"
            }
        ],
        "name": "addTagForProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "start",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "publicKey",
                "type": "bytes32"
            }
        ],
        "name": "fetchTagsForProfile",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]