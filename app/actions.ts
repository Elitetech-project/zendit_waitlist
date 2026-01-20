"use server";

import { createClient } from "@supabase/supabase-js";

export async function joinWaitlist(email: string) {
    // On the server, we can see ALL environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.POSTGRES_URL_SUPABASE_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_POSTGRES_URL_SUPABASE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return { error: "Database configuration missing on server." };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        const { error } = await supabase
            .from("waitlist")
            .insert([{ email }]);

        if (error) {
            if (error.code === "23505") {
                return { error: "You're already on the waitlist! 🚀" };
            }
            return { error: error.message };
        }

        return { success: true };
    } catch (err) {
        return { error: "An unexpected error occurred." };
    }
}
