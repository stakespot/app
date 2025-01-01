import { SimpleGrid, Box, VStack, Spinner, Text } from "@chakra-ui/react";
import { StakingCard } from "@/components/shared/Card";

interface NFTGridProps {
    nfts: any[];
    selectedNFTs: string[];
    toggleNFTSelection: (tokenId: string) => void;
    isUnstake?: boolean;
}

export function NFTGrid({ nfts, selectedNFTs, toggleNFTSelection, isUnstake = false }: NFTGridProps) {
    const len = nfts.length;
    const columns = {
        base: 1,
        sm: Math.min(len, 2),
        md: Math.min(len, 4),
        lg: Math.min(len, 4),
        xl: Math.min(len, 5),
    };

    return (
        <Box p={4} mx="auto" mt="20px" maxW={len <= 2 ? "600px" : "100%"}>
            <SimpleGrid columns={columns} spacing={4} justifyItems="start">
                {nfts.length > 0 ? (
                    nfts.map((nft) => (
                        <Box
                            key={nft.id.toString()}
                            width="240px" // Fixed width
                            borderWidth="1px"
                            borderColor="#EBEBEB"
                            borderRadius="10px"
                            overflow="hidden"
                            transition="transform 0.2s, box-shadow 0.2s"
                            transform="scale(1)"
                            boxShadow="base"
                            _hover={{
                                boxShadow: "xl",
                            }}
                            cursor="pointer"
                        >
                            <StakingCard
                                imageUrl={nft.metadata.image ?? ""}
                                title={nft.metadata.name ?? "Unknown NFT"}
                                onSelect={() => toggleNFTSelection(nft.id.toString())}
                                isSelected={selectedNFTs.includes(nft.id.toString())}
                                id={nft.id.toString()}
                                image={nft.metadata.image ?? ""}
                                href={`/nft/${nft.id.toString()}`}
                                isUnstake={isUnstake}
                            />
                        </Box>
                    ))
                ) : (
                    <VStack color="teal.600">
                        <Spinner color="colorPalette.600" borderWidth="6px" size="lg" />
                        <Text color="colorPalette.600">Loading NFT Collection...</Text>
                    </VStack>
                )}
            </SimpleGrid>
        </Box>
    );
}