import { randomBytes } from "node:crypto";

console.log(randomBytes(32).toString("base64url"));
console.log(randomBytes(24).toString("base64url"));
console.log(randomBytes(8).toString("base64url"));