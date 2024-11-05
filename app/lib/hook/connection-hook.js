import React, { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Init status
    setIsOnline(navigator.onLine);

    // handle state
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // listener
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // remove on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
