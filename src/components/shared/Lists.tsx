import styled from 'styled-components'
import { COLORS, SIZES, SPACING } from '../../styles'

export const UnorderedList = styled.ul`
  revert: all;
  margin: 0;
  padding: 0;
  font-family: co-text, sans-serif;
  list-style: none;
`

export const ListItem = styled.li`
  margin: ${SPACING.primary} 0;
  font-size: ${SIZES.paragraph};
  line-height: 1.6rem;
  &:before {
    content: '> ';
    color: ${COLORS.redPink};
    font-weight: bold;
  }
`
