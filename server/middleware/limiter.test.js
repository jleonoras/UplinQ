import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { createConcurrencyLimiter } from "./limiter.js";

const createResponse = () => {
	const response = new EventEmitter();
	response.headers = {};
	response.set = (name, value) => {
		response.headers[name] = value;
		return response;
	};
	response.status = (statusCode) => {
		response.statusCode = statusCode;
		return response;
	};
	response.json = (body) => {
		response.body = body;
		return response;
	};
	return response;
};

test("limits concurrent work and releases a slot when the response closes", () => {
	const middleware = createConcurrencyLimiter(1);
	const firstResponse = createResponse();
	let admitted = 0;

	middleware({}, firstResponse, () => {
		admitted += 1;
	});

	const rejectedResponse = createResponse();
	middleware({}, rejectedResponse, () => {
		admitted += 1;
	});

	assert.equal(admitted, 1);
	assert.equal(rejectedResponse.statusCode, 503);
	assert.equal(rejectedResponse.headers["Retry-After"], "5");

	firstResponse.emit("close");
	const nextResponse = createResponse();
	middleware({}, nextResponse, () => {
		admitted += 1;
	});

	assert.equal(admitted, 2);
});

test("rejects invalid concurrency limits", () => {
	assert.throws(() => createConcurrencyLimiter(0), RangeError);
});
