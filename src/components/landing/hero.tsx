import { BackgroundGradient, UI_CONFIG } from "@/core/config/hero-ui.config";
import {
  ContactSalesButton,
  GetStartedButton,
  NewsButton,
} from "./hero-buttons";
function HeroContent() {
  return (
    <section>
      <div
        className={`${UI_CONFIG.SPACING.SECTION} py-28 gap-12 text-${UI_CONFIG.COLORS.PRIMARY} overflow-hidden md:flex justify-center items-center`}
      >
        <div className="flex-none space-y-5 max-w-xl">
          <NewsButton />
          <h1
            className={`text-left tracking-tight max-w-md md:max-w-3xl ${UI_CONFIG.FONTS.SIZES.LARGE} tracking-tighter mr-auto font-${UI_CONFIG.FONTS.PRIMARY} font-normal text-transparent bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] leading-0 md:leading-0 md:pb-0 mt-1`}
          >
            Build your SAAS exactly how you want
          </h1>
          <p>
            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          </p>
          <div className="flex items-center gap-x-3 sm:text-sm">
            <GetStartedButton />
            <ContactSalesButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const selectedGradient = BackgroundGradient.PINK;

  return (
    <div className="relative">
      <HeroContent />
    </div>
  );
}
