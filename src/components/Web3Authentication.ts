import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";

export type Web3UserInfo = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  walletAddress: string;
};

export default function Web3Authentication():Web3UserInfo {
  const [walletAddress, setWalletAddress] = useState("");
  const [ensName, setEnsName] = useState("");

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Sign this message in order to login.",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(() => {
    // Moralis typescript types bug , disabling for now
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

  return {
    isAuthenticated: isAuthenticated,
    isAuthenticating: isAuthenticating,
    walletAddress: walletAddress,
  };
}
