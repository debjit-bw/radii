import { http, createPublicClient, encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";
import {
    createSmartAccountClient,
    ENTRYPOINT_ADDRESS_V06,
} from "permissionless";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";

// Set this to the Node RPC URL from Step 1.
const rpcUrl = `https://api.developer.coinbase.com/rpc/v1/base-sepolia/${process.env.COINBASE_API_KEY}`;

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "mintToAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const publicClient = createPublicClient({
    transport: http(rpcUrl),
});

export const main = async (request) => {

    const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
        // Set this to your private key
        privateKey: process.env.PRIVATE_KEY,
        factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
        entryPoint: ENTRYPOINT_ADDRESS_V06,
    });

    const cloudPaymaster = createPimlicoPaymasterClient({
        chain: baseSepolia,
        transport: http(rpcUrl),
        entryPoint: ENTRYPOINT_ADDRESS_V06,
    });

    const smartAccountClient = createSmartAccountClient({
        account: simpleAccount,
        chain: baseSepolia,
        bundlerTransport: http(rpcUrl),
        // IMPORTANT: Set up Cloud Paymaster to sponsor your transaction
        middleware: {
            sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
        },
    });

    const callData = encodeFunctionData({
        abi: abi,
        functionName: "mintToAddress",
        args: [request.query.viewer, request.query.amount],
    });

    const txHash = await smartAccountClient.sendTransaction({
        account: smartAccountClient.account,
        to: "0x87DaDbc6636DF9507Ee59e0f6068b785969420D0",
        data: callData,
        value: 0n,
    });
    // console.log("✅ Transaction successfully sponsored!");
    // console.log(`🔍 View on Etherscan: https://sepolia.basescan.org/tx/${txHash}`);

    return txHash;
}