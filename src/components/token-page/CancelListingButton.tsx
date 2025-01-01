import { useMarketplaceContext } from "@/hooks/useMarketplaceContext";
import { Button, Text, useToast } from "@chakra-ui/react";
import { sendAndConfirmTransaction } from "thirdweb";
import { cancelListing } from "thirdweb/extensions/marketplace";
import {
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import type { Account } from "thirdweb/wallets";

type Props = {
  account: Account;
  listingId: bigint;
};

export default function CancelListingButton(props: Props) {
  const { marketplaceContract, refetchAllListings, nftContract } =
    useMarketplaceContext();
  const switchChain = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const { account, listingId } = props;
  const toast = useToast();

  return (
    <Button
      variant="outline"
      borderColor="#0008FF"
      bg="#0008FF"
      color="#FFFFFF"
      size="lg"
      height="43px" // Added height
      width="200px" // Added width
      borderRadius="10px"
      onClick={async () => {
        if (activeChain?.id !== nftContract.chain.id) {
          await switchChain(nftContract.chain);
        }
        const transaction = cancelListing({
          contract: marketplaceContract,
          listingId,
        });
        await sendAndConfirmTransaction({
          transaction,
          account,
        });
        toast({
          title: "Listing cancelled successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetchAllListings();
      }}
    >
      <Text
        fontWeight="bold"
        fontSize={{ base: "16px" }}
        color="#FFFFFF"
        textAlign="center"
      >
        Cancel
      </Text>
    </Button>
  );
}