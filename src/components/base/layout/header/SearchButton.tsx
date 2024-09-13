import { Search } from "lucide-react";
import { useCallback, useEffect } from "react";
import { buttonLabels, shortcuts } from "./buttonConfig";

const KeyboardShortcut = () => (
  <span className="cursor-text absolute bg-[#262626] border border-border-outline text-text-regular-nav rounded text-[12px] leading-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[0.15s] box-border px-1.5 py-0.5 border-solid right-2.5">
    {shortcuts.search}
  </span>
);

const SearchButton = () => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      console.log("Search shortcut triggered!");
      // You can add more functionality here, like opening a search modal
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleClick = () => {
    console.log("Search button clicked!");
    // You can add more functionality here, like opening a search modal
  };

  return (
    <button
      onClick={handleClick}
      className="
        bg-section-lighter hover:bg-bg-modal hover:cursor-pointer text-placeholder border-outline hover:border-regular transition-colors duration-300 
        hidden lg:flex items-center justify-center
        w-72 gap-2 rounded-md p-2
        absolute left-1/2 -translate-x-1/2
        cursor-text focus:outline-offset-2
        animate-fadeIn
        group
         ease-in-out
      "
    >
      <Search size={16} />
      <span>{buttonLabels.search}</span>
      <KeyboardShortcut />
    </button>
  );
};

export default SearchButton;
