import { NATIVE_TOKEN_ICON_MAP, Token } from "@/consts/supported_tokens";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  useToast,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { NATIVE_TOKEN_ADDRESS, sendAndConfirmTransaction } from "thirdweb";
import {
  isApprovedForAll as isApprovedForAll1155,
  setApprovalForAll as setApprovalForAll1155,
} from "thirdweb/extensions/erc1155";
import {
  isApprovedForAll as isApprovedForAll721,
  setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import { createListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  tokenId: bigint;
  account: Account;
};

export function CreateListing(props: Props) {
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const { tokenId, account } = props;
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const toast = useToast();

  const {
    nftContract,
    marketplaceContract,
    refetchAllListings,
    type,
    supportedTokens,
  } = useMarketplaceContext();
  const chain = marketplaceContract.chain;

  const nativeToken: Token = {
    tokenAddress: NATIVE_TOKEN_ADDRESS,
    symbol: chain.nativeCurrency?.symbol || "NATIVE TOKEN",
    icon: NATIVE_TOKEN_ICON_MAP[chain.id] || "",
  };

  const options: Token[] = [nativeToken].concat(supportedTokens);

  const currency = nativeToken; // Set "EDU" as the only option

  return (
    <Stack
      justify="flex-start"
      align="flex-start"
      spacing="12px"
      width="100%"
      maxWidth="500px" // Limit maximum width
      ml="0" // Center horizontally
      px="0px" // Padding for smaller screens
    >
      {/* Set Listing Price Section */}
      <Stack justify="flex-start" align="flex-start" spacing="12px" width="100%">
        <Stack direction="row" justify="flex-start" align="center" spacing="8px" width="100%">
          <Text fontWeight="medium" fontSize="14px" color="#767676">
            Set listing price
          </Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }} // Stack vertically on smaller screens
          justify="flex-start"
          align="center"
          spacing={{ base: "12px", md: "25px" }}
          width="100%"
          ml="0" // Align to the left
        >
          <Input
            type="number"
            ref={priceRef}
            placeholder="Enter a price"
            width="100%"
          />
          {type === "ERC1155" && (
            <Input
              type="number"
              ref={qtyRef}
              defaultValue={1}
              placeholder="Quantity to sell"
              width="100%"
            />
          )}
          <Button
            background="#FEFEFF"
            _hover={{ background: "#E0E0E0" }} // Hover effect
            padding="10px 20px"
            borderRadius="8px"
          >
            <Text fontWeight="medium" fontSize="16px" color="#767676" textAlign="center">
              EDU
            </Text>
          </Button>
          <Button
            variant="outline"
            borderColor="#0008FF"
            bg="#0008FF"
            color="#FFFFFF"
            size="lg"
            height="43px" // Added height
            width="200px" // Added width
            borderRadius="10px"
            onClick={async () => {
              const value = priceRef.current?.value;
              if (!value) {
                return toast({
                  title: "Please enter a price for this listing",
                  status: "error",
                  isClosable: true,
                  duration: 5000,
                });
              }
              if (!currency) {
                return toast({
                  title: `Please select a currency for the listing`,
                  status: "error",
                  isClosable: true,
                  duration: 5000,
                });
              }
              if (activeChain?.id !== nftContract.chain.id) {
                await switchChain(nftContract.chain);
              }
              const _qty = BigInt(qtyRef.current?.value ?? 1);
              if (type === "ERC1155") {
                if (!_qty || _qty <= 0n) {
                  return toast({
                    title: "Error",
                    description: "Invalid quantity",
                    status: "error",
                    isClosable: true,
                    duration: 5000,
                  });
                }
              }

              // Check for approval
              const checkApprove =
                type === "ERC1155" ? isApprovedForAll1155 : isApprovedForAll721;

              const isApproved = await checkApprove({
                contract: nftContract,
                owner: account.address,
                operator: marketplaceContract.address,
              });

              if (!isApproved) {
                const setApproval =
                  type === "ERC1155"
                    ? setApprovalForAll1155
                    : setApprovalForAll721;

                const approveTx = setApproval({
                  contract: nftContract,
                  operator: marketplaceContract.address,
                  approved: true,
                });

                await sendAndConfirmTransaction({
                  transaction: approveTx,
                  account,
                });
              }

              const transaction = createListing({
                contract: marketplaceContract,
                assetContractAddress: nftContract.address,
                tokenId,
                quantity: type === "ERC721" ? 1n : _qty,
                currencyContractAddress: currency?.tokenAddress,
                pricePerToken: value,
              });

              console.log("currency?.tokenAddress", currency?.tokenAddress);
              console.log("pricePerToken", value);

              await sendAndConfirmTransaction({
                transaction,
                account,
              });
              refetchAllListings();
            }}
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "16px" }}
              color="#FFFFFF"
              textAlign="center"
            >
              List now
            </Text>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}