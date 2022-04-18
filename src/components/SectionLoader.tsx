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
import { getDefaultProvider } from 'ethers';

export default function SectionLoader() {
  const { pathname } = useLocation();
  

  const [walletAddress, setWalletAddress] = useState("");
    const [ensName, setEnsName] = useState("");

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const login = async () => {
        if (!isAuthenticated) {

            await authenticate({ signingMessage: "Sign this message in order to login." })
                .then(function (user: any) {
                    console.log("logged in user:", user);
                    console.log(user!.get("ethAddress"));
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    useEffect(() => {
        const mainnetProvider = getDefaultProvider(); // Moralis typescript types bug, switched to using ethers
        if (walletAddress) {
          mainnetProvider.lookupAddress(walletAddress).then((name) => {
          if (typeof name === "string") {
            setEnsName(name);
            // update to actual ENS name if found
          }
        });
        }

        (async () => {
            if (user !== null) {
                setWalletAddress(user!.get("ethAddress"));
                //const ensName = await fetchEns({address: walletAddress});
                //setEnsName(ensName.name);
            }
        })();

     }, [user, Web3Api, ensName, walletAddress]);

  return (<>
    <Header />
    <main className="main-container">
      <Navbar />
      {pathname === "/" && (<Home />)}
      {pathname === "/mint" && (<Mint />)}
      {pathname === "/launch-game" && (<LaunchGame />)}
      {pathname === "/about" && (<About />)}
      {pathname === "/" && !isAuthenticated && (<ActionArea heading="Connect Wallet" message="" label={"Connect Wallet"} showButton={true}
      disableButton={false} isLoading={false} smallButton={false} loadingLabel={""} action={() => login()} showLabel={true} />)}
      {pathname === "/" && isAuthenticated && (<ActionArea heading="" message={"Connected as " + (ensName || walletAddress)} label={"Log Out"} showButton={true}
      disableButton={false} isLoading={false} smallButton={true} loadingLabel={""} action={() => logOut()} showLabel={true} />)}

        {pathname === "/about" && !isAuthenticated && (<ActionArea heading="Connect Wallet" message="" label={"Connect Wallet"} showButton={true}
      disableButton={false} isLoading={false} smallButton={false} loadingLabel={""} action={() => login()} showLabel={true} />)}
      {pathname === "/about" && isAuthenticated && (<ActionArea heading="" message={"Connected as " + (ensName || walletAddress)} label={"Log Out"} showButton={true}
      disableButton={false} isLoading={false} smallButton={true} loadingLabel={""} action={() => logOut()} showLabel={true} />)}
    </main>
  </>
  );
}

