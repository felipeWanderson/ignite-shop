
import { CartContextProvider } from '@/context/cart'
import { globalStyles } from '@/styles/global'
import { Container} from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { Header } from '@/components/header'
import { useRouter } from 'next/router'
import { HeaderSimple } from '@/components/headerSimple'



globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const SUCCESS_PAGE = '/success'

  const {route = ''} = useRouter()
  const isSuccessPage = route === SUCCESS_PAGE;

  return (
    <Container>
      <CartContextProvider>
        {!isSuccessPage ? <Header /> : <HeaderSimple />}
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>

  )
}
