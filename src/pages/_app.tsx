import { globalStyles } from '@/styles/global'
import { CartContainer, CartNotfication, Container, Header } from '@/styles/pages/app'
import { Handbag } from '@phosphor-icons/react'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import logoIgniteShop from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoIgniteShop} alt=""  />
        <CartContainer>
          <Handbag size={24} weight="bold" />
          <CartNotfication>1</CartNotfication>
        </CartContainer>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
