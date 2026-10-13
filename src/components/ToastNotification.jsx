import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

const ToastNotification = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg p-3 text-white d-flex align-items-center gap-3"
      style={{
        zIndex: 1100,
        backgroundColor: '#151515',
        border: '1px solid #B59A70',
        minWidth: '320px',
        maxWidth: '90vw',
      }}
      role="alert"
    >
      <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
      <span className="small fw-semibold flex-grow-1" style={{ letterSpacing: '0.04em' }}>
        {toastMessage}
      </span>
      <button
        type="button"
        className="btn btn-link text-white-50 p-0"
        onClick={() => setToastMessage(null)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ToastNotification;
