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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
    NATIVE_TOKEN_ADDRESS,
    getContract,
    sendAndConfirmTransaction,
    sendTransaction,
    toTokens,
} from "thirdweb";
import { allowance, approve, decimals } from "thirdweb/extensions/erc20";
import { makeOffer } from "thirdweb/extensions/marketplace";
import {
    useActiveWalletChain,
    useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
    tokenId: bigint;
    account: Account;
};

export function MakeOffer({ tokenId, account }: Props) {
    const priceRef = useRef<HTMLInputElement>(null);
    const qtyRef = useRef<HTMLInputElement>(null);
    const expirationRef = useRef<HTMLInputElement>(null);
    const switchChain = useSwitchActiveWalletChain();
    const activeChain = useActiveWalletChain();
    const [currency, setCurrency] = useState<Token>();
    const toast = useToast();
    const {
        nftContract,
        marketplaceContract,
        refetchAllListings,
        type,
        supportedTokens,
    } = useMarketplaceContext();

    const chain = marketplaceContract.chain;
    const marketplaceAddress = marketplaceContract.address as `0x${string}`;

    const nativeToken: Token = {
        tokenAddress: NATIVE_TOKEN_ADDRESS,
        symbol: chain.nativeCurrency?.symbol || "NATIVE TOKEN",
        icon: NATIVE_TOKEN_ICON_MAP[chain.id] || "",
    };
    const options: Token[] = [nativeToken, ...supportedTokens];


    const handleMakeOffer = async () => {
        const value = priceRef.current?.value;
        const expiration = expirationRef.current?.value;

        if (!value || !expiration) {
            return toast({
                title: "Missing Information",
                description: "Please enter both a price and expiration date for the offer.",
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }

        if (!currency) {
            return toast({
                title: "Select Currency",
                description: "Please select a currency for the offer.",
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }

        if (activeChain?.id !== nftContract.chain.id) {
            await switchChain(nftContract.chain);
        }


        const quantity = BigInt(qtyRef.current?.value ?? 1);
        console.log("Quantity:", quantity);

        if (type === "ERC1155" && quantity <= 0n) {
            return toast({
                title: "Invalid Quantity",
                description: "Quantity must be greater than zero.",
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }

        const totalOfferAmount = value;
        console.log("Total offer amount:", totalOfferAmount);


        try {
            if (currency.tokenAddress !== NATIVE_TOKEN_ADDRESS) {
                const customTokenContract = getContract({
                    address: currency.tokenAddress as `0x${string}`,
                    client: marketplaceContract.client,
                    chain: nftContract.chain,
                });

                const spender = marketplaceAddress;
                const currentAllowance = await allowance({
                    contract: customTokenContract,
                    owner: account.address,
                    spender,
                });

                const approveTx = approve({
                    contract: customTokenContract,
                    spender,
                    amount: totalOfferAmount,
                });
                await sendAndConfirmTransaction({ transaction: approveTx, account });

            }

            const offerParams = {
                assetContractAddress: nftContract.address as `0x${string}`,
                tokenId,
                quantity: type === "ERC721" ? 1n : quantity,
                currencyContractAddress: currency?.tokenAddress as `0x${string}`,
                totalOffer: value,
                offerExpiresAt: new Date(expiration),
            };

            console.log("Making offer with params:", offerParams);

            const transaction = makeOffer({
                contract: marketplaceContract,
                ...offerParams,
            });

            await sendTransaction({ transaction, account });

            toast({
                title: "Offer Made",
                description: "Your offer has been successfully submitted.",
                status: "success",
                isClosable: true,
                duration: 5000,
            });
            refetchAllListings();
        } catch (error) {
            console.error("Error making offer:", error);
            toast({
                title: "Offer Failed",
                description: `An error occurred: ${(error as Error).message}`,
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }
    };

    return (
        <Flex direction="column" w={{ base: "90vw", lg: "430px" }} gap="10px">
            <Text>Price</Text>
            <Input type="number" ref={priceRef} placeholder="Enter offer price" />
            {type === "ERC1155" && (
                <>
                    <Text>Quantity</Text>
                    <Input type="number" ref={qtyRef} defaultValue={1} placeholder="Quantity to offer" />
                </>
            )}
            <Text>Expiration Date</Text>
            <Input type="datetime-local" ref={expirationRef} placeholder="Offer expiration date" />
            <Menu>
                <MenuButton minH="48px" as={Button} rightIcon={<ChevronDownIcon />}>
                    {currency ? (
                        <Flex direction="row">
                            <Image boxSize="2rem" borderRadius="full" src={currency.icon} mr="12px" />
                            <Text my="auto">{currency.symbol}</Text>
                        </Flex>
                    ) : (
                        "Select currency"
                    )}
                </MenuButton>
                <MenuList>
                    {options.map((token) => (
                        <MenuItem
                            minH="48px"
                            key={token.tokenAddress}
                            onClick={() => setCurrency(token)}
                            display="flex"
                            flexDir="row"
                        >
                            <Image boxSize="2rem" borderRadius="full" src={token.icon} ml="2px" mr="14px" />
                            <Text my="auto">{token.symbol}</Text>
                            {token.tokenAddress.toLowerCase() === currency?.tokenAddress.toLowerCase() && (
                                <CheckIcon ml="auto" />
                            )}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <Button isDisabled={!currency} onClick={handleMakeOffer}>
                Make Offer
            </Button>
        </Flex>
    );
}