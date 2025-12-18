"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { GoogleIcon } from '@/lib/icons';
import { createClient } from "@/lib/supabase/client";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        const { origin } = window.location;

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <form>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Sign in to continue</DialogTitle>
                        <DialogDescription>
                            Track product prices and get alerts on price drops
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        variant={"outline"}
                        className='gap-4'
                        size={"lg"}
                        onClick={handleGoogleLogin}
                    >
                        Continue With Google
                        <GoogleIcon />
                    </Button>
                </DialogContent>
            </form>
        </Dialog>
    )
}
