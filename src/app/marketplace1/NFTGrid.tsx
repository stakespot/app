import { Box, Grid, Stack, Text } from "@chakra-ui/react";

type NFTItemProps = {
    title: string;
    id: number | string;
    price: string | number;
    currency: string;
};

export const NFTItem: React.FC<NFTItemProps> = ({ title, id, price, currency }) => (
    <Box
        width="240px" // Fixed width
        height="360px" // Fixed height
        borderWidth="1px"
        borderColor="#EBEBEB"
        borderRadius="10px"
        overflow="hidden"
    >
        {/* Image Placeholder */}
        <Box
            height="240px"
            bg="#F3F3F3"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Text>Image</Text>
        </Box>

        {/* NFT Details */}
        <Stack
            px="16px"
            pt="18px"
            pb="24px"
            spacing="12px"
            justify="flex-start"
            align="flex-start"
            height="120px"
        >
            {/* Title and ID */}
            <Stack direction="row" justify="space-between" align="center" width="100%">
                <Text fontWeight="bold" fontSize="16px" color="#000000">
                    {title}
                </Text>
                <Text fontWeight="bold" fontSize="16px" color="#000000">
                    #{id}
                </Text>
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing="4px" align="center" width="100%">
                <Text fontWeight="bold" fontSize="16px" color="#0008FF">
                    {price}
                </Text>
                <Text fontWeight="bold" fontSize="16px" color="#0008FF">
                    {currency}
                </Text>
            </Stack>
        </Stack>
    </Box>
);

type NFTGridProps = {
    items: NFTItemProps[];
};

export const NFTGrid: React.FC<NFTGridProps> = ({ items }) => (
    <Grid
        templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap="20px"
        px={{ base: "16px", md: "80px" }}
    >
        {items.map((item) => (
            <NFTItem key={item.id} {...item} />
        ))}
    </Grid>
);