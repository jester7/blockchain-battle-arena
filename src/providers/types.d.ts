export interface IPlayer {
  displayName: string
  character: Nullable<IRawGameObject>
  acessory: Nullable<IRawGameObject>
  weapon: Nullable<IRawGameObject>
}
export interface IGameObject {
  objectName: string
  objectType: string
  objectImageUrl: string
}

export interface IRawGameObject {
  tokenId?: string
  contractType?: string
  contractName?: string
  tokenAddress?: string
  tokenOwner?: string
  amount?: string
  symbol?: string
  tokenUri?: string
  objectName?: string
  objectDesc?: string
  objectImageUrl?: string
  objectType?: string
  openseaAddress?: string
}

export interface IMoralisResult {
  amount?: string
  block_number?: string
  block_number_minted?: string
  contract_type?: string
  metadata?: string
  name?: string
  owner_of?: string
  symbol?: string
  synced_at?: string
  token_address?: string
  token_hash?: string
  token_id?: string
  token_uri?: string
}
