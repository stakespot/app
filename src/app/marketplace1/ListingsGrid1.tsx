import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
    Box,
    Flex,
    SimpleGrid,
    useBreakpointValue,
    Text,
    useColorMode,
    useTheme,
} from "@chakra-ui/react";
import { MediaRenderer } from "thirdweb/react";

export function ListingGrid() {
    const { listingsInSelectedCollection, nftContract } = useMarketplaceContext();
    const len = listingsInSelectedCollection.length;
    const columns = useBreakpointValue({
        base: 1,
        sm: Math.min(len, 2),
        md: Math.min(len, 4),
        lg: Math.min(len, 4),
        xl: Math.min(len, 5),
    });

    const { colorMode } = useColorMode();
    const theme = useTheme();

    if (!listingsInSelectedCollection || !len) return <></>;

    return (
        <SimpleGrid columns={columns} spacing={4} p={4} mx="auto" mt="20px">
            {listingsInSelectedCollection.map((item) => (
                <Box
                    key={item.id}
                    rounded="12px"
                    as={Link}
                    href={`/collection/${nftContract.chain.id}/${nftContract.address}/token/${item.asset.id.toString()}`}
                    borderWidth={1}
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    borderColor={theme.colors.gray[200]}
                    bgGradient={colorMode === "light" ? "linear(to-br, brand.50, white)" : "linear(to-br, brand.800, gray.800)"}
                    transition="transform 0.2s, box-shadow 0.2s"
                    transform="scale(1)"
                    boxShadow="base"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "xl",
                    }}
                >
                    <Flex direction="column">
                        <MediaRenderer client={client} src={item.asset.metadata.image} />
                        <Text mt={2} fontSize="lg" fontWeight="bold">
                            {item.asset?.metadata?.name ?? "Unknown item"}
                        </Text>
                        <Text mt={1} fontSize="md" color="gray.500">
                            Price
                        </Text>
                        <Text mt={1} fontSize="md" fontWeight="bold">
                            {item.currencyValuePerToken.displayValue} {item.currencyValuePerToken.symbol}
                        </Text>
                    </Flex>
                </Box>
            ))}
        </SimpleGrid>
    );
}