import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { recalculateRanks } from "$lib/server/projects/reCalculateRanks";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY
);

export async function get() {
  await recalculateRanks(supabase);
  return new Response(null, { status: 200 });
}
