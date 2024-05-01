
const NETWORK = "mainnet"
const args = require("./arguments")
const argsPath = "./scripts/deploy_mainnet/arguments.js";

const { deploy } = require('../deploy.js');

deploy(NETWORK, args, argsPath)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
