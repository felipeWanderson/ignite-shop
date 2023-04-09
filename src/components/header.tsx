import { CartContext } from '@/context/cart'
import { CartContainer, CartButtonContainer, CartNotfication, Container, HeaderContainer, CartContent, CartItensContainer, CartItem, ImageContainer, CloseCart, CartResumeContainer, CartResumeItem, CartButtonFinalizeOrder } from '@/styles/pages/app'
import { Handbag, X } from '@phosphor-icons/react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useMemo, useState } from 'react'
import logoIgniteShop from '../assets/logo.svg'

export function Header() {

  const { cart, isCartOpen, handleToogleModal, totalItensInCart, removeItemInCart } = useContext(CartContext)
  const amountTotal = cart?.itens?.length === 0 ? 0 : cart?.itens?.map(item => {
    return item?.priceUnit * item?.quantity || 0
  }).reduce((acc, item) => acc + item, 0)

  const numberFormat = (number: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number)
  }

  const itensInCart = useMemo(() => {
    return cart?.itens?.map(item => {
      const priceBRL = numberFormat(item?.priceUnit * item?.quantity)
      return {
        ...item,
        priceBRL
      }
    })
  }, [cart?.itens])

  async function handleBuyButton() {
    try {
      const {itens} = cart;
      const lineItens = itens?.map(item => {
        return {
          quantity: item?.quantity,
          price: item?.defaultPriceId
        }
      })
      const response = await axios.post('/api/checkout', {
        line_items: lineItens
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch {
      alert('Falha ao redirecionar ao checkout!')
    }
  }
  return (
    <>
      <HeaderContainer>
      <Link href="/">
        <Image src={logoIgniteShop} alt="" />
      </Link>
        <CartButtonContainer type="button" onClick={() => handleToogleModal()}>
          <Handbag size={24} weight="bold" />
          {totalItensInCart > 0 && <CartNotfication>{totalItensInCart}</CartNotfication>}
        </CartButtonContainer>
      </HeaderContainer>
      <CartContainer active={isCartOpen}>
        <CloseCart type='button' onClick={() => handleToogleModal()}>
          <X size={24} weight="bold" />
        </CloseCart>
        <CartContent>
          <strong>Sacola de compras</strong>
          <CartItensContainer>
            {itensInCart && itensInCart.map(item => (
              <CartItem key={item?.id}>
              <ImageContainer>
                <Image src={item?.imageUrl} width={94} height={94} alt="" />
              </ImageContainer>
              <div>
                <span>{item?.name}</span>
                <strong>{item?.priceBRL}</strong>
                <button onClick={() => removeItemInCart(item?.id)}>Remover</button>
              </div>
            </CartItem>
            ))}
            
          </CartItensContainer>
          <CartResumeContainer>
            <CartResumeItem>
              <span>Quantidade</span>
              <strong>{totalItensInCart || 0} itens</strong>
            </CartResumeItem>
            <CartResumeItem variant="total">
              <span>Valor total</span>
              <strong>{numberFormat(amountTotal || 0)}</strong>
            </CartResumeItem>
            <CartButtonFinalizeOrder type="button" onClick={handleBuyButton}>
              Finalizar compra
            </CartButtonFinalizeOrder>
          </CartResumeContainer>
        </CartContent>
      </CartContainer>
    </>
  )
}