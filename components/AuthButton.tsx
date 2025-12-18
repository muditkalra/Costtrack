"use client";

import { Signout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { type User } from "@supabase/supabase-js";
import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { CurrentUserAvatar } from "./CurrentUserAvatar";


export default function AuthButton({ user }: { user: User | null }) {
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (user) {
        return (
            <div className="flex gap-4">
                <CurrentUserAvatar />
                <Button variant="ghost" size="sm" className="gap-2" onClick={Signout}>
                    Sign Out
                    <LogOut className="size-4" />
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Button size={"default"} onClick={() => setShowAuthModal(true)}>
                Sign In <LogIn />
            </Button>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    );
}