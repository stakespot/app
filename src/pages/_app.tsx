import { AppProps } from 'next/app';
import Head from 'next/head';
import { Providers } from '@/components/shared/Providers';
import { Navbar } from '@/components/shared/Navbar';
import { AutoConnect } from 'thirdweb/react';
import { client } from '@/consts/client';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { NavbarHeightProvider } from '@/components/shared/NavbarHeightContext';

const wallets = [
    inAppWallet(),
    createWallet('io.metamask'),
    createWallet('me.rainbow'),
];

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Providers>
                <Navbar />
                <AutoConnect client={client} wallets={wallets} />
                <Component {...pageProps} />
            </Providers>
        </>
    );
}

export default MyApp;