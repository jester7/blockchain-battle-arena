import dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'

dotenv.config()

const {
  RINKEBY_PRIVK = '',
  // MAINNET_PRIVK = '',
  // MUMBAI_PRIVK = '',
  // POLYGON_PRIVK = '',
  ALCHEMY_RINKEBY_URL = '',
  // ALCHEMY_MAINNET_URL = '',
  // ALCHEMY_POLYGON_URL = '',
  // ALCHEMY_MUMBAI_URL = '',
  // ETHERSCAN_API_KEY = '',
  // REPORT_GAS = '',
} = process.env


const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    // polygon: {
    //   url: ALCHEMY_POLYGON_URL,
    //   accounts: [POLYGON_PRIVK],
    // },
    // mumbai: {
    //   url: ALCHEMY_MUMBAI_URL,
    //   accounts: [MUMBAI_PRIVK],
    // },
    // mainnet: {
    //   url: ALCHEMY_MAINNET_URL,
    //   accounts: [MAINNET_PRIVK],
    // },
    rinkeby: {
      url: ALCHEMY_RINKEBY_URL,
      accounts: [RINKEBY_PRIVK],
    },
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY,
  // },
  // gasReporter: {
  //   enabled: REPORT_GAS !== undefined,
  //   currency: 'USD',
  // },
}

export default config
