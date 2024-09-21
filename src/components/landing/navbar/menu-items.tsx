'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { navItems } from '../../../core/config/navbar-menu-items'

export default function NavLinks() {
  return (
    <div className="flex-1 flex items-start justify-center gap-[28px]">
      {navItems.map((item) => (
        <NavLink key={item.name} {...item} />
      ))}
    </div>
  )
}

function NavLink({
  name,
  href,
  highlight,
  external
}: {
  name: string
  href: string
  highlight?: boolean
  external?: boolean
}) {
  const linkProps = external ? { target: '_blank', rel: 'noopener' } : {}

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Link
        href={href}
        className={`text-[14px] ${
          highlight ? 'opacity-40 cursor-pointer' : 'opacity-75'
        }`}
        {...linkProps}
      >
        {name}
      </Link>
    </motion.div>
  )
}
