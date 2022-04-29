// switched on lastIndex
import Character1 from '../../assets/character_1.png'
import Character2 from '../../assets/character_2.png'
import Character3 from '../../assets/character_3.png'
import Character1Bg from '../../assets/character_1_bg.png'
import Character2Bg from '../../assets/character_2_bg.png'
import Character3Bg from '../../assets/character_3_bg.png'
import Cigarette from '../../assets/cigarette.png'
import EyeLenser from '../../assets/eye_lenser.png'
import Hat from '../../assets/hat.png'

export interface ICharacter {
  name: string
  tokenId: number
  img: any
  imageUrl: string
}

export interface IAcessory extends ICharacter {}

export const CHARACTERS: ICharacter[] = [
  {
    name: 'character1',
    tokenId: 1,
    img: Character1Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    name: 'character2',
    tokenId: 2,
    img: Character2Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    name: 'character3',
    tokenId: 3,
    img: Character3Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
  {
    name: 'character1',
    tokenId: 1,
    img: Character1,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    name: 'character2',
    tokenId: 2,
    img: Character2,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    name: 'character3',
    tokenId: 3,
    img: Character3,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
]

export const ACESSORIES: IAcessory[] = [
  {
    name: 'cigarette',
    tokenId: 1,
    img: Cigarette,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png',
  },
  {
    name: 'eye-lenser',
    tokenId: 2,
    img: EyeLenser,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png',
  },
  {
    name: 'hat',
    tokenId: 3,
    img: Hat,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png',
  },
]
