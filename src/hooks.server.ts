import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server"

const limiter = new RetryAfterRateLimiter({
    IP: [2, "500ms"],
    cookie: {
        name: "cookie-limiter-id",
        secret: "SECRET-KEY-SERVER-ONLY",
        rate: [2, "500ms"],
        preflight: true,
    },
})

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith("/api")) {
        await limiter.cookieLimiter?.preflight(event)

        const status = await limiter.check(event)

        if (status.limited) {
            return new Response("Rate Limited", {
                status: 429,
                statusText: "Too Many Requests",
                headers: { "Retry-After": String(status.retryAfter) },
            })
        }
    }

    const response = await resolve(event)
    return response
}
