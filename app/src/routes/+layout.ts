import type { LayoutLoad } from "./$types";
import { supabase } from '$lib/supabase'
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ route, url }) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session && route.id !== '/auth/login')
        redirect(302, '/auth/login');
    
    console.debug('Session', session);
    console.log(route, url)

    return {
        session
    }
}

// Disable server-side rendering for whole app
export const ssr = false;