import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from 'keen-slider/react';
import { Handbag } from '@phosphor-icons/react'


import { AddToCartButton, HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";

import 'keen-slider/keen-slider.min.css'
import Link from "next/link";
import Head from "next/head";
import { useCallback, useContext} from "react";
import { CartContext } from "@/context/cart";


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  unitAmount: number;
  defaultPriceId: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {

  const {addToCart} = useContext(CartContext)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  const handleAddToCart = useCallback((product: Product) => {
    const newItem = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      quantity: 1,
      priceUnit: product.unitAmount,
      priceBRL: product.price,
      defaultPriceId: product?.defaultPriceId
    }

    addToCart(newItem);
  }, [addToCart])
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products && products.map(product => (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <Link
                href={`/product/${product.id}`}
                prefetch={false}
              >
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </Link>


              <AddToCartButton type="button" onClick={() => handleAddToCart(product)}>
                <Handbag size={32} weight="bold" />
              </AddToCartButton>
            </footer>
          </Product>


        ))}
      </HomeContainer>
    </>

  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount && new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id,
      unitAmount: price.unit_amount && price.unit_amount / 100
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}
