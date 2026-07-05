"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => undefined;

export function useBrowserSnapshot<T>(getSnapshot: () => T, getServerSnapshot: () => T): T {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}
