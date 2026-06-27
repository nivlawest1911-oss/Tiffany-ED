import { auth } from "../src/lib/auth";

console.log("Auth keys:", Object.keys(auth));
if (auth.api) {
    console.log("Auth.api keys:", Object.keys(auth.api));
}
