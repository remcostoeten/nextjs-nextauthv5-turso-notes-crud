import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { actions } from "./search-config";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        toggleModal();
      }
      if (event.shiftKey && event.key === "S") {
        event.preventDefault();
        toggleModal();
      }
    },
    [toggleModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-section-lighter text-xs hover:bg-bg-modal max-h-search h-search hover:cursor-pointer text-placeholder border-outline hover:border-regular transition-colors duration-300 hidden lg:flex items-center justify-center w-72 gap-2 rounded-md p-2 absolute left-1/2 -translate-x-1/2 cursor-text focus:outline-offset-2 animate-fadeIn group ease-in-out"
      >
        <Search size={16} />
        <span>Search your base...</span>
        <span className="cursor-text absolute bg-[#262626] border border-border-regular text-text-regular-nav rounded text-[12px] leading-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[0.15s] box-border px-1.5 py-0.5 border-solid right-2.5">
          ⌘K
        </span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="w-full max-w-lg bg-bg-modal rounded-lg shadow-lg overflow-hidden border border-regular">
            <div className="p-4 border-b border-regular">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search your base..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-text-title placeholder-text-muted border border-regular rounded-md focus:outline-none focus:border-regular text-lg"
                />
              </div>
            </div>
            <nav className="p-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-base py-2 px-3 hover:bg-bg-modal-hover rounded-md border border-outline mb-1 last:mb-0"
                >
                  <span className="mr-3 text-xl">{action.icon}</span>
                  <span className="flex-grow text-text-title">
                    {action.label}
                  </span>
                  <div className="flex items-center">
                    <kbd className="bg-button-default text-text-muted rounded px-1.5 py-0.5 text-xs mr-1 border border-separator">
                      ⌥
                    </kbd>
                    <kbd className="bg-button-default text-text-muted rounded px-1.5 py-0.5 text-xs border border-separator">
                      {action.shortcut}
                    </kbd>
                  </div>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
