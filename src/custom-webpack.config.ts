/* eslint @typescript-eslint/no-var-requires: "off" */
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [new Dotenv()],
};
