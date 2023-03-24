import { keyframes, styled } from '..'

const contentShow = keyframes({
  '0%': { opacity: 0, },
  '100%': { opacity: 1},
});
const contentClose = keyframes({
  '0%': { opacity: 1, },
  '100%': { opacity: 0},
});

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeght: '100vh'
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  background: '$gray800',

  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',

  position: 'relative',

  svg: {
    fill: '$gray300',
  }
});

export const CartNotfication = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 24,
  height: 24,
  border: '3px solid #121214',
  background: '$green300',
  borderRadius: '100%',

  position: 'absolute',
  left: 31,
  top: -7,

  fontWeight: 700,
  fontSize: '$tiny',
  color: '$white'
})

export const CartContainer = styled('aside', {
  position: 'absolute',
  width: 480,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 100,

  background: '$gray900',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  display: 'none',
  transform: 'translateX(110%)',
  animation: `${contentShow} 0.2s ease-out`,

  variants: {
    active: {
      true: {
        transform: 'translateX(0%)',
        display: 'inherit',
      },
      false: {
        animation: `${contentShow} 0.2s ease-out`
      }
    }
  }
})

export const CloseCart = styled('button', {
  position: 'absolute',
  width: 24,
  height: 24,
  left: 432,
  top: 24,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',

  cursor: 'pointer',

  svg: {
    fill: '$gray300'
  }
})

export const CartContent = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  padding: '72px 48px 48px 48px',
});

export const CartItensContainer = styled('div', {
  marginTop: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: 24
});
export const ImageContainer = styled('div', {
  width: 100,
  height: 100,
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
})
export const CartItem = styled('div', {
  display: 'flex',
  gap: 20,
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,

    span: {
      fontSize: '$md',
      lineHeight: '160%',
      color: '$gray300'
    },

    strong: {
      color: '$gray100'
    },

    button: {
      background: 'transparent',
      border: 'none',
      color: '$green500',
      cursor: 'pointer',

      fontWeight: 'bold',
      fontSize: '$sm',
      lineHeight: '160%'
    }
  }
});

export const CartResumeContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: 8,
})
export const CartResumeItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  span: {
    fontSize: '$sm',
    lineHeight: '160%',
    color: '$gray100'
  },
  strong: {
    fontSize: '$md',
    fontWeight: 400,
    lineHeight: '160%',
    color: '$gray300'
  },

  variants: {
    variant: {
      total: {
        span: {
          fontSize: '$md',
          fontWeight: 'bold',
          lineHeight: '160%',
          color: '$gray100'
        },
        strong: {
          fontSize: '$xl',
          fontWeight: 'bold',
          lineHeight: '140%',
          color: '$gray100'
        },
      }
    }
  }
})

export const CartButtonFinalizeOrder = styled('button', {
  marginTop: 52,
  width: '100%',
  height: 69,
  padding: '20px 32px',
  background: '$green500',
  borderRadius: 8,
  border: 'none',
  fontWeight: 'bold',
  fontSize: '$md',
  color: '$white',

  cursor: 'pointer',

  transition: 'background-color 0.2s',

  '&:not(:disabled):hover': {
    background: '$green300',
  },

  '&:disabled': {
    cursor: 'not-allowed'
  }
});