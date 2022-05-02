import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'

let contract: Contract

describe('Game Object', () => {
  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory('BBGameObject')
    contract = await ContractFactory.deploy()
    await contract.deployed()
  })
  it('user should be able to create a game object', async () => {
    const tx = await contract.mintGameObject(
      'mech warrior',
      'a warrior for game',
      'http:/someipfsurl.ipfs',
      'type'
    )
    await tx.wait()
    const uri = await contract.tokenURI(0)
    const parts = uri.split(',')[1]
    const str = Buffer.from(parts, 'base64').toString()
    const json = JSON.parse(str)
    expect(json.name).equal('mech warrior')
  })
})
