"use client";

import { deleteProduct } from "@/app/actions/products";
import { Product } from "@/types";
import { ChevronDown, ChevronUp, ExternalLink, Trash2, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PriceChart from "./PriceChart";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function ProductCard({ product }: { product: Product }) {
    const [showChart, setShowChart] = useState(false);
    const [deleting, setDeleting] = useState(false);


    const handleDelete = async () => {
        if (!confirm("Remove this product from tracking?")) return;

        setDeleting(true);
        await deleteProduct(product.id);
        setDeleting(false);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow h-max">
            <CardHeader className="">
                <div className="flex gap-4">
                    {product.image_url && (
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="object-cover border border-border rounded-sm object-top size-28 md:size-32"
                        />
                    )}

                    <div className="flex flex-col gap-2">
                        <div className="font-semibold text-start">
                            {product.name}
                        </div >

                        <div className="flex items-center gap-4">
                            <div className="text-2xl md:text-3xl font-semibold text-primary">
                                {product.currency} {product.current_price}
                            </div>
                            <Badge variant="secondary">
                                <TrendingDown />
                                Tracking
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowChart(!showChart)}
                        className="gap-1"
                    >
                        {showChart ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Chart
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Show Chart
                            </>
                        )}
                    </Button>

                    <Button variant="outline" size="sm" asChild className="gap-1">
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Product
                        </Link>
                    </Button>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="gap-1"
                >
                    <Trash2 className="w-4 h-4" />
                    Remove
                </Button>
            </CardContent>

            {
                showChart && (
                    <CardFooter className="pt-0">
                        <PriceChart productId={product.id} />
                    </CardFooter>)
            }
        </Card >
    )
}
