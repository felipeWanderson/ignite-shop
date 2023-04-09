import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image";

import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useState } from "react";
import Head from "next/head";
import { CartContext } from "@/context/cart";


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
  priceUnit: number;
}

interface ProductPageProps {
  product: Product;
}


export default function Product({ product }: ProductPageProps) {
  const {addToCart} = useContext(CartContext)

  const handleAddToCart = (product: Product) => {
    const newItem = {
      id: product?.id,
      name: product?.name,
      imageUrl: product?.imageUrl,
      quantity: 1,
      priceUnit: product?.priceUnit,
      priceBRL: product?.price,
      defaultPriceId: product?.defaultPriceId
    }

    addToCart(newItem)
  }
  

  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>

          <p>{product?.description}</p>

          <button type="button" onClick={() => handleAddToCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id || '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount && new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price?.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceUnit: price?.unit_amount ? price?.unit_amount / 100 : 0
      }
    },
    revalidate: 60 * 60 * 1 //1 hora
  }
} 