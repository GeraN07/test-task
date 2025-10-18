import { useEffect } from "react";
import "./popup.css";

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Popup = ({ onClose, children }: PopupProps) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 4000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-block">
        <button className="popup-block__close-button" onClick={onClose}>
          <img
            className="popup-block__close-button-icon"
            src="../close-icon.svg"
          />
        </button>
        <img className="popup-block__icon" src="../popup-Icon.svg" />
        <p className="popup-block__text">{children}</p>
      </div>
    </div>
  );
};

export default Popup;
