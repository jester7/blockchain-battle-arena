// /* eslint-disable no-undef */
// const main = async () => {
//   const nftContractFactory = await hre.ethers.getContractFactory(
//     "BattleArenaNFT"
//   );
//   const nftContract = await nftContractFactory.deploy();
//   await nftContract.deployed();
//   console.log("contract deployed to:", nftContract.address);

//   let txn;
//   let result;

//   for (let i = 0; i < 3; i++) {
//     const randChoice = Math.floor(Math.random() * 3) + 1;
//     console.log("i: %d, randchoice: %d", i, randChoice);

//     txn = await nftContract.mintCharacter(randChoice);
//     await txn.wait();
//     console.log("minted NFT %s with choice %i", i, randChoice);
//     const uri = await nftContract.tokenURI(i);
//     const url1 = await nftContract.getFullImage(i);
//     const url2 = await nftContract.getBaseCharacterImage(i);

//     console.log("has uri: %s", uri);
//     console.log("getFullImage: %s", url1);
//     console.log("getBaseCharacterImage: %s", url2);
//   }
//   console.log("testing accessory minting");
//   txn = await nftContract.mintAccessoryWithDefaults(4,1);
//   result = await nftContract.typeOf(3);
//   console.log("typeOf: %s", result);
//   result = await nftContract.getFullImage(3);
//   console.log("getfullimage: %s", result);
//   result = await nftContract.isAccessory(3);
//   console.log("isAccessory: %s", result);

//   result = await nftContract.isCharacter(3);
//   console.log("isCharacter: %s", result);
//   result = await nftContract.hasAccessories(1);
//   console.log("hasAccessories: %s", result);
//   // result = await nftContract.hasAccessories(0);
//   // console.log("hasAccessories: %s", result);

//   ////result = await nftContract.removeAccessory(1, 3);
//   //console.log("hasAccessories: %s", result);
//   ////result = await nftContract.hasAccessories(1);
//   ////console.log("from run, 1st call: hasAccessories: %s", result);
//   ////result = await nftContract.equipAccessory(1, 3);
//   ////result = await nftContract.hasAccessories(1);
//   ////console.log("from run, 2nd call: hasAccessories: %s", result);

//   result = await nftContract.getFullCharacterData(1);
//   console.log( result);

// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();
