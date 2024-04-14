require("dotenv/config");

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    password: process.env.LOGIN_PASSWORD,
    email: process.env.LOGIN_EMAIL,
  },
});
