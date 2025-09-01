import { useEffect } from "react";

export function Notification({ message, onClose }: { message: string; onClose: () => void; }) {
    // Automatically close the notification after 5 seconds
    useEffect(() => {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <div className="notification error">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
    );
}