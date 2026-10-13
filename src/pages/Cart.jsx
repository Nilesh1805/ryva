import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../config/brand';
import { buildWhatsAppOrderMessage } from '../components/WhatsAppButton';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    shippingFee,
    isFreeShipping,
    progressToFreeShipping,
    amountToFreeShipping,
  } = useCart();

  const navigate = useNavigate();

  // Demo Promo Code state
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'RYVA10', discountPercent: 10 }
  const [promoMessage, setPromoMessage] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'RYVA10') {
      setAppliedPromo({ code: 'RYVA10', discountPercent: 10 });
      setPromoMessage({ type: 'success', text: '10% Exclusive Atelier discount applied!' });
      setPromoInput('');
    } else if (cleanCode === 'RYVAVIP') {
      setAppliedPromo({ code: 'RYVAVIP', discountPercent: 15 });
      setPromoMessage({ type: 'success', text: '15% VIP Patron discount applied!' });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "RYVA10" for demo discount.' });
    }
  };

  const discountAmount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleWhatsAppOrder = () => {
    const url = buildWhatsAppOrderMessage(cartItems, finalTotal);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(brandConfig.instagram.url, '_blank');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="p-5 bg-white border mx-auto" style={{ maxWidth: '580px' }}>
          <ShoppingBag size={56} className="text-muted opacity-50 mb-3" />
          <h2 className="ryva-serif mb-2">Your Shopping Bag is Empty</h2>
          <p className="text-muted small mb-4">
            You haven't selected any garments or footwear yet. Explore the latest drops from the RYVA SS25 Atelier edit.
          </p>
          <Link to="/shop" className="btn-ryva-dark">
            <span>EXPLORE COLLECTION</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ryva-cart-page py-4 py-lg-5">
      <div className="container">
        
        {/* Page Header */}
        <div className="mb-4 pb-2 border-bottom">
          <span className="ryva-subheading mb-1 d-block">REVIEW YOUR SELECTION</span>
          <h1 className="ryva-serif m-0">SHOPPING BAG ({cartItems.length} ITEMS)</h1>
        </div>

        {/* Free Shipping Progress Notification */}
        <div className="ryva-shipping-tracker mb-4 p-3 bg-white border">
          <div className="d-flex align-items-center justify-content-between mb-2">
            {isFreeShipping ? (
              <span className="fw-semibold text-success d-flex align-items-center gap-1">
                <Sparkles size={16} /> You qualify for Complimentary Express Delivery!
              </span>
            ) : (
              <span className="small">
                Add <strong>{brandConfig.currency.symbol}{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Complimentary Express Shipping
              </span>
            )}
            <span className="small text-muted fw-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="ryva-progress-bar-wrap">
            <div className="ryva-progress-bar-fill" style={{ width: `${progressToFreeShipping}%` }} />
          </div>
        </div>

        <div className="row g-4 g-lg-5">
          
          {/* Left Column: Cart Items List */}
          <div className="col-12 col-lg-8">
            <div className="bg-white border p-3 p-md-4">
              
              <div className="table-responsive">
                <table className="table align-middle m-0">
                  <thead className="table-light small text-uppercase" style={{ letterSpacing: '0.1em' }}>
                    <tr>
                      <th scope="col" style={{ minWidth: '220px' }}>Item</th>
                      <th scope="col">Price</th>
                      <th scope="col" className="text-center">Quantity</th>
                      <th scope="col" className="text-end">Subtotal</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.itemKey}>
                        {/* Product Detail */}
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              style={{ width: '70px', height: '90px', flexShrink: 0, backgroundColor: '#f5f0e8' }}
                              className="overflow-hidden border"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div>
                              <Link
                                to={`/product/${item.slug}`}
                                className="fw-semibold text-dark d-block text-decoration-none"
                              >
                                {item.name}
                              </Link>
                              <span className="small text-muted d-block" style={{ fontSize: '0.78rem' }}>
                                Size: <strong>{item.selectedSize}</strong>
                                {item.selectedColor && (
                                  <span> • Color: <strong>{item.selectedColor.name}</strong></span>
                                )}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Unit Price */}
                        <td className="small fw-semibold">
                          {brandConfig.currency.symbol}{item.price.toLocaleString('en-IN')}
                        </td>

                        {/* Quantity Controls */}
                        <td className="text-center">
                          <div className="d-inline-flex align-items-center border border-secondary border-opacity-25 bg-white">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-dark px-2 py-1"
                              onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 small fw-bold">{item.quantity}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-dark px-2 py-1"
                              onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className="text-end fw-bold">
                          {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                        </td>

                        {/* Remove Action */}
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-link text-muted p-0"
                            onClick={() => removeFromCart(item.itemKey)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Actions */}
              <div className="d-flex justify-content-between align-items-center pt-4 border-top mt-3 flex-wrap gap-2">
                <Link to="/shop" className="btn-ryva-link">
                  <ArrowLeft size={14} />
                  <span>Continue Shopping</span>
                </Link>

                <button
                  type="button"
                  className="btn btn-link text-muted small p-0 text-decoration-underline"
                  onClick={clearCart}
                >
                  Clear Bag
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="col-12 col-lg-4">
            <div className="bg-white border p-4 position-sticky" style={{ top: '90px' }}>
              <h5 className="ryva-serif mb-3 pb-2 border-bottom">Order Summary</h5>

              {/* Line items */}
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold text-dark">
                  {brandConfig.currency.symbol}{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {appliedPromo && (
                <div className="d-flex justify-content-between mb-2 small text-success">
                  <span>Promo ({appliedPromo.code} -{appliedPromo.discountPercent}%)</span>
                  <span>-{brandConfig.currency.symbol}{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-muted">Estimated Shipping</span>
                <span className="fw-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-success">Complimentary</span>
                  ) : (
                    `${brandConfig.currency.symbol}${shippingFee.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="mb-3 pt-3 border-top">
                <label className="small text-muted d-block mb-1">Have an Atelier Promo Code?</label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="ryva-input py-1 px-2 small"
                    placeholder="e.g. RYVA10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-dark rounded-0 px-3 small fw-semibold"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <span className={`d-block small mt-1 ${promoMessage.type === 'success' ? 'text-success' : 'text-danger'}`}>
                    {promoMessage.text}
                  </span>
                )}
              </form>

              {/* Total Row */}
              <div className="d-flex justify-content-between align-items-baseline pt-3 border-top mb-4">
                <span className="fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>Total</span>
                <span className="fs-4 fw-bold text-dark">
                  {brandConfig.currency.symbol}{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column gap-2 mb-3">
                <button
                  type="button"
                  className="btn-ryva-dark w-100 py-3"
                  onClick={() => navigate('/checkout')}
                  id="cart-proceed-checkout"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={15} />
                </button>

                {/* WhatsApp Order Option */}
                <button
                  type="button"
                  className="btn btn-outline-success rounded-0 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle size={16} />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-2 text-muted small" style={{ fontSize: '0.72rem' }}>
                <ShieldCheck size={14} className="text-success" />
                <span>Encrypted Demo Checkout • Demo Mode</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
