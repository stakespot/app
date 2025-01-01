import { client } from "@/consts/client";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Stack,
  Image,
  Button
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { balanceOf, getNFT as getERC1155 } from "thirdweb/extensions/erc1155";
import { getNFT as getERC721 } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { NftAttributes } from "./NftAttributes";
import { CreateListing } from "./CreateListing";
import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import dynamic from "next/dynamic";
import { NftDetails } from "./NftDetails";
import RelatedListings from "./RelatedListings";
import { MakeOffer } from "./MakeOffer";
import { ProfileBox } from "@/components/token-page/ProfileBox";

const CancelListingButton = dynamic(() => import("./CancelListingButton"), {
  ssr: false,
});
const BuyFromListingButton = dynamic(() => import("./BuyFromListingButton"), {
  ssr: false,
});
const AcceptOfferButton = dynamic(() => import("./AcceptOfferButton"), {
  ssr: false,
});
const CancelOfferButton = dynamic(() => import("./CancelOfferButton"), {
  ssr: false,
});

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

type Props = {
  tokenId: bigint;
};

export function Token(props: Props) {
  const {
    type,
    nftContract,
    allAuctions,
    isLoading,
    contractMetadata,
    isRefetchingAllListings,
    listingsInSelectedCollection,
    offersInSelectedCollection,
  } = useMarketplaceContext();
  const { tokenId } = props;
  const account = useActiveAccount();

  const { data: nft, isLoading: isLoadingNFT } = useReadContract(
    type === "ERC1155" ? getERC1155 : getERC721,
    {
      tokenId: BigInt(tokenId),
      contract: nftContract,
      includeOwner: true,
    }
  );

  const { data: ownedQuantity1155 } = useReadContract(balanceOf, {
    contract: nftContract,
    owner: account?.address!,
    tokenId: tokenId,
    queryOptions: {
      enabled: !!account?.address && type === "ERC1155",
    },
  });

  const listings = (listingsInSelectedCollection || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
      nftContract.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );

  const offers = (offersInSelectedCollection || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
      nftContract.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );

  console.log("offers", offers);

  const auctions = (allAuctions || []).filter(
    (item) =>
      item.assetContractAddress.toLowerCase() ===
      nftContract.address.toLowerCase() && item.asset.id === BigInt(tokenId)
  );

  const allLoaded = !isLoadingNFT && !isLoading && !isRefetchingAllListings;

  const ownedByYou =
    nft?.owner?.toLowerCase() === account?.address.toLowerCase();


  return (
    <Stack
      direction="column"
      justify="flex-start"
      align="flex-start"
      spacing={{ base: "20px", md: "42px" }}
      width="100%"
      maxWidth="1440px"
      mx="auto"
      px={{ base: "10px", md: "20px" }}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="flex-start"
        align={{ base: "center", md: "flex-start" }}
        spacing={{ base: "20px", md: "42px" }}
        width="100%"
      >
        {/* Left Box */}
        <Stack
          borderRadius="20.82px"
          justify="flex-start"
          align="center"
          spacing="0px"
          overflow="hidden"
          borderColor="#EBEBEB"
          borderWidth="2.08px"
          width={{ base: "100%", md: "510px" }}
          height={{ base: "auto", md: "510px" }}
          background="#FFFFFF"
          boxShadow="0px 12.49px 37.27px 0px rgba(130, 130, 130, 0.07)"
        >
          <MediaRenderer
            client={client}
            src={nft?.metadata.image}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20.82px" }}
          />
        </Stack>

        {/* Right Content */}
        <Stack
          padding="0px"
          justify="flex-start"
          align="flex-start"
          spacing="42px"
          width={{ base: "100%", md: "728px" }}
        >
          {/* Header */}
          <Stack
            justify="flex-start"
            align="flex-start"
            spacing="12px"
            alignSelf="stretch"
          >
            <Text fontWeight="medium" fontSize="16px" color="#0008FF">
              Capy Friends
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align="center"
              spacing="12px"
              width="100%"
            >
              {/* NFT Title */}
              <Stack direction="row" align="center" spacing="8.33px">
                <Text fontWeight="bold" fontSize="32px" color="#000000">
                  {nft?.metadata.name}
                </Text>

              </Stack>
              {/* Owner Info */}
              <Stack direction="row" align="center" spacing="8.33px">
                <Text fontWeight="medium" fontSize="14px" color="#767676">
                  Owned by
                </Text>
                <Text fontWeight="medium" fontSize="14px" color="#0008FF">
                  {nft?.owner ? shortenAddress(nft.owner) : "N/A"}
                </Text>
                {ownedByYou && <Text color="gray">(You)</Text>}
              </Stack>
            </Stack>
          </Stack>

          {/* Listing Section */}
          <Stack justify="flex-start" align="flex-start" spacing="12px" width="100%">
            {type === "ERC1155" ? (
              <>
                {account && ownedQuantity1155 && (
                  <>
                    <Text>You own</Text>
                    <Heading>{ownedQuantity1155.toString()}</Heading>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
            {listings.length > 0 ? (
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="25px"
                width="100%"
                maxWidth="500px" // Limit maximum width
                ml="0" // Align to the left
                px="0px" // Padding for smaller screens
              >
                {listings.map((item) => {
                  const listedByYou =
                    item.creatorAddress.toLowerCase() === account?.address.toLowerCase();
                  return (
                    <Stack
                      key={item.id.toString()}
                      justify="flex-start"
                      align="flex-start"
                      spacing="6px"
                      width="100%"
                    >
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="8px"
                        width="100%"
                      >
                        <Text fontWeight="medium" fontSize="14px" color="#767676">
                          Listing price
                        </Text>
                      </Stack>
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="center"
                        spacing="8px"
                        width="100%"
                      >
                        <Text fontWeight="bold" fontSize={{ base: "24px", md: "32px" }} color="#000000">
                          {item.currencyValuePerToken.displayValue}
                        </Text>
                        <Text fontWeight="bold" fontSize={{ base: "24px", md: "32px" }} color="#000000">
                          {item.currencyValuePerToken.symbol}
                        </Text>
                      </Stack>
                      {type === "ERC1155" && (
                        <Stack
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="8px"
                          width="100%"
                        >
                          <Text fontWeight="medium" fontSize="14px" color="#767676">
                            Quantity
                          </Text>
                          <Text fontWeight="bold" fontSize={{ base: "24px", md: "32px" }} color="#000000">
                            {item.quantity.toString()}
                          </Text>
                        </Stack>
                      )}
                      {account && (
                        <Stack
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="25px"
                          width="100%"
                        >
                          {!listedByYou ? (
                            <BuyFromListingButton account={account} listing={item} />
                          ) : (
                            <CancelListingButton account={account} listingId={item.id} />
                          )}
                        </Stack>
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            ) : (
              <>
                {account && nft && (
                  <>
                    {(ownedByYou || (ownedQuantity1155 && ownedQuantity1155 > 0n)) ? (
                      <CreateListing tokenId={nft?.id} account={account} />
                    ) : (
                      <>
                        <Stack spacing="24px">
                          {/* Other components and code */}
                          <Text>Not listed</Text>
                          <Link href="/collection/656476/0x8D9A34C98080bCe0B5d11be22ed2eDB610be3E21">
                            <Button
                              variant="outline"
                              borderColor="#0008FF"
                              bg="#0008FF"
                              color="#FFFFFF"
                              size="lg"
                              height="43px" // Added height
                              width="200px" // Added width
                              borderRadius="10px"
                            >
                              <Text
                                fontWeight="bold"
                                fontSize={{ base: "16px" }}
                                color="#FFFFFF"
                                textAlign="center"
                              >
                                See available Capys
                              </Text>
                            </Button>
                          </Link>
                          {/* Other components and code */}
                        </Stack>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* Accordion Section */}
      <Stack
        direction={{ base: "column", md: "row" }} // Responsive: Stack vertically on smaller screens
        justify="flex-start"
        align="flex-start"
        spacing={{ base: "20px", md: "42px" }} // Adjust spacing for responsiveness
        width="100%"
        maxWidth="1440px"
        mx="auto" // Center horizontally
        px="0px" // Add padding for smaller screens
      >
        {/* Left Card */}
        <Stack
          padding="30px"
          borderRadius="10px"
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="24px"
          borderColor="#0008FF"
          borderWidth="1px"
          width={{ base: "100%", md: "510px" }} // Full width on smaller screens
          background="#F8F8FF"
        >
          <ProfileImage
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/efb7d6d1cd0b6be435f2f25f00d437bf6e75372d59bcfc8194edcb0766312009?placeholderIfAbsent=true&apiKey=52fdbce7292249cba00180381113d0c6"
            alt="Profile"
          />
          <Stack
            justify="flex-start"
            align="flex-start"
            spacing="12px"
            width="100%"
          >
            <Text fontWeight="bold" fontSize="16px" color="#000000">
              About {contractMetadata?.name}
            </Text>
            <Text
              lineHeight="1.71"
              fontWeight="regular"
              fontSize="14px"
              color="#000000"
            >
              {nft?.metadata.description}
            </Text>
          </Stack>
        </Stack>

        {/* Right Card */}
        <Stack
          padding="30px"
          borderRadius="10px"
          justify="center"
          align="center"
          spacing="18px"
          width={{ base: "100%", md: "728px" }} // Full width on smaller screens
          background="#F8F8FF"
        >
          <Text fontWeight="bold" fontSize="16px" color="#000000" alignSelf="stretch">
            Traits
          </Text>
          <Stack
            direction="row"
            justify="flex-start"
            align="center"
            spacing="20px"
            alignSelf="stretch"
            flexWrap="wrap" // Allow wrapping for smaller screens
          >
            {/* Trait Items */}
            {nft?.metadata?.attributes &&
              // @ts-ignore TODO FIx later
              Array.isArray(nft?.metadata?.attributes) && nft?.metadata?.attributes.length > 0 && (
                <NftAttributes attributes={nft.metadata.attributes} />
              )}
          </Stack>
        </Stack>
      </Stack>

    </Stack>
  );
}