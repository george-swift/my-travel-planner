import { ReactNode } from 'react'
import cn from 'classnames'

interface Props {
  className?: string
  children: ReactNode | ReactNode[]
  element?: keyof JSX.IntrinsicElements
  id?: string
}

const Container = ({
  className,
  children,
  element: Element = 'div',
  id
}: Props) => {
  return (
    <Element {...(id && { id })} className={cn('mx-auto max-w-7xl', className)}>
      {children}
    </Element>
  )
}

export default Container
