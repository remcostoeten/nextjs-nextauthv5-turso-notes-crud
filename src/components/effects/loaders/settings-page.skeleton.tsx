import React from "react";
import { Skeleton } from "./Skeleton";

export default function SettingsPageSkeleton() {
  return (
    <>
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 ml-[calc(var(--sidebar-width)+var(--sidebar-sub-width))]">
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto border-regular p-8">
            <h1 className="mb-8">
              <Skeleton className="w-[176px] max-w-full" />
            </h1>
            <div>
              <div className="inline-flex h-10 items-center justify-center p-1">
                <div className="inline-flex items-center justify-center px-3 py-1.5 border">
                  <Skeleton className="w-[77px] max-w-full" />
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 border">
                  <Skeleton className="w-[77px] max-w-full" />
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 border">
                  <Skeleton className="w-[88px] max-w-full" />
                </div>
              </div>
              <div className="mt-2 space-y-4">
                <div className="border-outline shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="leading-none tracking-tight">
                      <Skeleton className="w-[77px] max-w-full" />
                    </h3>
                    <p>
                      <Skeleton className="w-[429px] max-w-full" />
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="relative flex h-10 w-10 shrink-0">
                        <span className="flex h-full w-full items-center justify-center flex-row gap-0 bg-border-default">
                          <Skeleton className="w-[14px] max-w-full" />
                        </span>
                      </span>
                      <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2">
                        <Skeleton className="w-[132px] max-w-full" />
                      </div>
                    </div>
                    <form className="space-y-4">
                      <div>
                        <label className="leading-none">
                          <Skeleton className="w-[44px] max-w-full" />
                        </label>
                        <div className="relative">
                          <div className="flex h-10 w-full border border-outline px-3 py-2 file:border-0 !focus:border-transparent"></div>
                        </div>
                      </div>
                      <div>
                        <label className="leading-none">
                          <Skeleton className="w-[55px] max-w-full" />
                        </label>
                        <div className="relative">
                          <div className="flex h-10 w-full border border-outline px-3 py-2 file:border-0 !focus:border-transparent"></div>
                        </div>
                      </div>
                      <div>
                        <label className="leading-none">
                          <Skeleton className="w-[88px] max-w-full" />
                        </label>
                        <div className="relative">
                          <div className="flex h-10 w-full border border-outline px-3 py-2 file:border-0 !focus:border-transparent"></div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-2"></div>
              <div className="mt-2"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
