"use client";

import { Stack, Text, Button, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import HeroImage from "./HeroImage";
import { CollectionDetails } from "./CollectionDetails";
import { NFTGrid } from "./NFTGrid";
import { FilterButtons } from "./FilterButtons";

const Card = ({ title, price, volume, offer, listed, owners }: any) => (
    <Box
        width={{ base: "100%", md: "240px" }}
        borderWidth="1px"
        borderColor="#EBEBEB"
        borderRadius="10px"
        overflow="hidden"
    >
        <Box height="240px" bg="#F3F3F3" />
        <Stack spacing="12px" p="16px">
            <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="16px" color="#000000">
                    {title}
                </Text>
                <Text fontWeight="bold" fontSize="16px" color="#000000">
                    #{123}
                </Text>
            </Flex>
            <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="16px" color="#0008FF">
                    {price} ETH
                </Text>
                <Text fontWeight="medium" fontSize="14px" color="#000000">
                    Volume: {volume} ETH
                </Text>
            </Flex>
            <Flex justify="space-between" align="center">
                <Text fontWeight="medium" fontSize="14px" color="#000000">
                    Offer: {offer} WETH
                </Text>
                <Text fontWeight="medium" fontSize="14px" color="#000000">
                    Listed: {listed} / Owners: {owners}
                </Text>
            </Flex>
        </Stack>
    </Box>
);

export default function Marketplace1() {
    const nftData = [
        { title: "Capy Friends", id: 123, price: 0.356, currency: "ETH" },
        { title: "Capy Friends", id: 124, price: 0.456, currency: "ETH" },
        { title: "Capy Friends", id: 125, price: 0.556, currency: "ETH" },
        { title: "Capy Friends", id: 126, price: 0.656, currency: "ETH" },
        { title: "Capy Friends", id: 123, price: 0.356, currency: "ETH" },
        { title: "Capy Friends", id: 124, price: 0.456, currency: "ETH" },
        { title: "Capy Friends", id: 125, price: 0.556, currency: "ETH" },
        { title: "Capy Friends", id: 126, price: 0.656, currency: "ETH" },
    ];

    return (
        <Stack spacing="24px" maxWidth="100vw" mx="auto">
            <HeroImage />
            <CollectionDetails />

            {/* Filters */}
            <FilterButtons />

            {/* NFT Grid */}
            <NFTGrid items={nftData} />

        </Stack>
    );
}