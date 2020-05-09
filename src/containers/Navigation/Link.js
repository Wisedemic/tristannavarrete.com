import { forwardRef } from 'react'
import { useRouter } from 'next/router'

export const Link = forwardRef(
  ({ onClick = undefined, children, href, ...rest }, ref) => {
    const router = useRouter()
    return (
      <a
        ref={ref}
        href={href}
        onClick={e => {
          e.preventDefault()
          if (onClick) onClick()
          if (href.charAt(0) === '#') {
            console.log(`/${href}`)
            router.replace(`/${href}`, `/${href}`, {
              shallow: true
            })
          } else {
            router.push(href)
          }
        }}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

export default Link
