import { COLORS } from '../../styles'
import { useLoading } from '../../providers'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
	from {transform:rotate(0deg);}
	to {transform:rotate(360deg);}
`

const Spinner = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 43%;
    top: 40%;
    width: 40px;
    height: 40px;
    border-style: solid;
    border-color: black;
    border-top-color: transparent;
    border-width: 4px;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`
const LoadDescription = styled.h1`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  left: 38%;
  top: 48%;
  z-index: 9999;
  font-size: 3rem;
  color: ${COLORS.blueDark};
`

export const FullScreenLoader = () => {
  const { loadingMessage } = useLoading()
  return (
    <>
      <Spinner />
      <LoadDescription>{loadingMessage}</LoadDescription>
    </>
  )
}
