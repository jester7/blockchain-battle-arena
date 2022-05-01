import fs from 'fs-extra'
import { ethers } from 'hardhat'

;(async () => {
  try {
    const nftContractFactory = await ethers.getContractFactory(
      'GameObject'
    )
    const nftContract = await nftContractFactory.deploy()
    await nftContract.deployed()
    console.log('contract deployed to:', nftContract.address)
    fs.writeFileSync(`contract_address/${Date.now()}`, nftContract.address)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
