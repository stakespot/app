import { Box, Button, Text, Stack } from '@chakra-ui/react';

interface StakingButtonProps {
    tabIndex: number;
    setTabIndex: (index: number) => void;
    stakedInfo: any[];
}

const StakingButton: React.FC<StakingButtonProps> = ({ tabIndex, setTabIndex, stakedInfo }) => (
    <Button
        variant="outline"
        borderColor="#0008FF"
        color={tabIndex === 1 ? "#FFFFFF" : "#0008FF"}
        bg={tabIndex === 1 ? "#0008FF" : "#E0E1FF"}
        size="sm"
        onClick={() => setTabIndex(1)}
        height="43px" // Added height
        width="200px" // Added width
        borderRadius="10px"
        position="relative"
        overflow="hidden"
        _hover={{
            bg: "#0008FF",
            color: "#FFFFFF",
            _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 8, 255, 0.17)",
                zIndex: -1,
            },
        }}
    >
        <Text
            fontWeight="bold"
            fontSize="16px"
            color={tabIndex === 1 ? "#FFFFFF" : "#0008FF"}
            textAlign="center"
        >
            Staked NFTs ({stakedInfo?.[0]?.length || 0})
        </Text>
        <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display="none"
            _hover={{
                display: "block",
            }}
        >
            <Button
                size="sm"
                bg="#FFFFFF"
                color="#0008FF"
                borderRadius="5px"
                padding="8px 12px"
            >
                <Text fontWeight="bold" fontSize="12px" textAlign="center">
                    Select to Stake
                </Text>
            </Button>
        </Box>
    </Button>
);

export default StakingButton;