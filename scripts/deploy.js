const hre = require("hardhat");

async function main(){
   

    const Lock = await hre.ethers.utils.parseEther("Lock");
    const lock = await Lock.deploy(unlockTime, {value: lockedAmount});

    await lock.deployed();

    console.log("Lock with 1 ETH deployed yo:", lock.address);
}

main().catch ((error) =>{
    console.error(error);
    process.exitCode = 1;
});