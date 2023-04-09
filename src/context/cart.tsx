import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  priceUnit: number;
  priceBRL: string;
  defaultPriceId: string;
}

interface CartContextData {
  itens: Product[]
}
interface CartContextType {
  cart: CartContextData
  isCartOpen: boolean;
  handleToogleModal: () => void;
  addToCart: (product: Product) => void;
  totalItensInCart: number;
  removeItemInCart: (productId: string) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({children}: CartContextProviderProps) {
  const [cart, setCart] = useState({} as CartContextData) 
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItensInCart = cart?.itens?.map(item => item?.quantity).reduce((total, item) => total + item, 0) || 0

  useEffect(() => {
    setCart({
      itens: []
    })
  }, [])

  const toogleCart = () => {
    setIsCartOpen(prevState => !prevState)
  }

  const handleToogleModal = () => {
    toogleCart()
  }

  const addToCart = useCallback((product: Product) => {
    const { itens } = cart;
    const isProductExist = !!itens?.find(item => item?.id === product?.id);
    if (isProductExist) {
      const newItens = itens?.map(item => {
        if (item?.id === product?.id) {
          return {
            ...product,
            quantity: item?.quantity + product?.quantity
          }
        } else {
          return item
        }
      })

      setCart({
        itens: newItens
      })
    } else {
      setCart(prevState => ({
        ...prevState,
        itens: [...prevState?.itens, product],
      }))
    }
   
    setIsCartOpen(true)
  }, [cart])

  const removeItemInCart = useCallback((productId: string) => {
    const { itens } = cart
    const newItens = itens?.filter(item => item?.id !== productId)

    setCart({
      itens: newItens
    })
  }, [cart])

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      handleToogleModal,
      addToCart,
      totalItensInCart,
      removeItemInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}