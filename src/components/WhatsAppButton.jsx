import React, { useState } from 'react';
import { MessageCircle, ExternalLink, X } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { brandConfig } from '../config/brand';

/**
 * Builds a clean WhatsApp Click-to-Chat URL with encoded order details.
 */
export const buildWhatsAppOrderMessage = (items, subtotal) => {
  const phone = brandConfig.whatsapp.phoneNumber?.replace(/\D/g, '');
  if (!phone) return null;

  let text = `Hello RYVA COLLECTION!\n\nI would like to enquire about ordering the following pieces:\n`;

  items.forEach((item, index) => {
    const size = item.selectedSize ? ` (Size: ${item.selectedSize})` : '';
    const color = item.selectedColor ? ` (Color: ${item.selectedColor.name || item.selectedColor})` : '';
    text += `${index + 1}. ${item.name}${size}${color} x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
  });

  text += `\nEstimated Subtotal: ₹${subtotal.toLocaleString('en-IN')}`;
  text += `\nPlease let me know availability and payment details. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

/**
 * Builds a clean WhatsApp enquiry URL for a single product.
 */
export const buildWhatsAppProductMessage = (product, selectedSize, selectedColor) => {
  const phone = brandConfig.whatsapp.phoneNumber?.replace(/\D/g, '');
  if (!phone) return null;

  let text = `Hello RYVA COLLECTION!\n\nI am interested in:\n• Product: ${product.name}\n• Price: ₹${product.price.toLocaleString('en-IN')}`;
  if (selectedSize) text += `\n• Size: ${selectedSize}`;
  if (selectedColor) text += `\n• Colour: ${selectedColor.name || selectedColor}`;
  text += `\n\nIs this available in stock? Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

const WhatsAppButton = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { whatsapp, instagram } = brandConfig;
  const hasValidPhone = Boolean(whatsapp.phoneNumber && whatsapp.phoneNumber.trim().length >= 10);

  const handleClick = (e) => {
    if (!whatsapp.enabled) {
      window.open(instagram.url, '_blank');
      return;
    }

    if (whatsapp.isPlaceholder) {
      // Show polite modal showing what will be sent and direct connection options
      setShowDemoModal(true);
    } else if (hasValidPhone) {
      const url = `https://wa.me/${whatsapp.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsapp.welcomeMessage)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(instagram.url, '_blank');
    }
  };

  return (
    <>
      <aside className="ryva-whatsapp-float" aria-label="Customer Support">
        <span className="ryva-whatsapp-tooltip d-none d-md-block">
          {hasValidPhone ? "Chat with RYVA Concierge" : "Connect with @ryvacollection01"}
        </span>

        <button
          type="button"
          className="ryva-whatsapp-bubble"
          onClick={handleClick}
          aria-label="Contact RYVA on WhatsApp or Instagram"
        >
          <MessageCircle size={28} />
        </button>
      </aside>

      {/* Demo Integration Explanation Modal */}
      {showDemoModal && (
        <div className="ryva-modal-backdrop open" onClick={() => setShowDemoModal(false)}>
          <div
            className="ryva-modal-content p-4"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{ width: '34px', height: '34px', backgroundColor: '#25D366' }}
                >
                  <MessageCircle size={18} />
                </div>
                <h6 className="m-0 fw-bold">RYVA Concierge Chat</h6>
              </div>
              <button
                type="button"
                className="btn btn-link text-dark p-0"
                onClick={() => setShowDemoModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <p className="small text-muted mb-3">
              This boutique preview features a demo WhatsApp integration configured with placeholder line <code>+{whatsapp.phoneNumber}</code>.
            </p>

            <div className="bg-light p-3 border rounded-0 small mb-4">
              <span className="d-block fw-semibold mb-1">Pre-configured Welcome Note:</span>
              <p className="text-secondary fst-italic m-0">"{whatsapp.welcomeMessage}"</p>
            </div>

            <div className="d-flex flex-column gap-2">
              <a
                href={`https://wa.me/${whatsapp.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsapp.welcomeMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success rounded-0 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold"
                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
              >
                <MessageCircle size={16} />
                <span>Test Demo WhatsApp Link</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark rounded-0 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold"
              >
                <InstagramIcon size={16} />
                <span>Message on Instagram {instagram.handle}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
