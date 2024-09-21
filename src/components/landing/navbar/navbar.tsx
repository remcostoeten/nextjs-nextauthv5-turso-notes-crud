import Logo from "../../base/logo";
import NavLinks from "./menu-items";
import SignInButton from "./sign-in-button";

export default function Navbar() {
  return (
    <div className="flex justify-center w-full mt-4">
      <nav className="backdrop-blur-[6px] bg-body  flex justify-between  w-full opacity-100 w-full max-w-[750px] flex items-center h-min overflow-visible pl-[12px] pr-[8px] py-[8px] rounded-[32px]">
        <div className="flex-1 flex items-center">
          <Logo />
          <NavLinks />
        </div>
        <SignInButton />
      </nav>
    </div>
  );
}
