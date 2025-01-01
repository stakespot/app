import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Stack,
    Text,
    Button,
} from "@chakra-ui/react";

interface StatisticsSectionProps {
    totalDeposited: number;
    unclaimedRewards: number;
    claimedRewards: number;
    claimRewards: () => void; // Add claimRewards as a prop
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ totalDeposited, unclaimedRewards, claimedRewards, claimRewards }) => {
    const rewardsRate = totalDeposited * 60; // Calculate rewards rate as hourly rate

    return (
        <Stack
            paddingX={{ base: "16px", md: "32px", lg: "67px" }} // Responsive horizontal padding
            paddingTop={{ base: "20px", md: "40px", lg: "49px" }} // Responsive top padding
            paddingBottom={{ base: "20px", md: "40px", lg: "49px" }} // Responsive bottom padding
            borderRadius="10px"
            justify="space-between"
            align="flex-start"
            spacing="24px"
            overflow="hidden"
            width="100%" // Make width 100%
            height={{ base: "auto" }} // Adjust height for smaller screens
            background="#F8F8FF"
            mx="auto" // Center horizontally
        >
            {/* Statistics Section */}
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} width="100%">
                <Stat>
                    <StatLabel>Total Staked</StatLabel>
                    <StatNumber>{totalDeposited} CapyFriends</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Unclaimed Rewards</StatLabel>
                    <StatNumber>{unclaimedRewards} $CAPY</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Claimed Rewards</StatLabel>
                    <StatNumber>{claimedRewards} $CAPY</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Rewards Rate</StatLabel>
                    <StatNumber>{rewardsRate} $CAPY/hour</StatNumber>
                </Stat>
            </SimpleGrid>

            {/* Button Section */}
            <Button
                background="#0008FF"
                color="#FFFFFF"
                padding="10px 20px"
                borderRadius="8px"
                _hover={{ background: "#0006CC" }} // Hover effect
                onClick={claimRewards} // Call the claimRewards function
            >
                <Text fontWeight="bold" fontSize="16px" textAlign="center">
                    Claim rewards
                </Text>
            </Button>
        </Stack>
    );
};

export default StatisticsSection;