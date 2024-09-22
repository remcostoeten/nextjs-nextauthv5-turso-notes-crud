'use client'

import Logo from '@/components/base/logo'
import { Tabs } from './Tabs'

export const DropdownNavigation = () => {
    return (
        <div className="flex  items-center w-full justify-start  md:justify-center  pt-4">
            <Logo isLink={true} />
            <Tabs />
        </div>
    )
}
