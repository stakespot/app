"use client";

import { client } from "@/consts/client";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  useColorMode,
  HStack
} from "@chakra-ui/react";
import { blo } from "blo";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import type { Wallet } from "thirdweb/wallets";
import { SideMenu } from "./SideMenu";
import logo from "./Logo.svg";
import { LuExternalLink } from "react-icons/lu"

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();

  return (
    <Box py="15px" px={{ base: "20px", lg: "50px" }}>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Box my="auto">
          <a href="/" className="hover:no-underline">
            <img src="/Logo.svg" alt="Logo" className="h-10" />
          </a>
        </Box>
        <HStack spacing={4} display={{ lg: "flex", base: "none" }}>
          <Link href="/collection/656476/0x8D9A34C98080bCe0B5d11be22ed2eDB610be3E21" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Marketplace</Button>
          </Link>
          <Link href="/staking" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Staking</Button>
          </Link>
          <Link href="https://docs.stakespot.xyz/" isExternal _hover={{ textDecoration: "none" }}>
            <Button variant="ghost" rightIcon={<LuExternalLink />}>
              Docs
            </Button>
          </Link>
          {/* Add Marketplace Button */}

          {/* Profile Button */}
          {account && wallet ? (
            <ConnectButton
              client={client}
              theme={colorMode}
              connectButton={{
                style: {
                  height: "56px",
                  borderRadius: "xl",
                  fontWeight: "bold",
                  borderColor: "#0008FF",
                  border: "2px solid #0008FF",
                  color: "#0008FF",
                  padding: "12px 36px", // Added padding for top/bottom and left/right
                },
                className: "hover:bg-blue-50",
              }}
            />
          ) : (
            <ConnectButton
              client={client}
              theme={colorMode}
              connectButton={{
                style: {
                  height: "56px",
                  borderRadius: "xl",
                  fontWeight: "bold",
                  borderColor: "#0008FF",
                  border: "2px solid #0008FF",
                  color: "#0008FF",
                  padding: "12px 36px", // Added padding for top/bottom and left/right
                },
                className: "hover:bg-blue-50",
              }}
            />
          )}
        </HStack>
        <SideMenu />
      </Flex>
    </Box>
  );
}

function ProfileButton({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) {
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });

  return (
    <HStack spacing={4} alignItems="center">
      {/* Button to show Ethereum address */}
      <Link href="/profile" _hover={{ textDecoration: "none" }}>
        <Button variant="ghost">
          Profile
        </Button>
      </Link>

      {/* Button for Logout */}
      <Button
        onClick={() => {
          if (wallet) disconnect(wallet);
        }}
      >
        Logout
      </Button>
    </HStack>
  );
}

function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button height="56px" w="56px" onClick={toggleColorMode} mr="10px">
      {colorMode === "light" ? <FaRegMoon /> : <IoSunny />}
    </Button>
  );
}