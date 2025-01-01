import { defineChain } from "thirdweb";

export const EDUCHAIN_TESTNET = defineChain({
    id: 656476, // Replace with the actual chain ID
    name: "EDU Chain Testnet",
    nativeCurrency: {
        name: "EDU",
        symbol: "EDU",
        decimals: 18,
    },
    blockExplorers: [
        {
            name: "Blockscout",
            url: "https://edu-chain-testnet.blockscout.com",
            apiUrl: "https://edu-chain-testnet.blockscout.com/api/v2/",
        },
    ],
    testnet: true,
});

/**
 * All chains should be exported from this file
 */
export { avalancheFuji, sepolia, polygonAmoy } from "thirdweb/chains";

/**
 * Define any custom chain using `defineChain`
 */
export const example_customChain1 = defineChain(0.001); // don't actually use this

