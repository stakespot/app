import { Box, Stack, Text, Flex, Button } from "@chakra-ui/react";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/consts/client";

interface StakingCardProps {
    id: string | number;
    image: string;
    title: string;
    href: string;
    onSelect: () => void;
    isSelected: boolean;
    isUnstake: boolean; // Changed to required boolean
    imageUrl: string; // Added imageUrl prop
}

export const StakingCard: React.FC<StakingCardProps> = ({
    id,
    image,
    title,
    href,
    onSelect,
    isSelected,
    isUnstake, // Changed to required boolean
    imageUrl, // Added imageUrl prop
}) => (
    <Box
        as="div"
        onClick={onSelect}
        width="240px" // Fixed width
        borderWidth="1px"
        borderColor={isSelected ? "#0008FF" : "#EBEBEB"}
        borderRadius="10px"
        overflow="hidden"
        transition="box-shadow 0.2s"
        boxShadow={isSelected ? "xl" : "base"}
        cursor="pointer"
        position="relative"
    >
        <Box
            height="240px"
            bg="#F3F3F3"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <MediaRenderer client={client} src={imageUrl} />
        </Box>
        <Stack
            paddingX="16px"
            paddingTop="18px"
            paddingBottom="24px"
            justify="flex-start"
            align="flex-start"
            spacing="12px"
            alignSelf="stretch"
        >
            <Flex justify="space-between" align="center" width="100%">
                <Text fontWeight="bold" fontSize="16px" color="#000000">
                    {title ?? "Unknown item"}
                </Text>
            </Flex>
        </Stack>
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 8, 255, 0.17)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            opacity={isSelected ? "1" : "0"}
            transition="opacity 0.2s"
            _hover={{
                opacity: "1",
            }}
        >
            <Button
                px="9"
                py="3"
                bg="white"
                rounded="xl"
                border="1px"
                borderColor="blue.700"
                shadow="sm"
            >
                <Text
                    fontWeight="bold"
                    fontSize={{ base: '12px', md: '16px' }} // Responsive font size
                    color="#0008FF"
                    textAlign="center"
                >
                    {isSelected ? "Selected" : isUnstake ? "Select to Unstake" : "Select to Stake"}
                </Text>
            </Button>
        </Box>
    </Box>
);