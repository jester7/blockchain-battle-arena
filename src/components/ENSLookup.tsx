import useENSName from "../hooks/useENSName";

type Address = {
  address: string | string[];
};
// add normal ENS lookup> from ens name to address
// https://docs.ens.domains/dapp-developer-guide/resolving-names
const ENSLookup = ({ address }: Address) => {
  return <>{useENSName(address)}</>;
};

export default ENSLookup;
