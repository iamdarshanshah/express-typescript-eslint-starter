import supertest from "supertest";
import JWT from "jsonwebtoken";
// import logger from "../../../logger";
import config from "../../../appConfigs";
import App from "../../../app";

const api = supertest(new App(7000).app);

const DEFAULT_TOKEN_EXPIRE_MINUTES = "240";
const TEST_CLIENT_DOMAIN = "https://test.test.com";
const TEST_CLIENT_EMAIL = "john@test.com";
const TEST_CLIENT_SECRET = "01515910-a207-11e9-b82c-f5d163bb1c27";
let authToken = "";

describe("Integration tests for user API", function usersApiIntegrationTests() {
  beforeAll(function setJWT(done) {
    const tokenPayload = {
      domain: TEST_CLIENT_DOMAIN,
      secret: TEST_CLIENT_SECRET,
      email: TEST_CLIENT_EMAIL
    };
    const signingOptions = {
      subject: "user",
      issuer: "iamdarshanshah",
      expiresIn: parseInt(DEFAULT_TOKEN_EXPIRE_MINUTES, 10) * 60 // Has to be in seconds
    };
    JWT.sign(
      tokenPayload,
      config.AUTH_SIGNING_SECRET,
      signingOptions,
      (err, token) => {
        if (token && !err) {
          authToken = token;
        }
      }
    );
    setTimeout(() => {
      done();
    }, 2000);
  });

  describe("Tests for get superheor apis", function testGetAPIs() {
    test("Test get all superheroes", function getSuperhero(done) {
      api
        .get("/api/v1/superheroes")
        .expect(200)
        .set({
          Authorization: authToken,
          cld: TEST_CLIENT_DOMAIN,
          cls: TEST_CLIENT_SECRET
        })
        .end((err, response) => {
          expect(err).toBeNull;
          done();
        });
    });

    test("Test get one superheroes", function getOneSuperhero(done) {
      api
        .get("/api/v1/superheroes/BLACKWIDOW")
        .expect(200)
        .set({
          Authorization: authToken,
          cld: TEST_CLIENT_DOMAIN,
          cls: TEST_CLIENT_SECRET
        })
        .end((err, response) => {
          expect(err).toBeNull;
          done();
        });
    });
  });

});
