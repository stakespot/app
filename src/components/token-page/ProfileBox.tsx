import { Box, Text } from "@chakra-ui/react";

interface ProfileBoxProps {
    contractName: string;
    description: string;
}

export const ProfileBox: React.FC<ProfileBoxProps> = ({ contractName, description }) => (
    <Box
        padding="30px"
        borderRadius="10px"
        background="#F8F8FF"
        width={{ base: "100%", lg: "510px" }}
    >
        <Text fontWeight="bold" fontSize="16px" color="#000000" mb="12px">
            About {contractName}
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="#000000">
            {description}
        </Text>
    </Box>
);