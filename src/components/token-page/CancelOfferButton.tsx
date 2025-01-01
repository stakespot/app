import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { cancelOffer } from "thirdweb/extensions/marketplace";
import { sendAndConfirmTransaction } from "thirdweb";
import type { Account } from "thirdweb/wallets";

interface CancelOfferButtonProps {
    account: Account;
    offerId: any; // Replace 'any' with the correct type if available
}

const CancelOfferButton: React.FC<CancelOfferButtonProps> = ({ account, offerId }) => {
    const toast = useToast();

    const handleCancelOffer = async () => {
        try {
            const transaction = cancelOffer({
                contract: offerId.contract,
                offerId,
            });

            await sendAndConfirmTransaction({ transaction, account });

            toast({
                title: "Offer Canceled",
                description: "The offer has been successfully canceled.",
                status: "success",
                isClosable: true,
                duration: 5000,
            });
        } catch (error) {
            console.error("Error canceling offer:", error);
            toast({
                title: "Offer Cancellation Failed",
                description: `An error occurred: ${(error as Error).message}`,
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }
    };

    return <Button onClick={handleCancelOffer}>Cancel Offer</Button>;
};

export default CancelOfferButton;