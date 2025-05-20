import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode; // Add this line to accept children
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">
          Close
        </button>
        {children} {/* Render children here */}
      </div>
    </div>
  );
};

export default Modal;
