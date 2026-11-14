import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	handler: (req, res) => {
		res.status(429).json({
			error: "Too many requests from this IP. Try again later.",
		});
	},
});

export const createConcurrencyLimiter = (maxConcurrent = 1) => {
	if (!Number.isInteger(maxConcurrent) || maxConcurrent < 1) {
		throw new RangeError("maxConcurrent must be a positive integer");
	}

	let activeRequests = 0;

	return (req, res, next) => {
		if (activeRequests >= maxConcurrent) {
			return res
				.set("Retry-After", "5")
				.status(503)
				.json({
					error: "The conversion service is busy. Please try again shortly.",
				});
		}

		activeRequests += 1;
		let released = false;
		const release = () => {
			if (released) return;
			released = true;
			activeRequests -= 1;
		};

		res.once("finish", release);
		res.once("close", release);
		next();
	};
};

export const conversionConcurrencyLimiter = createConcurrencyLimiter(1);
