import { HelpCircle, LogIn, LucideIcon, UserPlus } from "lucide-react";

type AuthLinkProps = {
  href: string;
  Icon: LucideIcon;
  text: string;
};

export const links: AuthLinkProps[] = [
  { href: "/login", Icon: LogIn, text: "Login" },
  { href: "/register", Icon: UserPlus, text: "Register" },
  { href: "/help", Icon: HelpCircle, text: "Help" },
];

export const textContent = {
  tabs: {
    products: "Products",
    pricing: "Authentication",
    blog: "Blog",
  },
  products: {
    startup: {
      title: "Startup",
      items: ["Funding", "Networking", "Mentorship"],
    },
    scaleup: {
      title: "Scaleup",
      items: ["Growth Strategies", "Market Expansion", "Team Building"],
    },
    enterprise: {
      title: "Enterprise",
      items: [
        "Digital Transformation",
        "Innovation Labs",
        "Corporate Ventures",
      ],
    },
    viewMore: "View more products",
  },
  pricing: {
    home: "Home",
    analytics: "Analytics",
    reports: "Reports",
  },
  blog: {
    firstPost: {
      title: "Funding 101",
      description: "Essential guide for startup funding",
    },
    secondPost: {
      title: "Scaling Challenges",
      description: "Common pitfalls and how to avoid them",
    },
    viewMore: "View more posts",
  },
};
