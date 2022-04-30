// switched on lastIndex
import Character1Bg from '../../assets/character_1_bg.png'
import Character2Bg from '../../assets/character_2_bg.png'
import Character3Bg from '../../assets/character_3_bg.png'
import Cigarette from '../../assets/cigarette.png'
import EyeLenser from '../../assets/eye_lenser.png'
import Hat from '../../assets/hat.png'
interface IBaseNft {
  name: string
  type: string
  index: number
  image: any
  imageUrl: string
}

export type IMintable = ICharacter | IAcessory
export interface ICharacter extends IBaseNft {}
export interface IAcessory extends IBaseNft {}

export const CHARACTERS: ICharacter[] = [
  {
    name: 'character1',
    type: 'character',
    index: 1,
    image: Character1Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    name: 'character2',
    type: 'character',

    index: 2,
    image: Character2Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    name: 'character3',
    type: 'character',

    index: 3,
    image: Character3Bg,
    imageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
]

export const ACESSORIES: IAcessory[] = [
  {
    name: 'cigarette',
    type: 'acessory',

    index: 1,
    image: Cigarette,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/cigarette.png',
  },
  {
    name: 'eye-lenser',
    type: 'acessory',
    index: 2,
    image: EyeLenser,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/eye_lenser.png',
  },
  {
    name: 'hat',
    type: 'acessory',
    index: 3,
    image: Hat,
    imageUrl:
      'https://ipfs.io/ipfs/QmQ46GzbeaZwu986aPF6MgMbbVK1jFhSbuXk2VLLV4eTRW/hat.png',
  },
]
