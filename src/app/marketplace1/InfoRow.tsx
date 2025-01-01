import { Stack, Text, Flex } from "@chakra-ui/react";

type InfoRowProps = {
    label: string;
    value: string | number;
    unit?: string;
    labelColor?: string;
    valueColor?: string;
};

export const InfoRow: React.FC<InfoRowProps> = ({
    label,
    value,
    unit,
    labelColor = "#000000",
    valueColor = "#0008FF",
}) => (
    <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "flex-start", md: "flex-start" }}
        align="center"
        gap="12px" // Reduced gap between label and value
        width="100%"
    >
        {/* Label */}
        <Text
            fontWeight="medium"
            fontSize={{ base: "14px", md: "16px" }}
            color={labelColor}
        >
            {label}
        </Text>

        {/* Value and Unit */}
        <Flex
            direction="row"
            align="center"
            gap="3px" // Reduced gap between value and unit
            fontSize={{ base: "14px", md: "16px" }}
        >
            <Text fontWeight="bold" color={valueColor}>
                {value}
            </Text>
            {unit && (
                <Text fontWeight="bold" color={valueColor}>
                    {unit}
                </Text>
            )}
        </Flex>
    </Flex>
);