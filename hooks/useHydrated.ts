"use client";

import { useSyncExternalStore } from "react";
import { useReadmeStore } from "@/store/readmeStore";

function subscribeToHydration(onStoreChange: () => void) {
  const unsubscribe = useReadmeStore.persist.onFinishHydration(onStoreChange);
  void useReadmeStore.persist.rehydrate();
  return unsubscribe;
}

export function useHydrated(): boolean {
  return useSyncExternalStore(subscribeToHydration, useReadmeStore.persist.hasHydrated, () => false);
}