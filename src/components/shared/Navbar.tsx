"use client";

import { client } from "@/consts/client";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, HStack, Button, useColorMode } from "@chakra-ui/react";
import { useActiveAccount, useActiveWallet, useDisconnect, ConnectButton } from "thirdweb/react";
import { SideMenu } from "./SideMenu";
import { LuExternalLink } from "react-icons/lu";

// Define the fixed height of the navbar
export const NAVBAR_HEIGHT = 80; // Fixed height

export function Navbar() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();

  return (
    <Box id="navbar" height={`${NAVBAR_HEIGHT}px`} px={{ base: "20px", lg: "50px" }}>
      <Flex direction="row" justifyContent="space-between" alignItems="center" height="100%">
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
                padding: "12px 36px",
              },
              className: "hover:bg-blue-50",
            }}
          />
        </HStack>
        <SideMenu />
      </Flex>
    </Box>
  );
}