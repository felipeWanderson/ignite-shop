import {styled} from '..'

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

export const CartContainer = styled('button', {
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
  border:'3px solid #121214',
  background: '$green300',
  borderRadius: '100%',

  position: 'absolute',
  left: 31,
  top: -7,

  fontWeight: 700,
  fontSize: '$sm',
  color: '$white'
})