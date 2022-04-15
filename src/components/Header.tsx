import { Link } from "react-router-dom";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";


function ExternalLinks() {
    return (<>
        <ul className="external-links">
            <li><a href="https://github.com/jester7/blockchain-battle-arena" className="icon group github"> </a></li>
            <li><a href="https://replit.com/@jovanjester/Blockchain-Battle-Arena" className="icon group replit"> </a></li>
            <li><a href="https://testnets.opensea.io/collection/stick-figure-developers-test-taidwbxjlq" className="icon group opensea"> </a></li>
            <li><a href="https://twitter.com/JackBohmArt" className="icon group twitter jb"> </a></li>
            <li><a href="https://twitter.com/JovanJester" className="icon group twitter jj"> </a></li>
        </ul>
    </>);
}


export default function Header() {
    const [walletAddress, setWalletAddress] = useState("");
    const [ensName, setEnsName] = useState("");

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const login = async () => {
        if (!isAuthenticated) {

            await authenticate({ signingMessage: "Sign this message in order to login." })
                .then(function (user) {
                    console.log("logged in user:", user);
                    console.log(user!.get("ethAddress"));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    useEffect(() => { // Moralis typescript types bug , disabling for now
        // const fetchEns = async (options: {address: string}) => {
        //     // get ENS domain of an address
        //     return await Web3Api.resolve.resolveAddress(options);
        // };

        (async () => {
            if (user !== null) {
                setWalletAddress(user!.get("ethAddress"));
                //const ensName = await fetchEns({address: walletAddress});
                //setEnsName(ensName.name);
            }
        })();
        
     }, [user, Web3Api, ensName, walletAddress]);

    return <><header className="App-header">
                    <ExternalLinks />

        {/* <h1></h1> */}
        <Link className="address" to={"profiles/" + walletAddress}>{ensName || walletAddress}</Link>
        <button className="button connect-wallet" onClick={isAuthenticated ? logOut : login}>{isAuthenticated ? "Disconnect" : "Connect Wallet"}</button>
    </header>
        </>
}

