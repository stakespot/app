import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useBreakpointValue,
  Stack,
  Button,
  VStack,
  Spinner
} from "@chakra-ui/react";
import { MediaRenderer } from "thirdweb/react";

export function ListingGrid() {
  const { listingsInSelectedCollection, nftContract } = useMarketplaceContext();
  const len = listingsInSelectedCollection.length;
  const columns = useBreakpointValue({
    base: 1,
    sm: Math.min(len, 2),
    md: Math.min(len, 4),
    lg: Math.min(len, 4),
    xl: Math.min(len, 5),
  });

  if (!listingsInSelectedCollection || !len) {
    return (
      <VStack color="#0008FF">
        <Spinner color="#0008FF" borderWidth="6px" size="lg" />
        <Text color="#0008FF">Loading NFT Collection...</Text>
      </VStack>
    );
  }

  return (
    <SimpleGrid columns={columns} spacing={4} p={4} mx="auto" mt="20px">
      {listingsInSelectedCollection.map((item) => (
        <Box
          key={item.id}
          as={Link}
          href={`/collection/${nftContract.chain.id}/${nftContract.address}/token/${item.asset.id.toString()}`}
          width="240px" // Fixed width
          height="360px" // Fixed height
          borderWidth="1px"
          borderColor="#EBEBEB"
          borderRadius="10px"
          overflow="hidden"
          position="relative"
          boxShadow="base"
          transition="transform 0.2s, box-shadow 0.2s"
          _hover={{
            boxShadow: "xl",
          }}
          role="group" // Add group for hover state targeting
        >
          <Box
            height="240px"
            bg="#F3F3F3"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MediaRenderer client={client} src={item.asset.metadata.image} />
          </Box>
          <Stack
            px="16px"
            pt="18px"
            pb="24px"
            spacing="12px"
            justify="flex-start"
            align="flex-start"
            height="120px"
          >
            <Flex justify="space-between" align="center" width="100%">
              <Text fontWeight="bold" fontSize="16px" color="#000000">
                {item.asset?.metadata?.name ?? "Unknown item"}
              </Text>
            </Flex>
            <Flex justify="space-between" align="center" width="100%">
              <Text fontWeight="bold" fontSize="16px" color="#0008FF">
                {item.currencyValuePerToken.displayValue} {item.currencyValuePerToken.symbol}
              </Text>
            </Flex>
          </Stack>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            height="60px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="rgba(0, 8, 255, 0.17)"
            opacity="0"
            transition="opacity 0.2s"
            _groupHover={{ // Target group hover state
              opacity: "1",
            }}
          >
            <Button
              bg="#0008FF"
              color="#FFFFFF"
              size="sm"
              width="100%"
              height="100%"
              padding="12px 36px" // Added padding for top/bottom and left/right
              _hover={{ bg: "#0008FF" }} // Change background color on hover
              _active={{ bg: "#0008FF" }} // Change background color on active
              _focus={{ boxShadow: "outline" }} // Change box shadow on focus
            >
              <Text
                fontWeight="bold"
                fontSize="16px"
                color="#FFFFFF"
                textAlign="center"
              >
                Buy Now
              </Text>
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ListingGrid;