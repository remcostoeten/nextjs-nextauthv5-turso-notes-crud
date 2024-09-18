import React from "react";

type SocialBadgeProps = {
  number?: number;
  text: string;
  className?: string;
};

const SocialBadge: React.FC<SocialBadgeProps> = ({
  number,
  text,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-center bg-black text-white rounded-full border-2 border-solid border-[rgba(255,255,255,0.1)] px-4 py-1 shadow-[rgba(134,134,240,0.12)_0px_-20px_80px_-20px_inset] ${className}`}
      role="status"
    >
      <span aria-hidden="true" className="text-sm leading-6">
        {number.toString().padStart(2, "0")}
      </span>
      <span
        className="bg-[rgba(255,255,255,0.2)] h-3.5 w-px mx-3"
        aria-hidden="true"
      />
      <span className="text-[0.8125rem] leading-6 uppercase tracking-wide">
        {text}
      </span>
    </div>
  );
};

export default SocialBadge;
