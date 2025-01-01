"use client";

import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";
import { AutoConnect } from "thirdweb/react";
import { client } from "@/consts/client";
import { createWallet, inAppWallet } from "thirdweb/wallets";


const wallets = [
	inAppWallet(),
	createWallet('io.metamask'),
	createWallet("me.rainbow"),
]

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body style={{}}>
				<Providers>
					<AutoConnect client={client} wallets={wallets} />
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
