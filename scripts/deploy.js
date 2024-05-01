const { ethers } = require('hardhat');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const updateOutput = require('./update_output.js');

async function verify(network, address, path) {
  console.log("Start contract verification")
  try {
    const { stdout, stderr } = await exec(`npx hardhat verify ${address} --network ${network} --constructor-args ${path} `);
    if(stderr) return console.log('stderr:', stderr);
    console.log('stdout:', stdout);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

module.exports.deploy = async function main(network, args, argumentsPath) {

  const Contract = await ethers.getContractFactory("EatTheOdds");
  const contract = await Contract.deploy(...args)
  await contract.deployed();
  console.log("EatTheOdds contract deployed to address:", contract.address)
  await updateOutput('./contracts/deployments.json', { [network]: { address: contract.address, arguments: args } })

  console.log("Waiting for one minute for contract propagation")
  await new Promise(r => setTimeout(r, 60000));
  await verify(network, contract.address, argumentsPath)
}

  