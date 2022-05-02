// switched on lastIndex
import Character1Bg from '../../assets/character_1_bg.png'
import Character2Bg from '../../assets/character_2_bg.png'
import Character3Bg from '../../assets/character_3_bg.png'
import Cigarette from '../../assets/cigarette.png'
import EyeLenser from '../../assets/eye_lenser.png'
import Hat from '../../assets/hat.png'
interface IBaseNft {
  name: string
  description: string
  type: string
  url: any
  localImage: string
}

export type IMintable = ICharacter | IAcessory
export interface ICharacter extends IBaseNft {}
export interface IAcessory extends IBaseNft {}

export const CHARACTERS: ICharacter[] = [
  {
    name: 'character1',
    description: 'this is character 1',
    type: 'character',
    localImage: Character1Bg,
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    name: 'character2',
    type: 'character',
    description: 'this is character 2',
    localImage: Character2Bg,
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    name: 'character3',
    type: 'character',
    description: 'this is character 3',
    localImage: Character3Bg,
    url:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
]

export const ACESSORIES: IAcessory[] = [
  {
    name: 'cigarette',
    type: 'acessory',
    description: 'smoke me',
    localImage: Cigarette,
    url: 'https://ipfs.io/ipfs/QmXCe6YNEdPg26wNJwD7NMnD1SqapfzKvL46DgAg1LS7zb?filename=cigarette.png',
  },
  {
    name: 'eye-lenser',
    description: 'eye lenser description',
    type: 'acessory',
    localImage: EyeLenser,
    url: 'https://ipfs.io/ipfs/QmW5KqW4s4ZGp17F8QjCzu4Vh8wAe25E8Rfc2fnBxjRm8S?filename=eye_lenser.png',
  },
  {
    name: 'hat',
    type: 'acessory',
    description: 'A nice hat',
    localImage: Hat,
    url: 'https://ipfs.io/ipfs/QmaBhmy2uxyzCgcBU1ZJ4chsfikPGjYetxC5RiF3FKyX8u?filename=hat.png',
  },
]
