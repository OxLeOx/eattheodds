const exec = require('child_process').exec;
const deployments = require('../contracts/deployments.json');
const goerli = deployments.goerli;
const { resolve } = require('path');
const abiPath = resolve('../contracts/abi/EatTheOdds.json');
const slug = 'eat-the-odds-test'

exec(`graph init --product subgraph-studio --from-contract ${goerli.address} --network goerli  --abi ${abiPath} ${slug} ../`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    process.exit();
});