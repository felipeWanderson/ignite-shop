import {  HeaderContainerSimple } from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import logoIgniteShop from '../assets/logo.svg'

export function HeaderSimple() {


  return (
    <HeaderContainerSimple>
      <Link href="/">
        <Image src={logoIgniteShop} alt="" />
      </Link>
      
    </HeaderContainerSimple>
  )
}