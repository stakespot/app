import { Stack, Text, Box, Grid } from "@chakra-ui/react";

const AttributeCard = ({ trait_type, value, percentage, price, currency }: any) => (
  <Stack
    padding="16px"
    borderRadius="6px"
    border="1px solid"
    borderColor="#6368FF"
    background="#FFFFFF"
    spacing="8px"
  >
    <Text
      fontWeight="regular"
      fontSize="12px"
      textTransform="uppercase"
      color="#000000"
    >
      {trait_type}
    </Text>
    <Text
      fontWeight="bold"
      fontSize="14px"
      color="#000000"
    >
      {value}
    </Text>
    <Stack direction="row" justify="space-between" align="center">
      <Stack
        padding="3px 6px"
        borderRadius="6px"
        background="#D7FFF2"
        direction="row"
        align="center"
      >
        <Text fontWeight="regular" fontSize="14px" color="#292929">
          12
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="#292929">
          %
        </Text>
      </Stack>
      <Stack direction="row" spacing="3px" align="center">
        <Text fontWeight="regular" fontSize="14px" color="#000000">
          0.012
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="#000000">
          EDU
        </Text>
      </Stack>
    </Stack>
  </Stack>
);

export function NftAttributes({ attributes }: { attributes: any[] }) {
  console.log("attributes", attributes);

  return (
    <Stack
      padding="0px"
      borderRadius="10px"
      justify="center"
      align="center"
      spacing="0px"
      width="100%"
      maxWidth="100%"
      background="#F8F8FF"
    >
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="20px"
        width="100%"
      >
        {attributes.map((attr, index) => (
          <AttributeCard key={index} {...attr} />
        ))}
      </Grid>
    </Stack>
  );
}