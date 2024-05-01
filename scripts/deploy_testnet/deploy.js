const args = require("./arguments")
const argsPath = "./scripts/deploy_testnet/arguments.js";
const NETWORK = "goerli"

const { deploy } = require('../deploy.js');

deploy(NETWORK, args, argsPath)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
