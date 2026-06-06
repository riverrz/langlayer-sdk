import { useSyncExternalStore } from "react";
import type { CreateLangLayerReturnType } from "..";

export const useMessages = (ll: CreateLangLayerReturnType) => {
  const messages = useSyncExternalStore(
    ll.listenToEvent("translationChange"),
    ll.getSnapshotOfEvent("translationChange"),
  );

  return messages;
};
