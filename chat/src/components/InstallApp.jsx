import { useEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function InstallApp() {
  const deferredPromptRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      // setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPromptRef.current) return;

    deferredPromptRef.current.prompt();
    await deferredPromptRef.current.userChoice;

    deferredPromptRef.current = null;
    // setShow(false);
  };

  // if (!show) return null;

  return (
    <button
      onClick={installApp}
      className="px-6 py-3 bg-white/10 border border-white/20 rounded-full
      text-sm font-medium hover:bg-white/20 transition-all duration-200
      flex items-center gap-2"
    >
      <FiDownload className="w-4 h-4" />
      Install App
    </button>
  );
}
