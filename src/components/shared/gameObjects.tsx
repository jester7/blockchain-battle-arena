import IconGunBig from '../../assets/icon_gun_big.png'
import IconGunSmall from '../../assets/icon_gun_small.png'
import MechFigherBlue from '../../assets/mech_fighter_blue.png'
import MechFigherRed from '../../assets/mech_fighter_red.png'
import type { IRawGameObject } from '../../providers/types'

export const DEFAULT_CHARACTERS: IRawGameObject[] = [
  {
    objectName: 'character1',
    objectDesc: 'this is character 1',
    objectType: 'character',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_1_bg.png',
  },
  {
    objectName: 'character2',
    objectType: 'character',
    objectDesc: 'this is character 2',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_2_bg.png',
  },
  {
    objectName: 'character3',
    objectType: 'character',
    objectDesc: 'this is character 3',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmS5CKakuvy14oFBNGKS2Asyx7d7by7NEpyVxBu98debuB/character_idea_3_bg.png',
  },
]

export const DEFAULT_ACESSORIES: IRawGameObject[] = [
  {
    objectName: 'cigarette',
    objectType: 'acessory',
    objectDesc: 'smoke me',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmXCe6YNEdPg26wNJwD7NMnD1SqapfzKvL46DgAg1LS7zb?filename=cigarette.png',
  },
  {
    objectName: 'eye-lenser',
    objectDesc: 'eye lenser objectDesc',
    objectType: 'acessory',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmW5KqW4s4ZGp17F8QjCzu4Vh8wAe25E8Rfc2fnBxjRm8S?filename=eye_lenser.png',
  },
  {
    objectName: 'hat',
    objectType: 'acessory',
    objectDesc: 'A nice hat',
    objectImageUrl:
      'https://ipfs.io/ipfs/QmaBhmy2uxyzCgcBU1ZJ4chsfikPGjYetxC5RiF3FKyX8u?filename=hat.png',
  },
]

export const DEFAULT_WEAPONS = [
  {
    objectName: 'big',
    objectType: 'weapon',
    objectDesc: 'a big heavy gun',
    objectImageUrl: IconGunBig,
  },
  {
    objectName: 'small',
    objectType: 'weapon',
    objectDesc: 'a small but powerful gun',
    objectImageUrl: IconGunSmall,
  },
]

export const DEFAULT_MECH_SUITS = [
  {
    objectName: 'red-suit',
    objectType: 'suit',
    objectDesc: 'Red Mech Suit',
    objectImageUrl: MechFigherRed,
  },
  {
    objectName: 'blue-suit',
    objectType: 'suit',
    objectDesc: 'Blue Mech Suit',
    objectImageUrl: MechFigherBlue,
  },
]
