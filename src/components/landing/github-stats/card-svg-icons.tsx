import React from "react";

type IconProps = {
  className?: string;
};

export const RepositoryIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    className={`absolute w-32 h-32 bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:-translate-y-2 transform ${className}`}
    viewBox="0 0 256 256"
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path
      d="M128 129.09V232a8 8 0 01-3.84-1l-88-48.16a8 8 0 01-4.16-7V80.2a8 8 0 01.7-3.27z"
      opacity="0.2"
    ></path>
    <path d="M223.68 66.15l-88-48.15a15.88 15.88 0 00-15.36 0l-88 48.17a16 16 0 00-8.32 14v95.64a16 16 0 008.32 14l88 48.17a15.88 15.88 0 0015.36 0l88-48.17a16 16 0 008.32-14V80.18a16 16 0 00-8.32-14.03zM128 32l80.34 44L128 120 47.66 76zM40 90l80 43.78v85.79l-80-43.75zm96 129.57v-85.75L216 90v85.78z"></path>
  </svg>
);

export const LanguageIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={`lucide lucide-code absolute w-32 h-32 font-extralight bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:translate-y-2 transform ${className}`}
    viewBox="0 0 24 24"
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path d="M16 18L22 12 16 6"></path>
    <path d="M8 6L2 12 8 18"></path>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={`absolute w-32 h-32 bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:translate-y-2 transform ${className}`}
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path
      d="M229.06 108.79l-48.7 42 14.88 62.79a8.4 8.4 0 01-12.52 9.17L128 189.09l-54.72 33.65a8.4 8.4 0 01-12.52-9.17l14.88-62.79-48.7-42A8.46 8.46 0 0131.73 94l63.91-5.2 24.62-59.6a8.36 8.36 0 0115.48 0l24.62 59.6 63.91 5.2a8.46 8.46 0 014.79 14.79z"
      opacity="0.2"
    ></path>
    <path d="M239.18 97.26A16.38 16.38 0 00224.92 86l-59-4.76-22.78-55.09a16.36 16.36 0 00-30.27 0L90.11 81.23 31.08 86a16.46 16.46 0 00-9.37 28.86l45 38.83L53 211.75a16.38 16.38 0 0024.5 17.82l50.5-31.08 50.53 31.08A16.4 16.4 0 00203 211.75l-13.76-58.07 45-38.83a16.43 16.43 0 004.94-17.59zm-15.34 5.47l-48.7 42a8 8 0 00-2.56 7.91l14.88 62.8a.37.37 0 01-.17.48c-.18.14-.23.11-.38 0l-54.72-33.65a8 8 0 00-8.38 0l-54.72 33.67c-.15.09-.19.12-.38 0a.37.37 0 01-.17-.48l14.88-62.8a8 8 0 00-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16a8 8 0 006.72-4.94l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153 91.86a8 8 0 006.75 4.92l63.92 5.16c.15 0 .24 0 .33.29s0 .4-.16.5z"></path>
  </svg>
);

export const CommitIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={`absolute w-32 h-32 bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:-rotate-12 transform ${className}`}
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path d="M176 128a48 48 0 11-48-48 48 48 0 0148 48z" opacity="0.2"></path>
    <path d="M248 120h-64.58a56 56 0 00-110.84 0H8a8 8 0 000 16h64.58a56 56 0 00110.84 0H248a8 8 0 000-16zm-120 48a40 40 0 1140-40 40 40 0 01-40 40z"></path>
  </svg>
);

export const OpenSourceIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={`absolute w-32 h-32 bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:-rotate-12 transform ${className}`}
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path
      d="M96,64A24,24,0,1,1,72,40,24,24,0,0,1,96,64ZM200,168a24,24,0,1,0,24,24A24,24,0,0,0,200,168Z"
      opacity="0.2"
    ></path>
    <path d="M104,64A32,32,0,1,0,64,95v66a32,32,0,1,0,16,0V95A32.06,32.06,0,0,0,104,64ZM56,64A16,16,0,1,1,72,80,16,16,0,0,1,56,64ZM88,192a16,16,0,1,1-16-16A16,16,0,0,1,88,192Zm120-31V110.63a23.85,23.85,0,0,0-7-17L163.31,56H192a8,8,0,0,0,0-16H144a8,8,0,0,0-8,8V96a8,8,0,0,0,16,0V67.31L189.66,105a8,8,0,0,1,2.34,5.66V161a32,32,0,1,0,16,0Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,200,208Z"></path>
  </svg>
);

export const MergedIcon: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={`absolute w-32 h-32 bottom-[-100px] top-10 right-[-32px] opacity-10 group-hover:text-white/80 duration-500 transition-all group-hover:-rotate-12 transform ${className}`}
    {...({} as React.SVGProps<SVGSVGElement>)}
  >
    <path
      d="M104,56A24,24,0,1,1,80,32,24,24,0,0,1,104,56Z"
      opacity="0.2"
    ></path>
    <path d="M208,112a32.05,32.05,0,0,0-30.69,23l-42.21-6a8,8,0,0,1-4.95-2.71L94.43,84.55A32,32,0,1,0,72,87v82a32,32,0,1,0,16,0V101.63l30,35a24,24,0,0,0,14.83,8.14l44,6.28A32,32,0,1,0,208,112ZM64,56A16,16,0,1,1,80,72,16,16,0,0,1,64,56ZM96,200a16,16,0,1,1-16-16A16,16,0,0,1,96,200Zm112-40a16,16,0,1,1,16-16A16,16,0,0,1,208,160Z"></path>
  </svg>
);
