import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'
const PUBLIC_SUPABASE_URL = env.PUBLIC_SUPABASE_URL || 'https://prototype.invalid';
const PUBLIC_SUPABASE_ANON_KEY = env.PUBLIC_SUPABASE_ANON_KEY || 'prototype-disabled';
export const supabase = createClient(PUBLIC_SUPABASE_URL,PUBLIC_SUPABASE_ANON_KEY)