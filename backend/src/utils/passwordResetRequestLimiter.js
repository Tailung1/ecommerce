import { RateLimiterMemory } from "rate-limiter-flexible";

export const passwordResetRequestLimiter = new RateLimiterMemory({ points: 30, duration: 10 * 60 });
// each email gets 3 “points”
// every request consumes 1 point
// after 3 requests → blocked for 10 minutes
