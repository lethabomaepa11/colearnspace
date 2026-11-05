import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
