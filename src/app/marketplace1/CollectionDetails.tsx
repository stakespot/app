import { Stack, Text, Flex, Box, Image, Icon } from "@chakra-ui/react";
import { InfoRow } from "./InfoRow";

const CheckCircle = () => (
    <Icon viewBox="0 0 24 24" boxSize="20px" color="blue.500">
        <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
        />
    </Icon>
);

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

export const CollectionDetails = () => (
    <Stack
        px={{ base: "16px", md: "80px" }}
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
        <Stack spacing="36px" flex="1" alignItems={{ base: "center", md: "flex-start" }}>
            <Stack spacing="16px" width="100%">
                {/* Header */}
                <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    alignSelf="stretch"
                    width="100%"
                >
                    <Text fontWeight="bold" fontSize="24px" color="#000000">
                        Capy Friends
                    </Text>
                    <Image src="/verified.svg" alt="Verified" boxSize="20px" />
                </Stack>

                {/* Statistics */}
                <Stack
                    direction={{ base: "column", md: "row" }}
                    justify="flex-start"
                    align="center"
                    spacing={{ base: "16px", md: "0px" }}
                    alignSelf="stretch"
                >
                    <InfoRow label="Floor price" value="0.784" unit="ETH" />
                    <InfoRow label="Total volume" value="135" unit="ETH" />
                    <InfoRow label="Best offer" value="0.345" unit="WETH" />
                    <InfoRow label="Listed" value="51 / 1000" unit="(5.1%)" />
                    <InfoRow label="Owners (unique)" value="524" unit="(52%)" />
                </Stack>
            </Stack>
            {/* Description */}
            <Text fontWeight="regular" fontSize="14px" color="#000000" textAlign={{ base: "center", md: "left" }}>
                Capy Friends is a collection of 1,000 eager and curious Capybara NFTs. They’re social
                creatures, spending their days relaxing by the water and grazing with friends. Natural
                learners, always exploring and soaking up knowledge.
            </Text>
        </Stack>
    </Stack>
);