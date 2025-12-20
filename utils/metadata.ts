import type { Metadata } from 'next';

export const baseMetadata: Metadata = {
    title: 'CostTrack | Track Prices & Save Money',
    description: 'Never overpay again. Track historical prices and get notified instantly when your favorite products go on sale.',
    keywords: [
        "price tracker",
        "cost tracker",
        "save money",
        "track data",
        "e-commerce",
    ],
    authors: [{ name: "Mudit kalra" }],
    creator: "Mudit kalra",
    publisher: "costtrack",
    manifest: '/manifest.json',
    openGraph: {
        title: 'CostTrack | Track Prices & Save Money',
        description: 'Never overpay again. Track historical prices and get notified instantly when your favorite products go on sale.',
        url: 'https://costtrack.vercel.app/',
        siteName: 'CostTrack',
        images: [
            {
                url: '/og/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: "summary_large_image",
        title: "CostTrack | Track Prices & Save Money",
        description: "Never overpay again. Track historical prices and get notified instantly when your favorite products go on sale",
        creator: "@muditkalra_45",
        images: ["/og/og-image.png"],
    },
};