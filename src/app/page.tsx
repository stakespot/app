"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import Head from 'next/head';
import { NAVBAR_HEIGHT } from '@/components/shared/Navbar';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [height, setHeight] = useState<number>(NAVBAR_HEIGHT); // Default to NAVBAR_HEIGHT
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleConnectButtonClick = () => {
      setHeight(NAVBAR_HEIGHT);
    };

    if (connectButtonRef.current) {
      connectButtonRef.current.addEventListener('click', handleConnectButtonClick);
    }

    return () => {
      if (connectButtonRef.current) {
        connectButtonRef.current.removeEventListener('click', handleConnectButtonClick);
      }
    };
  }, [connectButtonRef.current]);

  return (
    <>
      <Head>
        <title>StakeSpot - Home</title>
      </Head>
      <Box
        width="100vw"
        height={`calc(100vh - ${height}px)`}
        background="linear-gradient(180deg, #ffffff 0%, #ffa004 100%)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="relative"
      >
        <Box
          width="100%"
          maxWidth="1440px"
          paddingX={{ base: "16px", md: "32px", lg: "175px" }}
          paddingY={{ base: "40px", md: "80px", lg: "120px" }}
          background="#FFFFFF"
          borderRadius="20px"
          boxShadow="lg"
          position="relative"
          zIndex="1"
        >
          <Stack
            width="100%"
            spacing={{ base: "16px", md: "24px" }}
            align="center"
          >
            <Text
              fontWeight="medium"
              fontSize={{ base: "16px", md: "20px" }}
              color="#000000"
              textAlign="center"
            >
              The only NFT marketplace for Educhain
            </Text>
            <Text
              fontWeight="bold"
              fontSize={{ base: "32px", md: "48px" }}
              color="#000000"
              width={{ base: "100%", md: "905px" }}
              maxWidth="100%"
              textAlign="center"
            >
              Stake your{" "}
              <Box as="span" color="#0008FF">
                Capyfriends
              </Box>{" "}
              to earn{" "}
              <Box as="span" color="#0008FF">
                $CAPY
              </Box>{" "}
              while you nap by the pool
            </Text>
            <Stack
              width="100%"
              maxWidth="1440px"
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align="center"
              spacing={{ base: "16px", md: "10px" }}
              overflow="hidden"
            >
            </Stack>
            <Stack direction="row" justify="center" align="center" spacing="24px">
              <Link href="/staking">
                <Button
                  variant="solid"
                  size="lg"
                  backgroundColor="#0008FF"
                  color="#FFFFFF"
                  height="43px"
                  width="134px"
                  borderRadius="10px"
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "16px", md: "20px" }}
                    color="#FFFFFF"
                    textAlign="center"
                  >
                    Stake Capy
                  </Text>
                </Button>
              </Link>
              <Link href="/collection/656476/0x8D9A34C98080bCe0B5d11be22ed2eDB610be3E21">
                <Button
                  variant="outline"
                  size="lg"
                  borderColor="#0008FF"
                  backgroundColor="#E0E1FF"
                  color="#0008FF"
                  height="43px"
                  width="134px"
                  borderRadius="10px"
                  ref={connectButtonRef}
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "16px", md: "20px" }}
                    color="#0008FF"
                    textAlign="center"
                  >
                    Buy Capy
                  </Text>
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
        <Image
          src="/capytree.svg"
          alt="Capytree"
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          maxWidth={{ base: "150px", md: "200px", lg: "250px" }}
          zIndex="2"
          display={{ base: "none", md: "block" }}
        />
        <Image
          src="/capyyes.svg"
          alt="Capyyes"
          position="absolute"
          right="0"
          bottom="0"
          maxWidth={{ base: "150px", md: "200px", lg: "250px" }}
          zIndex="2"
          display={{ base: "none", md: "block" }}
        />
      </Box>
    </>
  );
}