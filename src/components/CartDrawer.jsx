import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../config/brand';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCartDrawer,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    isFreeShipping,
    progressToFreeShipping,
    amountToFreeShipping,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleCartPageClick = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`ryva-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className={`ryva-cart-drawer ${isCartOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping Bag">
        
        {/* Header */}
        <div className="ryva-drawer-header">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag size={20} />
            <h5 className="m-0 text-uppercase fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '0.15em' }}>
              Shopping Bag ({cartCount})
            </h5>
          </div>
          <button
            type="button"
            className="btn btn-link p-0 text-dark"
            onClick={closeCartDrawer}
            aria-label="Close bag drawer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-4 pt-3">
          <div className="ryva-shipping-tracker">
            <div className="d-flex align-items-center justify-content-between">
              {isFreeShipping ? (
                <span className="fw-semibold text-success d-flex align-items-center gap-1">
                  <Sparkles size={14} /> You've unlocked Complimentary Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong>{brandConfig.currency.symbol}{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping
                </span>
              )}
            </div>
            <div className="ryva-progress-bar-wrap">
              <div
                className="ryva-progress-bar-fill"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        </div>

        {/* Drawer Body: Items list or empty state */}
        <div className="ryva-drawer-body">
          {cartItems.length === 0 ? (
            <div className="text-center py-5 my-4">
              <ShoppingBag size={48} className="text-muted opacity-50 mb-3" />
              <h5 className="ryva-serif mb-2">Your Bag is Empty</h5>
              <p className="text-muted small mb-4">
                Explore the latest pieces from the RYVA SS25 Atelier edit.
              </p>
              <button
                type="button"
                className="btn-ryva-dark w-100 py-3"
                onClick={() => {
                  closeCartDrawer();
                  navigate('/shop');
                }}
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="d-flex gap-3 pb-3 border-bottom">
                  {/* Thumbnail */}
                  <div
                    style={{ width: '80px', height: '100px', flexShrink: 0, backgroundColor: '#f0ece1' }}
                    className="overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow-1 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                      <Link
                        to={`/product/${item.slug}`}
                        className="small fw-semibold text-dark text-truncate d-block me-2"
                        style={{ maxWidth: '190px' }}
                        onClick={closeCartDrawer}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-muted"
                        onClick={() => removeFromCart(item.itemKey)}
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="small text-muted my-1" style={{ fontSize: '0.78rem' }}>
                      Size: <strong className="text-dark">{item.selectedSize}</strong>
                      {item.selectedColor && (
                        <span> • Colour: <strong className="text-dark">{item.selectedColor.name}</strong></span>
                      )}
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      {/* Quantity Selector */}
                      <div className="d-inline-flex align-items-center border border-secondary border-opacity-25">
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-dark px-2 py-0"
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2 small fw-bold">{item.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-dark px-2 py-0"
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span className="fw-bold small">
                        {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (Subtotal & Actions) */}
        {cartItems.length > 0 && (
          <div className="ryva-drawer-footer">
            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <span className="text-uppercase small fw-bold" style={{ letterSpacing: '0.1em' }}>
                Subtotal
              </span>
              <span className="fs-5 fw-bold text-dark">
                {brandConfig.currency.symbol}{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            
            <p className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
              Shipping and taxes calculated during checkout.
            </p>

            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                className="btn-ryva-dark w-100 py-3"
                onClick={handleCheckoutClick}
              >
                <span>CHECKOUT NOW</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="btn-ryva-outline w-100 py-2 small"
                onClick={handleCartPageClick}
              >
                <span>VIEW FULL BAG</span>
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2 mt-3 text-muted" style={{ fontSize: '0.72rem' }}>
              <ShieldCheck size={14} className="text-success" />
              <span>Secure Demo Shopping Experience</span>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
