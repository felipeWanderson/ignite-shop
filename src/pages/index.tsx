import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from 'keen-slider/react';


import { HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";

import 'keen-slider/keen-slider.min.css'
import Link from "next/link";
import Head from "next/head";


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products && products.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
            className="keen-slider__slide"
          >
            <Product>
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>

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
      }).format(price.unit_amount / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 horas
  }
}
