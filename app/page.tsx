import HeroSection from "@/components/HeroSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();
	return (
		<main>
			<HeroSection user={user} />
		</main>
	);
}
