import { cn } from '@/core/utils/tw-cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-section-lighter', className)}
      {...props}
    />
  )
}

export { Skeleton }
