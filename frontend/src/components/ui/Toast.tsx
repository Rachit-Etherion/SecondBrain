import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); // auto close after 2.5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
      <div className="bg-purple-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
        ✅ {message}
      </div>
    </div>
  );
}
