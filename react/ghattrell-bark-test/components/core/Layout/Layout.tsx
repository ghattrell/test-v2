import { FC } from 'react'
import { Container } from '@components/ui'
import { Navbar } from '@components/core'
import s from './Layout.module.css'

interface Props {
  children: any
}

const Layout: FC<Props> = ({ children }) => {
  return (
      <div className={s.root}>
        <header
          className='sticky top-0 bg-primary z-40'
        >
          <Container>
            <Navbar />
          </Container>
        </header>
        <main className="fit">{children}</main>
      </div>
  )
}

export default Layout
