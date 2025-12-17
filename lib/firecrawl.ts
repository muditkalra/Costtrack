import { firecrawlKey } from "@/constants";
import FirecrawlApp from "@mendable/firecrawl-js";


const firecrawl = new FirecrawlApp({ apiKey: firecrawlKey });

interface Schema {
    productName: string;
    currentPrice: number;
    currencyCode: string;
    productImageUrl: string;
}

export async function scrapeProduct(url: string) {
    try {
        const result = await firecrawl.scrape(url, {
            formats: [
                {
                    type: "json",
                    schema: {
                        type: "object",
                        required: ["productName", "currentPrice"],
                        properties: {
                            productName: { type: "string" },
                            currentPrice: { type: "number" },
                            currencyCode: { type: "string" },
                            productImageUrl: { type: "string" }
                        },
                    },
                    prompt: `
                        Extract:
                        - product name as "productName"
                        - product price as "currentPrice"
                        - currency code as "currencyCode"
                        - product image URL as "productImageUrl"
                        If price is not visible, return null for currentPrice`,
                },

            ],
        });

        // Firecrawl returns data in result.extract
        const extractedData = result.json as Schema;

        if (!extractedData) {
            throw new Error("No data extracted from URL");
        }

        return extractedData;
    } catch (error) {
        console.error("Firecrawl scrape error:", error);
        throw new Error(`Failed to scrape product: ${error}`);
    }
}