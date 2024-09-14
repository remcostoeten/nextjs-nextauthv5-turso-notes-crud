"use client";

import Flex from "@/components/atoms/Flex";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { actions } from "./search-config";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const toggleModal = useCallback(() => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleAction = useCallback(
    (action: string | (() => Promise<void>)) => {
      if (typeof action === "string") {
        router.push(action);
      } else {
        action();
      }
      toggleModal();
    },
    [router, toggleModal],
  );

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
      if (event.key === "Escape") {
        event.preventDefault();
        toggleModal();
      }
      if (isOpen) {
        const action = actions.find(
          (a) => a.shortcut.toLowerCase() === event.key.toLowerCase(),
        );
        if (action) {
          event.preventDefault();
          handleAction(action.action);
        }
      }
    },
    [isOpen, toggleModal, handleAction],
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
        className="bg-section-lighter text-xs hover:bg-bg-modal max-h-search h-search hover:cursor-pointer text-placeholder border-outline hover:border-regular transition-all duration-300 hidden lg:flex items-center justify-center w-72 gap-2 rounded-md p-2 absolute left-1/2 -translate-x-1/2 cursor-text focus:outline-offset-2 animate-in fade-in zoom-in duration-300 ease-in-out"
      >
        <Search size={16} />
        <span>Search your base...</span>
        <span className="cursor-text absolute bg-[#262626] border border-border-outline text-text-regular-nav rounded text-[12px] leading-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[0.15s] box-border px-1.5 py-0.5 border-solid right-2.5">
          ⌘K
        </span>
      </button>
      {(isOpen || isClosing) && (
        <div
          className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300 ease-in-out origin-center ${
            isClosing ? "animate-out fade-out duration-300 ease-in-out" : ""
          }`}
        >
          <div
            className={`scale-in origin-center w-full max-w-xl h-[450px] grid place-items-center border-outline rounded-xl w-full bg-bg-modal rounded-lg shadow-lg overflow-hidden animate-in zoom-in-95 duration-300 ease-out ${
              isClosing
                ? "animate-out zoom-out-95 duration-300 ease-in-out"
                : ""
            }`}
          >
            <div className="px-4 border-b border-border-outline w-full">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search your base..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-text-title placeholder-text-muted  rounded-lg focus:outline-none text-lg"
                />
                <div className="line" />
              </div>
            </div>
            <nav className="px-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-between text-base font-normal text-placeholder py-2 px-3 hover:bg-bg-modal-hover rounded-md"
                  onClick={() => handleAction(action.action)}
                >
                  <Flex align="center" gap="2">
                    <span className="mr-3 text-xl ">{action.icon}</span>
                    <span className="flex text-subtitle">{action.label}</span>
                  </Flex>
                  <div className="flex flex-grow justify-end">
                    <kbd className="bg-button-default text-text-muted rounded px-1.5 py-0.5 text-xs mr-1">
                      ⌥
                    </kbd>
                    <kbd className="bg-button-default text-text-muted rounded px-1.5 py-0.5 text-xs">
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
