import test from "node:test";
import assert from "node:assert/strict";
import { resolveServerHost } from "./server.js";

test("resolveServerHost falls back to 0.0.0.0 when HOST is unset", () => {
	assert.equal(resolveServerHost(undefined, "development"), "0.0.0.0");
});

test("resolveServerHost keeps explicit HOST values", () => {
	assert.equal(resolveServerHost("127.0.0.1", "development"), "127.0.0.1");
});
