import { Authenticator } from "../src";
import { expect, assert } from "chai";
import "mocha";

import creds from "../creds.json";

const USERNAME = creds.username;
const PASSWORD = creds.password;

const TESTING_ID = "lumia-mocha-test";

describe("Authenticator", () => {
    describe("authenticate", () => {
        it("should error on invalid password", async () => {
            const auth = new Authenticator();
            let failed = true;
            try {
                await auth.authenticate("ayaya", "test");
            }
            catch(e){
                failed = false;
                assert(e instanceof Error, "No Error returned ?");
            }
            if(failed){
                assert.fail("MonkaS");
            }
        });

        it("should return with valid credentials", async () => {
            const auth = new Authenticator();
            await auth.authenticate(USERNAME, PASSWORD, TESTING_ID);
        });

        it("should return an access token with valid credentials", async() => {
            const auth = new Authenticator();
            const res = await auth.authenticate(USERNAME, PASSWORD, TESTING_ID);
            expect(res.clientToken).to.eq(TESTING_ID, "Invalid client token returned");
        })
    });

    describe("refresh", () => {
        it("should fail on invalid token", async () => {
            const auth = new Authenticator();
            let failed = true;
            try {
                await auth.refresh("omegalul", "sorry, i have to test my library :(")
            }
            catch(e){
                failed = false;
                assert(e instanceof Error, "No Error returned ?");
            }
            if(failed){
                assert.fail("MonkaS");
            }
        });

        it("should work with correct token and client id", async () => {
            const auth = new Authenticator();

            const initial = await auth.authenticate(USERNAME, PASSWORD, TESTING_ID);
            const res = await auth.refresh(initial.accessToken, initial.clientToken);

            assert.exists(res.accessToken, "Access token does not exist");
        });
    });

    describe("validate", () => {
        it("should return false on invalid token", async () => {
            const res = await new Authenticator().validate("omegalul", TESTING_ID);
            assert.isFalse(res, "Did not return false for invalid token. Except 'omegalul' is valid for some reason ...");
        });

        it("should return true for a valid token", async () => {
            const auth = new Authenticator();

            const initial = await auth.authenticate(USERNAME, PASSWORD, TESTING_ID);
            const res = await auth.validate(initial.accessToken, initial.clientToken);
            assert.isTrue(res, "No valid token");
        });
    });

    describe("invalidate", () => {
        it("should return true", async() => {
            const auth = new Authenticator();

            const initial = await auth.authenticate(USERNAME, PASSWORD, TESTING_ID);
            const res = await auth.invalidate(initial.accessToken, initial.clientToken);
            assert.isTrue(res);
        });
    });

    describe("signOut", () => {
        it("should return false on invalid creds", async () => {
            const res = await new Authenticator().signOut("ayaya", "still testing :/");
            assert.isFalse(res);
        });

        it("should return true on success", async () => {
            const auth = new Authenticator();

            const res = await auth.signOut(USERNAME, PASSWORD);
            assert.isTrue(res);
        });
    })
})