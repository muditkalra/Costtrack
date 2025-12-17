import { Feature, Product } from "@/types";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react";
import AddProductForm from "./AddProductForm";
import { type User } from "@supabase/supabase-js"
import { getProducts } from "@/app/actions/products";
import ProductCard from "./ProductCard";

const products = [];

const features: Feature[] = [
    {
        icon: <Rabbit />,
        title: "Lightning Fast",
        description: "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
        icon: <Shield />,
        title: "Always Reliable",
        description:
            "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
        icon: <Bell />,
        title: "Smart Alerts",
        description: "Get notified instantly when prices drop below your target",
    },
];



export default async function HeroSection({ user }: { user: User | null }) {


    const products: Product[] = user ? await getProducts() : [];
    console.log(products, "pr");

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground mb-2">
                    Made with ❤️ by Mudit kalra
                </div>

                <h2 className="text-5xl font-bold mb-4 tracking-tight">
                    Never Miss a Price Drop
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Track prices from any e-commerce site. Get instant alerts when
                    prices drop. Save money effortlessly.
                </p>

                <AddProductForm user={user} />

                {/* Features */}
                {products.length === 0 && (
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
                        {features.map(({ icon, title, description }) => (
                            <div
                                key={title}
                                className="p-6 rounded-xl border flex flex-col items-center"
                            >
                                <div className="size-12 bg-primary text-background rounded-lg flex items-center justify-center mx-auto">
                                    {icon}
                                </div>
                                <h3 className="font-semibold mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Products section */}
                {user && products.length > 0 && (
                    <section className="max-w-6xl px-10 my-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">
                                Your Tracked Products
                            </h3>
                            <span className="text-sm text-muted-foreground">
                                {products.length} {products.length === 1 ? "product" : "products"}
                            </span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 items-start">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {user && products.length === 0 && (
                    <section className="max-w-2xl mx-auto text-center mt-10">
                        <div className="rounded-xl border-2 border-dashed p-10 flex flex-col gap-2">
                            <TrendingDown className="size-16 text-muted-foreground mx-auto" />
                            <h3 className="text-xl font-semibold">
                                No products yet
                            </h3>
                            <p className="text-muted-foreground">
                                Add your first product above to start tracking prices!
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </section>
    )
}
