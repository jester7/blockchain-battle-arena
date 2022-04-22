import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../game/constants";
import BattleArenaNFT from "../game/util/BattleArenaNFT.json";
import ActionArea from "./ActionArea";

export type MintProps = {
  walletAddress: string,
  ensName: string,
}

export default function Mint(props: MintProps) {
  const walletAddress = props.walletAddress;
  const ensName = props.ensName;

  const [mintContract, setMintContract] = useState<Contract>();
  const [lastTokenId, setLastTokenId] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(0);

  const [isMinting, setIsMinting] = useState(false);
  const [isMintComplete, setIsMintComplete] = useState(false);

  const [lastAccessoryIndex, setLastAccessoryIndex] = useState(0);

  const navigate = useNavigate();

  const ShowMintedNFT = () => {
    let imgUrl: string = "";
    let accImgUrl: string = "";
    // setLastIndex(1);
    // setLastAccessoryIndex(6);
    if (lastIndex !== 0) {
      switch (lastIndex) {
        case 1:
          imgUrl =
            "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png";
          break;
        case 2:
          imgUrl =
            "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png";
          break;
        case 3:
          imgUrl =
            "https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png";
          break;
        // case 4:
        //   imgUrl =
        //     "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png";
        //   break;
        // case 5:
        //   imgUrl =
        //     "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png";
        //   break;
        // case 6:
        //   imgUrl =
        //     "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png";
        //   break;
      }
    }

    if (lastAccessoryIndex !== 0) {
      switch (lastAccessoryIndex) {
        case 4:
          accImgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png";
          break;
        case 5:
          accImgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png";
          break;
        case 6:
          accImgUrl = "https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png";
          break;
      }
    }
    return (<>
         <div className="minted character" style={{backgroundImage:"url('"+imgUrl+"')"}}>
          <div className={"minted accessory accessory"+lastAccessoryIndex} style={{backgroundImage:"url('"+accImgUrl+"')"}}></div>
         </div>
        <h3>Mint an accessory</h3>
        <p>Click on an accessory to mint it.</p>

        <div className="nft-container">
          <div
            className="accessory-image nft-item image"
            id="cigarette"
            onClick={mintAccessory(4)}
          ></div>
          <div
            className="accessory-image nft-item image"
            id="eyelenser"
            onClick={mintAccessory(5)}
          ></div>
          <div
            className="accessory-image nft-item image"
            id="hat"
            onClick={mintAccessory(6)}
          ></div>
        </div>
      </>
    );
  };

  const mintCharacter = (characterIndex: number) => async () => {
    try {
      if (mintContract) {
        setIsMinting(true);
        console.log("started minting character NFT w/ index:", characterIndex);
        const mintTxn = await mintContract.mintCharacter(characterIndex);
        await mintTxn.wait();
        console.log("mintCharacter successful: ", mintTxn);
        setIsMinting(false);
      }
    } catch (error) {
      setIsMinting(false);
      console.warn("mintCharacter failed: ", error);
    }
  };

  const mintAccessory = (accessoryIndex: number) => async () => {
    try {
      if (lastTokenId === 0)
        throw new Error("Can't mint accessory without a character NFT first");
      if (mintContract) {
        setIsMinting(true);
        console.log("started minting accessory NFT w/ index:", accessoryIndex);
        const mintTxn = await mintContract.mintAccessoryWithDefaults(
          accessoryIndex,
          lastTokenId
        );
        await mintTxn.wait();
        console.log("mintAccessory successful: ", mintTxn);
          setLastAccessoryIndex(accessoryIndex);


        setIsMinting(false);
      }
    } catch (error) {
      setIsMinting(false);
      console.warn("mintAccessory failed: ", error);
    }
  };

  function getOpenSeaLink() {
    if (lastIndex === 0) return <> </>;
    return (
      !isMinting && mintContract && (
        <p>
          Click{" "}
          <a
            href={
              "https://testnets.opensea.io/assets/" + mintContract!.address + "/" + lastTokenId
            }
            target="_blank"
            rel="noreferrer"
          >
            here to view it on OpenSea
          </a>
          . It may take a minute or so to appear.
        </p>
      )
    );
  }

  function getGameLaunchButton() {
    return (
      !isMinting && (
        <button
          onClick={() => {
            navigate("/launch-game");
          }}
        >
          Launch Game
        </button>
      )
    );
  }

  useEffect(() => {
    const onCharacterMint = async (
      sender: string,
      tokenId: any,
      characterIndex: any
    ) => {
      setIsMintComplete(true);
      setLastTokenId(tokenId.toNumber());
      setLastIndex(characterIndex.toNumber());
      console.log("onCharacterMint: ", sender, lastTokenId, lastIndex);
    };

    const { ethereum } = window as any;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const mintContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        BattleArenaNFT.abi,
        signer
      );

      setMintContract(mintContract);
      mintContract.on("CharacterNFTMinted", onCharacterMint);
    } else {
      throw new Error("No ethereum provider found");
    }
  }, [lastTokenId, lastIndex]);

  return (
    <>
      <div className="home section visible">
        <h1>Mint a character</h1>
        <p>
          Click on a character to mint it. Minting is free and only costs gas
          payable with fake ETH on the Rinkeby testnet.
        </p>
        <div className="nft-container">
          <div
            className="nft-item character-image"
            id="character1"
            onClick={mintCharacter(1)}
          ></div>
          <div
            className="nft-item character-image"
            id="character2"
            onClick={mintCharacter(2)}
          ></div>
          <div
            className="nft-item character-image"
            id="character3"
            onClick={mintCharacter(3)}
          ></div>
        </div>
        {!isMinting && isMintComplete && <h3>Minting complete</h3>}
        <div
          className={
            isMinting ? "aftermint container minting" : "aftermint container"
          }
        >
          
          {getOpenSeaLink()}
          {isMintComplete && <ShowMintedNFT />}
          {/* <ShowMintedNFT /> */}

          {/* {getGameLaunchButton()} */}
        </div>
      </div>
      <ActionArea
        message={
          "Connected as " +
          (ensName || walletAddress) +
          ": make your selection above to mint a character or accessory then click Launch Game to play."
        }
        label={"Mint"}
        disableButton={false}
        isLoading={isMinting}
        loadingLabel={"Minting in progress"}
        action={() => {}}
        heading={""}
        showButton={false}
        smallButton={false}
        showLabel={!isMinting}
      />
    </>
  );
}
