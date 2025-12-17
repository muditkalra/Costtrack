import { cronSecret, supabaseServiceRoleKey, supabaseUrl } from "@/constants";
import { sendPriceDropAlert } from "@/lib/email";
import { scrapeProduct } from "@/lib/firecrawl";
import { Product } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Price check endpoint"
    })
}
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        const { data, error } = await supabase.from("products").select("*");
        const products = data as Product[];

        if (error) {
            throw error;
        }

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertSent: 0
        }

        for (const product of products) {
            try {
                const productData = await scrapeProduct(product.url);

                if (!productData || !productData.currentPrice) {
                    results.failed++;
                    continue;
                }

                const newPrice = parseFloat(String(productData.currentPrice));
                const oldPrice = parseFloat(String(product.current_price));

                await supabase
                    .from("products")
                    .update({
                        current_price: newPrice,
                        currency: productData.currencyCode || product.currency,
                        name: productData.productName || product.name,
                        image_url: productData.productImageUrl || product.image_url,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", product.id);

                if (oldPrice !== newPrice) {
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });
                    results.priceChanges++;

                    if (newPrice < oldPrice) {
                        // alert
                        const { data: { user } } = await supabase.auth.admin.getUserById(product.user_id);

                        if (user?.email) {
                            //sending email to user;
                            const emailSent = await sendPriceDropAlert(user.email, product, oldPrice, newPrice);

                            if (emailSent.success) {
                                results.alertSent++;
                            }
                        }
                    }
                }
                results.updated++;
            } catch (error) {
                console.log(`Error processing product ${product.id}:`, error);
                results.failed++;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Price check updated",
            results
        })

    } catch (error) {
        console.log("Cron job error", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}