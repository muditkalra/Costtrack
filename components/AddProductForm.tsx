"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react";
import AuthModal from "./AuthModal";
import { type User } from "@supabase/supabase-js"
import { addProduct } from "@/app/actions/products";
import { toast } from "sonner";


export default function AddProductForm({ user }: { user: User | null }) {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("url", url);
        const result = await addProduct(formData);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message || "Product tracked successfully!");
            setUrl("");
        }

        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste product URL (Amazon, flipkart, etc.)"
                        className="h-12 text-base"
                        required
                        disabled={loading}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-10 sm:h-12 px-8"
                        size="lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            "Track Price"
                        )}
                    </Button>
                </div>
            </form>
            {/* Auth modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    )
}
