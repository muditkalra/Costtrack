"use client";

import { getPriceHistory } from "@/app/actions/products";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


export default function PriceChart({ productId }: { productId: string }) {
    const [data, setData] = useState<{ date: string, price: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const history = await getPriceHistory(productId);

            const chartData = history.map((item) => ({
                date: new Date(item.checked_at).toLocaleDateString(),
                price: parseFloat(item.price),
            }));

            setData(chartData);
            setLoading(false);
        }

        loadData();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8 w-full gap-2 text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
                Loading chart...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8  text-muted-foreground w-full border rounded-lg ">
                No price history yet. Check back after the first daily update!
            </div>
        );
    }

    return (
        <div className="w-full">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4">
                Price History
            </h4>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "Background",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#FA5D19"
                        strokeWidth={2}
                        dot={{ fill: "#FA5D19", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
