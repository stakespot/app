import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { acceptOffer } from "thirdweb/extensions/marketplace";
import { sendAndConfirmTransaction } from "thirdweb";
import type { Account } from "thirdweb/wallets";

interface AcceptOfferButtonProps {
    account: Account;
    offer: any; // Replace 'any' with the correct type if available
}

const AcceptOfferButton: React.FC<AcceptOfferButtonProps> = ({ account, offer }) => {
    const toast = useToast();

    const handleAcceptOffer = async () => {
        try {
            const transaction = acceptOffer({
                contract: offer.contract,
                offerId: offer.id,
            });

            await sendAndConfirmTransaction({ transaction, account });

            toast({
                title: "Offer Accepted",
                description: "The offer has been successfully accepted.",
                status: "success",
                isClosable: true,
                duration: 5000,
            });
        } catch (error) {
            console.error("Error accepting offer:", error);
            toast({
                title: "Offer Acceptance Failed",
                description: `An error occurred: ${(error as Error).message}`,
                status: "error",
                isClosable: true,
                duration: 5000,
            });
        }
    };

    return <Button onClick={handleAcceptOffer}>Accept Offer</Button>;
};

export default AcceptOfferButton;