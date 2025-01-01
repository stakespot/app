import { Stack, Text, Button } from '@chakra-ui/react';

export const FilterButtons = () => (
    <Stack
        paddingX="0px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
        alignSelf="stretch"
    >
        <Stack direction="row" justify="flex-start" align="center" spacing="24px">
            <Text
                lineHeight="1.71"
                fontWeight="regular"
                fontSize="14px"
                color="#000000"
            >
                Filter by:
            </Text>
            <Button
                bg="#0008FF"
                color="#FFFFFF"
                size="sm"
                padding="12px 36px" // Added padding for top/bottom and left/right
            >
                <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#FFFFFF"
                    textAlign="center"
                >
                    Listed
                </Text>
            </Button>
            <Button variant="outline" borderColor="#0008FF" color="#0008FF" size="sm">
                <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#0008FF"
                    textAlign="center"
                >
                    Entire collection
                </Text>
            </Button>
        </Stack>
    </Stack>
);