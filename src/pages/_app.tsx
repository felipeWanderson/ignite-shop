import Cart from '@/components/cart'
import { globalStyles } from '@/styles/global'
import { CartContainer, CartButtonContainer, CartNotfication, Container, Header, CartContent, CartItensContainer, CartItem, ImageContainer, CloseCart, CartResumeContainer, CartResumeItem, CartButtonFinalizeOrder } from '@/styles/pages/app'
import { Handbag, X } from '@phosphor-icons/react'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { useState } from 'react'
import logoIgniteShop from '../assets/logo.svg'
import shirt from '../assets/shirts/1.png'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(true)

  const toogleCart = () => {
    setIsCartOpen(prevState => !prevState)
  } 
  return (
    <Container>
      <Header>
        <Image src={logoIgniteShop} alt=""  />
        <CartButtonContainer type="button" onClick={toogleCart}>
          <Handbag size={24} weight="bold" />
          <CartNotfication>1</CartNotfication>
        </CartButtonContainer>
      </Header>
      <CartContainer active={isCartOpen}>
        <CloseCart type='button' onClick={toogleCart}>
          <X size={24} weight="bold" />
        </CloseCart>
        <CartContent>
          <strong>Sacola de compras</strong>
          <CartItensContainer>
            <CartItem>
              <ImageContainer>
                <Image src={shirt} width={94} height={94} alt="" />
              </ImageContainer>
              <div>
                <span>Camiseta Beyond the Limits</span>
                <strong>R$ 79,90</strong>
                <button>Remover</button>
              </div>
            </CartItem>
            <CartItem>
              <ImageContainer>
                <Image src={shirt} width={94} height={94} alt="" />
              </ImageContainer>
              <div>
                <span>Camiseta Beyond the Limits</span>
                <strong>R$ 79,90</strong>
                <button type="button">Remover</button>
              </div>
            </CartItem>
            <CartItem>
              <ImageContainer>
                <Image src={shirt} width={94} height={94} alt="" />
              </ImageContainer>
              <div>
                <span>Camiseta Beyond the Limits</span>
                <strong>R$ 79,90</strong>
                <button type="button">Remover</button>
              </div>
            </CartItem>
          </CartItensContainer>
          <CartResumeContainer>
            <CartResumeItem>
                <span>Quantidade</span>
                <strong>3 itens</strong>
            </CartResumeItem>
            <CartResumeItem variant="total">
                <span>Valor total</span>
                <strong>R$ 270,00</strong>
            </CartResumeItem>
            <CartButtonFinalizeOrder>
              Finalizar compra
            </CartButtonFinalizeOrder>
          </CartResumeContainer>
        </CartContent>
      </CartContainer>
      <Component {...pageProps} />
    </Container>
  )
}
