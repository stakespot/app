import { Stack, Text, Box, Image, Heading } from "@chakra-ui/react";

const ProfileImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <Image
        src={src}
        alt={alt}
        width={{ base: "60px", md: "80px" }}
        height={{ base: "60px", md: "80px" }}
        objectFit="cover"
        borderRadius="md" // Changed from "full" to "md" to make it a square
    />
);

export const StakingHead = () => (
    <Stack

        spacing="36px"
        width="100%"
        alignItems={{ base: "center", md: "flex-start" }}
    >
        <Heading fontWeight="bold" fontSize="32px" color="#000000">
            NFT Staking
        </Heading>
        <Stack
            direction={{ base: "column", md: "row" }}
            spacing="36px"
            width="100%"
            alignItems={{ base: "center", md: "flex-start" }}
        >
            <Box>
                <ProfileImage
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/efb7d6d1cd0b6be435f2f25f00d437bf6e75372d59bcfc8194edcb0766312009?placeholderIfAbsent=true&apiKey=52fdbce7292249cba00180381113d0c6"
                    alt="Profile"
                />
            </Box>
            <Stack spacing="16px" flex="1" alignItems={{ base: "center", md: "flex-start" }}>
                <Stack
                    justify="center"
                    align="flex-start"
                    spacing="16px"
                    alignSelf="stretch"
                >
                    <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        alignSelf="stretch"
                    >
                        <Text
                            fontWeight="bold"
                            fontSize="24px"
                            color="#000000"
                        >
                            Capy Friends
                        </Text>
                        <Image src="/verified.svg" alt="Verified" boxSize="20px" />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
);