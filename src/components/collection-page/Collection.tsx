"use client";

import { useState } from "react";
import { Stack, Text, Box, Flex, Tabs, TabList, Tab, Heading, Button } from "@chakra-ui/react";
import { MediaRenderer, useReadContract } from "thirdweb/react";
import { getNFT as getNFT721 } from "thirdweb/extensions/erc721";
import { getNFT as getNFT1155 } from "thirdweb/extensions/erc1155";
import { client } from "@/consts/client";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import HeroImage from "@/app/marketplace1/HeroImage"; // Import HeroImage component
import { CollectionDetails } from "@/app/marketplace1/CollectionDetails"; // Import CollectionDetails component
import { ListingGrid } from "./ListingGrid";
import { AllNftsGrid } from "./AllNftsGrid";

export function Collection() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const {
    type,
    nftContract,
    isLoading,
    contractMetadata,
    listingsInSelectedCollection,
    supplyInfo,
  } = useMarketplaceContext();

  // In case the collection doesn't have a thumbnail, we use the image of the first NFT
  const { data: firstNFT, isLoading: isLoadingFirstNFT } = useReadContract(
    type === "ERC1155" ? getNFT1155 : getNFT721,
    {
      contract: nftContract,
      tokenId: 0n,
      queryOptions: {
        enabled: isLoading || !!contractMetadata?.image,
      },
    }
  );

  const thumbnailImage = contractMetadata?.image || firstNFT?.metadata.image || "";

  return (
    <Stack spacing="24px" maxWidth="100vw" mx="auto">
      <HeroImage />
      <CollectionDetails />
      <Box mt="24px">
        <Flex direction="column" gap="4">


          <Stack
            paddingX={{ base: "16px", md: "80px" }}
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
                variant="outline"
                borderColor="#0008FF"
                bg={tabIndex === 0 ? "#0008FF" : "#E0E1FF"}
                color={tabIndex === 0 ? "#FFFFFF" : "#0008FF"}
                size="sm"
                onClick={() => setTabIndex(0)}
                height="43px" // Added height
                width="117px" // Added width
                borderRadius="10px"
              >
                <Text
                  fontWeight="bold"
                  fontSize="16px"
                  color={tabIndex === 0 ? "#FFFFFF" : "#0008FF"}
                  textAlign="center"
                >
                  Listed ({listingsInSelectedCollection.length || 0})
                </Text>
              </Button>
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
              >
                <Text
                  fontWeight="bold"
                  fontSize="16px"
                  color={tabIndex === 1 ? "#FFFFFF" : "#0008FF"}
                  textAlign="center"
                >
                  Entire Collection {" "}
                  {supplyInfo
                    ? `(${(
                      supplyInfo.endTokenId -
                      supplyInfo.startTokenId +
                      1n
                    ).toString()})`
                    : ""}
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>

      {/* Conditional Rendering based on selected tab */}
      <Flex direction="column">
        {tabIndex === 0 && <ListingGrid />}
        {tabIndex === 1 && <AllNftsGrid />}
      </Flex>
    </Stack>
  );
}