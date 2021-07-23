import { Link } from '@chakra-ui/core'
import NextLink from 'next/link'

const AnchorLink = (props) => (
  <NextLink {...props}>
    <Link {...props} />
  </NextLink>
)

export default AnchorLink
