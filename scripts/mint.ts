import hre from 'hardhat'
import ContractInterface from '../artifacts/contracts/BBGameObject.sol/BBGameObject.json'
import dotenv from 'dotenv'

dotenv.config()

export const CHARACTERS = [
  {
    name: 'character1',
    description: 'the first character',
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    name: 'character2',
    description: 'the first character',
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    name: 'character3',
    description: 'the first character',
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
]

export const ACESSORIES = [
  {
    name: 'cigarette',
    description: 'the cigarette',
    url:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png',
  },
  {
    name: 'eye-lenser',
    description: 'the cigarette',
    url:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png',
  },
  {
    name: 'hat',
    description: 'the cigarette',
    url:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png',
  },
]

;(async () => {
  try {
    const provider = new hre.ethers.providers.AlchemyProvider(
      'rinkeby',
      process.env.ALCHEMY_RINKEBY_API_KEY
    )
    const wallet = new hre.ethers.Wallet(process.env.LOCAL_PRIVK || '', provider)
    const contract = new hre.ethers.Contract(
      process.env.RINKEBY_PRIVK,
      ContractInterface.abi,
      wallet
    )
    const tx = await contract.mintGameObject(
      CHARACTERS[0].name,
      CHARACTERS[0].description,
      CHARACTERS[0].url,
      ACESSORIES[0].name,
      ACESSORIES[0].url
    )
    const receipt = await tx.wait()
    console.log({ receipt })
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()

