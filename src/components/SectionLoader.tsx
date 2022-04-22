// import Web3Authentication, { Web3UserInfo } from "./Web3Authentication";
import { useLocation } from 'react-router-dom';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from "react";
import ActionArea from "./ActionArea";
import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import About from './About';
import Mint from './Mint';
import LaunchGame from '../game/LaunchGame';
import useENSName from '../hooks/useENSName';
import { ethers, getDefaultProvider } from 'ethers';
import Moralis from 'moralis/types';

export default function SectionLoader() {
  const { pathname } = useLocation();


  const [walletAddress, setWalletAddress] = useState("");
  const [ensName, setEnsName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChainCorrect, setIsChainCorrect] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  //const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  //const Web3Api = useMoralisWeb3Api();





  const checkChain = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        setErrorMsg("The MetaMask wallet was not found. Please install it and try again.");
        setIsAuthenticating(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const { chainId } = await provider.getNetwork();
      console.log("chainId: ", chainId);
      if (chainId === 4) {
        console.log("connected to Rinkeby testnet");
        setErrorMsg("");
        setIsChainCorrect(true);
      } else {
        setErrorMsg("Please connect to the Rinkeby testnet in MetaMask in order to continue.");
        setIsChainCorrect(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;

      if (!ethereum) {
        setErrorMsg("The MetaMask wallet was not found. Please install it and try again.");
        setIsAuthenticating(false);
        return;
      }

      checkChain();
      if (!isChainCorrect) {
        setIsAuthenticating(false);
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // const logOut = async () => {
  //     await logout();
  //     console.log("logged out");
  // }

  useEffect(() => {



    const checkIfWalletIsConnected = async () => {
      if (!isAuthenticated) {
        try {
          const { ethereum } = window as any;
          setIsAuthenticating(true);
          if (!ethereum) {
            setErrorMsg("The MetaMask wallet was not found. Please install it and try again.");
            setIsAuthenticating(false);
            return;
          } else {
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
              const account = accounts[0];
              console.log("Found authorized account:", account);
              setCurrentAccount(account);
              setIsAuthenticated(true);
            } else {
              console.log("No authorized account found");
            }
          }

          checkChain();
          if (!isChainCorrect) {
            setIsAuthenticating(false);
            return;
          }
        } catch (error) {
          console.log(error);
        }
        setIsAuthenticating(false);
      }
    }

    const provider = getDefaultProvider(); // Moralis typescript types bug, switched to using ethers
    if (currentAccount) {
      provider.lookupAddress(currentAccount).then((name) => {
        if (typeof name === "string") {
          setEnsName(name);
          // update to actual ENS name if found
        }
      });
    }

    checkIfWalletIsConnected();


  }, [ensName, currentAccount]);

  return (<>
    <Header />
    <main className="main-container">
      <Navbar />
      {pathname === "/" && (<Home />)}
      {pathname === "/mint" && (<Mint walletAddress={currentAccount} ensName={ensName} />)}
      {pathname === "/launch-game" && (<LaunchGame />)}
      {pathname === "/about" && (<About />)}
      {pathname === "/" && !isAuthenticated && (<ActionArea heading="Connect Wallet" message="" label={"Connect Wallet"} showButton={true}
        disableButton={false} isLoading={false} smallButton={false} loadingLabel={""} action={() => connectWallet()} showLabel={true} />)}
      {pathname === "/" && isAuthenticated && (<ActionArea heading="" message={"Connected as " + (ensName || walletAddress)} label={""} showButton={false}
        disableButton={false} isLoading={false} smallButton={true} loadingLabel={""} action={() => { }} showLabel={true} />)}

      {pathname === "/about" && !isAuthenticated && (<ActionArea heading="Connect Wallet" message="" label={"Connect Wallet"} showButton={true}
        disableButton={false} isLoading={false} smallButton={false} loadingLabel={""} action={() => connectWallet()} showLabel={true} />)}
      {pathname === "/about" && isAuthenticated && (<ActionArea heading="" message={"Connected as " + (ensName || walletAddress)} label={"Log Out"} showButton={true}
        disableButton={false} isLoading={false} smallButton={true} loadingLabel={""} action={() => connectWallet()} showLabel={true} />)}
    </main>
  </>
  );
}

