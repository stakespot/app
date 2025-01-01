import type { Chain } from "thirdweb";
import { avalancheFuji, polygonAmoy, EDUCHAIN_TESTNET } from "./chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";

  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

/**
 * Below is a list of all NFT contracts supported by your marketplace(s)
 * This is of course hard-coded for demo purpose
 *
 * In reality, the list should be dynamically fetched from your own data source
 */
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0x8D9A34C98080bCe0B5d11be22ed2eDB610be3E21",
    chain: EDUCHAIN_TESTNET,
    title: "Capyfriends",
    thumbnailUrl:
      "https://framerusercontent.com/images/TjVkBA9zUvNrhiK8tZvKRyVNJA.png?scale-down-to=1024",
    type: "ERC721",
  },


];
