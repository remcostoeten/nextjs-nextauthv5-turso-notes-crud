import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-bg-section-lighter",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
