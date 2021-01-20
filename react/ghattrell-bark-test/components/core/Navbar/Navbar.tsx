import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo } from '@components/ui';

interface Props {
  className?: string
}

const Navbar: FC<Props> = ({ className }) => {
  const rootClassName = className

  return (
    <div className={rootClassName}>
      <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className="space-x-4 ml-6">
            <Link href="/">
              <a className={s.link}>Customers</a>
            </Link>
            <Link href="/professionals">
              <a className={s.link}>Professionals</a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar