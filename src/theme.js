import { merge } from 'lodash'
import { theme as chakraTheme } from '@chakra-ui/core'

const breakpoints = ['20em', '30em', '48em', '62em', '80em', '120em']
breakpoints.xsm = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]
breakpoints.xxl = breakpoints[5]

const theme = merge({}, chakraTheme, {
  breakpoints,

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem'
  }
})

export default theme