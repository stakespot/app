"use client";

import { getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { getOwnedERC721s } from "@/extensions/getOwnedERC721s";
import { client } from "@/consts/client";
import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Stack,
  useToast,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  isApprovedForAll as isApprovedForAll721,
  setApprovalForAll as setApprovalForAll721,
} from "thirdweb/extensions/erc721";
import StatisticsSection from "@/components/staked/StatisticsSection";
import { StakingHead } from "./StakingHead";
import { NFTGrid } from "@/components/shared/NFTGrid";

export default function StakingPage() {
  const account = useActiveAccount();
  const address = account?.address as `0x${string}`;
  const toast = useToast();
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([]);
  const [selectedUnstakeNFTs, setSelectedUnstakeNFTs] = useState<string[]>([]);
  const [refreshRewards, setRefreshRewards] = useState(false);
  const [refreshTotalStaked, setRefreshTotalStaked] = useState(false);
  const [refreshUnstaked, setRefreshUnstaked] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(0); // Added state for tab index
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const stakingContract = getContract({
    client,
    chain: defineChain(656476),
    address: "0xaFFdb4fA4302499912d8845bcd42dF8fcA993899",
  });

  const nftContract = NFT_CONTRACTS.find(
    (contract) => contract.address === "0x8D9A34C98080bCe0B5d11be22ed2eDB610be3E21"
  );

  if (!nftContract) {
    throw new Error("NFT contract not found in NFT_CONTRACTS.");
  }

  const nftContractInstance = getContract({
    address: nftContract.address,
    chain: nftContract.chain,
    client,
  });

  const erc20Contract = getContract({
    client,
    chain: defineChain(656476),
    address: "0x8EBaBfE28C6466f67dE8A4d134b5859d2790aF4F", // Replace with your ERC20 token address
  });

  const {
    data: stakableNFTs,
    error: stakableNFTsError,
    isLoading: isLoadingStakableNFTs,
    refetch: refetchStakableNFTs,
  } = useReadContract(getOwnedERC721s, {
    contract: nftContractInstance,
    owner: address as `0x${string}`,
    requestPerSec: 50,
    queryOptions: {
      enabled: !!address,
    },
  });

  const {
    data: stakedInfo,
    error: stakedInfoError,
    isLoading: isLoadingStakedInfo,
    refetch: refetchStakedInfo,
  } = useReadContract({
    contract: stakingContract,
    method: "function getStakeInfo(address _staker) view returns (uint256[] _tokensStaked, uint256 _rewards)",
    params: [address as `0x${string}`],
    queryOptions: {
      enabled: !!address,
    },
  });

  const {
    data: erc20Balance,
    isPending: isErc20BalancePending,
  } = useReadContract({
    contract: erc20Contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [address],
  });

  useEffect(() => {
    if (refreshRewards) {
      refetchStakedInfo?.();
      setRefreshRewards(false);
    }
  }, [refreshRewards, refetchStakedInfo]);

  useEffect(() => {
    if (refreshTotalStaked) {
      refetchStakedInfo?.();
      setRefreshTotalStaked(false);
    }
  }, [refreshTotalStaked, refetchStakedInfo]);

  useEffect(() => {
    if (refreshUnstaked) {
      refetchStakedInfo?.();
      refetchStakableNFTs?.();
      setRefreshUnstaked(false);
    }
  }, [refreshUnstaked, refetchStakedInfo, refetchStakableNFTs]);

  const handleStake = async () => {
    if (selectedNFTs.length === 0) {
      toast({
        title: "No NFTs selected",
        description: "Please select at least one NFT to stake.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const isApproved = await isApprovedForAll721({
      contract: nftContractInstance,
      owner: address as `0x${string}`,
      operator: stakingContract.address as `0x${string}`,
    });

    if (!isApproved) {
      const approveTx = setApprovalForAll721({
        contract: nftContractInstance,
        operator: stakingContract.address as `0x${string}`,
        approved: true,
      });

      try {
        await sendAndConfirmTransaction({
          transaction: approveTx,
          account: account!,
        });
      } catch (error) {
        toast({
          title: "Approval failed",
          description: "Failed to approve NFTs for staking",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    const tokenIds = selectedNFTs.map(id => BigInt(id));

    try {
      const transaction = prepareContractCall({
        contract: stakingContract,
        method: "function stake(uint256[] _tokenIds)",
        params: [tokenIds],
      });

      await sendAndConfirmTransaction({
        transaction,
        account: account!,
      });

      toast({
        title: "Staking successful",
        description: "Your NFTs have been staked.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setSelectedNFTs([]);
      setRefreshTotalStaked(true);
    } catch (error) {
      toast({
        title: "Staking failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const claimRewards = async () => {
    if (!account) return;

    try {
      const transaction = prepareContractCall({
        contract: stakingContract,
        method: "function claimRewards()",
        params: [],
      });

      await sendAndConfirmTransaction({
        transaction,
        account: account!,
      });

      toast({
        title: "Rewards claimed successfully!",
        description: "Your rewards have been claimed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRefreshRewards(true);
    } catch (error) {
      toast({
        title: "Claiming rewards failed",
        description: (error as Error).message || 'An unknown error occurred.',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleNFTSelection = (tokenId: string) => {
    setSelectedNFTs(prev => {
      const newSelection = prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId];
      return newSelection;
    });
  };

  const toggleUnstakeSelection = (tokenId: string) => {
    setSelectedUnstakeNFTs(prev => {
      const newSelection = prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId];
      return newSelection;
    });
  };

  const handleUnstake = async () => {
    if (selectedUnstakeNFTs.length === 0) {
      toast({
        title: "No NFTs selected",
        description: "Please select at least one NFT to unstake.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const tokenIds = selectedUnstakeNFTs.map(id => BigInt(id));

      const transaction = prepareContractCall({
        contract: stakingContract,
        method: "function withdraw(uint256[] _tokenIds)",
        params: [tokenIds],
      });

      await sendAndConfirmTransaction({
        transaction,
        account: account!,
      });

      toast({
        title: "Unstaking successful",
        description: "Your NFTs have been unstaked.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setSelectedUnstakeNFTs([]);
      setRefreshUnstaked(true);
    } catch (error) {
      toast({
        title: "Unstaking failed",
        description: (error as Error).message || 'An unknown error occurred.',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!account) {
    return (
      <Box p={8}>
        <Heading>Please connect your wallet to view the staking page.</Heading>
      </Box>
    );
  }

  return (
    <Stack spacing="24px" maxWidth="100vw" mx="auto" px={{ base: "16px", md: "80px" }}>
      <StakingHead />

      <StatisticsSection
        totalDeposited={stakedInfo ? stakedInfo[0].length : 0}
        unclaimedRewards={stakedInfo ? Number(stakedInfo[1] / BigInt(10 ** 18)) : 0}
        claimedRewards={erc20Balance ? Number(erc20Balance / BigInt(10 ** 18)) : 0}
        claimRewards={claimRewards}
      />

      <Box mt="24px">
        <Flex direction="column" gap="4">
          <Stack
            paddingX="0px"
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
                width="200px" // Added width
                borderRadius="10px"
              >
                <Text
                  fontWeight="bold"
                  fontSize="16px"
                  color={tabIndex === 0 ? "#FFFFFF" : "#0008FF"}
                  textAlign="center"
                >
                  Stakeable NFTs ({stakableNFTs?.length || 0})
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
                  Staked NFTs ({stakedInfo?.[0]?.length || 0})
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>

      <Flex direction="column">
        {tabIndex === 0 && (
          <Box>
            <Heading size="md" mb={4}>Stakeable NFTs</Heading>
            {isLoadingStakableNFTs ? (
              <Text>Loading stakable NFTs...</Text>
            ) : (
              <NFTGrid
                nfts={(stakableNFTs ?? []).filter(nft => !stakedInfo?.[0]?.includes(BigInt(nft.id)))}
                selectedNFTs={selectedNFTs}
                toggleNFTSelection={toggleNFTSelection}
              />
            )}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Heading size="md" mb={4}>Staked NFTs</Heading>
            {isLoadingStakedInfo ? (
              <Text>Loading staked NFTs...</Text>
            ) : stakedInfo && stakedInfo[0].length > 0 ? (
              <NFTGrid
                nfts={stakedInfo[0].map((tokenId) => ({
                  id: tokenId,
                  metadata: {
                    image: `ipfs://Qme2S7tDkANR5kdvB19bZ8RUbR2mqHQhqNiu5hznCES3mQ/${tokenId}.png`,
                    name: `Capy Friends #${tokenId}`,
                  },
                }))}
                selectedNFTs={selectedUnstakeNFTs}
                toggleNFTSelection={toggleUnstakeSelection}
                isUnstake={true}
              />
            ) : (
              <Text>No NFTs currently staked.</Text>
            )}
          </Box>
        )}
      </Flex>

      {tabIndex === 0 && (
        <Button
          variant="outline"
          borderColor="#0008FF"
          bg="#0008FF"
          color="#FFFFFF"
          size="lg"
          height="43px" // Added height
          width="200px" // Added width
          borderRadius="10px"
          onClick={handleStake}
          isDisabled={selectedNFTs.length === 0}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "16px" }}
            color="#FFFFFF"
            textAlign="center"
          >
            Stake selected NFTs
          </Text>
        </Button>
      )}

      {tabIndex === 1 && (
        <Button
          variant="outline"
          borderColor="#0008FF"
          bg="#E0E1FF"
          color="#0008FF"
          size="lg"
          height="43px" // Added height
          width="200px" // Added width
          borderRadius="10px"
          onClick={handleUnstake}
          isDisabled={selectedUnstakeNFTs.length === 0}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "16px" }}
            color="#0008FF"
            textAlign="center"
          >
            Unstake Selected NFTs
          </Text>
        </Button>
      )}

    </Stack>
  );
}