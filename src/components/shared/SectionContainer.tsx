import { COLORS, SPACING } from '../../styles'
import styled from 'styled-components'

export const SectionContainer = styled.div`
  all: revert;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: ${COLORS.blueMedium} ${COLORS.blueDarkAlpha};
  padding: 0.8rem ${SPACING.medium};
  border-radius: ${SPACING.smallRadius};
  background-color: ${COLORS.greyDarkAlpha};
  box-shadow: ${COLORS.shadowBlueLight};
`

  // all: revert;
  // display: flex;
  // flex-direction: column;
  // overflow-y: auto;
  // overflow-x: hidden;
  // scrollbar-color: ${COLORS.blueMedium} ${COLORS.blueDarkAlpha};
  // scrollbar-width: thin;
  // text-align: left;
  // padding: ${SPACING.primary} ${SPACING.large};
  // border-radius: ${SPACING.smallRadius};
  // background-color: ${COLORS.greyDarkAlpha};
  // box-shadow: ${COLORS.shadowBlueLight};

// navbar
  // display: flex;
  // list-style-type: none;
  // margin: 1rem 0;
  // padding: 1.6em;
  // background-color: ${COLORS.greyDarkAlpha};
  // flex-flow: row;
  // border-radius: ${SPACING.smallRadius};
  // box-shadow: 0px 0px 8px ${COLORS.blueLightAlpha};
  // justify-content: space-evenly;
  // align-items: center;
