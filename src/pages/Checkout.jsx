import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../config/brand';

const Checkout = () => {
  const { cartItems, cartSubtotal, shippingFee, clearCart } = useCart();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    shippingMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Validate form
  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number required.';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.state.trim()) errs.state = 'State is required.';
    if (!formData.postalCode.trim() || formData.postalCode.length < 6) {
      errs.postalCode = 'Valid 6-digit PIN code required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const shippingCost = formData.shippingMethod === 'express'
    ? brandConfig.shipping.expressCost
    : (cartSubtotal >= brandConfig.shipping.freeShippingThreshold ? 0 : brandConfig.shipping.standardCost);

  const grandTotal = cartSubtotal + shippingCost;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury order verification
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `RYVA-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const orderSummary = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customer: { ...formData },
        items: [...cartItems],
        subtotal: cartSubtotal,
        shippingFee: shippingCost,
        total: grandTotal,
      };

      setConfirmedOrder(orderSummary);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#B59A70', '#151515', '#F5F0E8'],
        });
      } catch (e) {
        // Safe fallback
      }

      // Clear the cart
      clearCart();
    }, 900);
  };

  // If cart is empty and no confirmed order yet, redirect to cart
  if (cartItems.length === 0 && !confirmedOrder) {
    return (
      <div className="container py-5 text-center my-5">
        <h3 className="ryva-serif mb-3">Your shopping bag is empty</h3>
        <p className="text-muted mb-4">Please add items to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="btn-ryva-dark">
          <span>Explore Atelier</span>
        </Link>
      </div>
    );
  }

  // --- Order Confirmation Screen ---
  if (confirmedOrder) {
    return (
      <div className="ryva-confirmation-screen py-5">
        <div className="container">
          <div className="bg-white border p-4 p-md-5 mx-auto" style={{ maxWidth: '780px' }}>
            
            {/* Header */}
            <div className="text-center mb-5 pb-4 border-bottom">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 bg-light"
                style={{ width: '64px', height: '64px', border: '1px solid #B59A70' }}
              >
                <CheckCircle2 size={32} className="text-success" />
              </div>

              <span className="ryva-subheading mb-1 d-block">ORDER CONFIRMATION (DEMO)</span>
              <h2 className="ryva-serif mb-2">THANK YOU FOR YOUR PATRONAGE</h2>
              <p className="text-muted small mb-3">
                Order reference number: <strong className="text-dark">{confirmedOrder.orderId}</strong>
              </p>

              {/* Honest Demo Disclaimer Alert */}
              <div className="alert alert-warning border-0 rounded-0 text-start small mb-0">
                <strong>Demonstration Mode Notice:</strong> This website is an e-commerce prototype for RYVA COLLECTION. No payment has been processed and no automated physical shipment has been scheduled. For inquiries about actual collection drops, please message <strong>@ryvacollection01</strong> on Instagram.
              </div>
            </div>

            {/* Customer & Shipping Summary */}
            <div className="row g-4 mb-4 pb-4 border-bottom">
              <div className="col-12 col-md-6">
                <span className="ryva-subheading mb-1 d-block">CLIENT DETAILS</span>
                <span className="fw-bold d-block">{confirmedOrder.customer.firstName} {confirmedOrder.customer.lastName}</span>
                <span className="small text-muted d-block">{confirmedOrder.customer.email}</span>
                <span className="small text-muted d-block">{confirmedOrder.customer.phone}</span>
              </div>
              <div className="col-12 col-md-6">
                <span className="ryva-subheading mb-1 d-block">DELIVERY ADDRESS</span>
                <span className="small text-muted d-block">{confirmedOrder.customer.address}</span>
                {confirmedOrder.customer.apartment && (
                  <span className="small text-muted d-block">{confirmedOrder.customer.apartment}</span>
                )}
                <span className="small text-muted d-block">
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.postalCode}
                </span>
                <span className="badge bg-secondary rounded-0 mt-2 text-uppercase">
                  Method: {confirmedOrder.customer.shippingMethod === 'express' ? 'Express Delivery' : 'Standard Delivery'}
                </span>
              </div>
            </div>

            {/* Ordered Items Summary */}
            <div className="mb-4 pb-4 border-bottom">
              <span className="ryva-subheading mb-2 d-block">ORDERED ITEMS ({confirmedOrder.items.length})</span>
              <div className="d-flex flex-column gap-3">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '65px', objectFit: 'cover' }}
                        className="border"
                      />
                      <div>
                        <span className="fw-semibold small d-block">{item.name}</span>
                        <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>
                          Size: {item.selectedSize} {item.selectedColor ? `• ${item.selectedColor.name}` : ''} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="small fw-bold">
                      {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Row */}
            <div className="d-flex justify-content-between align-items-baseline mb-4">
              <span className="fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>Amount Paid (Demo)</span>
              <span className="fs-4 fw-bold text-dark">
                {brandConfig.currency.symbol}{confirmedOrder.total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Actions */}
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <Link to="/shop" className="btn-ryva-dark px-4 py-3">
                <span>RETURN TO SHOPPING</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ryva-outline px-4 py-3"
              >
                <span>VISIT @RYVACOLLECTION01</span>
                <ExternalLink size={15} />
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- Normal Checkout Form Screen ---
  return (
    <div className="ryva-checkout-page py-4 py-lg-5">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5">
          <span className="ryva-subheading">ATELIER DISPATCH</span>
          <h1 className="ryva-serif">SECURE CHECKOUT</h1>
          <div className="ryva-divider-gold"></div>
          <p className="small text-muted mx-auto" style={{ maxWidth: '480px' }}>
            Enter your shipping coordinates and preferred dispatch method below.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="row g-4 g-lg-5">
            
            {/* Left Column: Client Details, Address, Shipping & Payment */}
            <div className="col-12 col-lg-7">
              
              {/* Step 1: Client Coordinates */}
              <div className="bg-white border p-4 mb-4">
                <span className="ryva-subheading mb-3 d-block">1. CLIENT INFORMATION</span>
                
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label className="small fw-semibold text-muted mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className={`ryva-input ${errors.firstName ? 'border-danger' : ''}`}
                      placeholder="e.g. Aryan"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <span className="small text-danger">{errors.firstName}</span>}
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="small fw-semibold text-muted mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className={`ryva-input ${errors.lastName ? 'border-danger' : ''}`}
                      placeholder="e.g. Sharma"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <span className="small text-danger">{errors.lastName}</span>}
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="small fw-semibold text-muted mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className={`ryva-input ${errors.email ? 'border-danger' : ''}`}
                      placeholder="aryan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="small text-danger">{errors.email}</span>}
                  </div>

                  <div className="col-12 col-sm-6">
                    <label className="small fw-semibold text-muted mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`ryva-input ${errors.phone ? 'border-danger' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <span className="small text-danger">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Coordinates */}
              <div className="bg-white border p-4 mb-4">
                <span className="ryva-subheading mb-3 d-block">2. SHIPPING ADDRESS</span>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="small fw-semibold text-muted mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      className={`ryva-input ${errors.address ? 'border-danger' : ''}`}
                      placeholder="Flat, Wing, House No., Building, Street"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    {errors.address && <span className="small text-danger">{errors.address}</span>}
                  </div>

                  <div className="col-12">
                    <label className="small fw-semibold text-muted mb-1">Apartment, Suite, Landmark (Optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      className="ryva-input"
                      placeholder="Apartment or landmark"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="small fw-semibold text-muted mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      className={`ryva-input ${errors.city ? 'border-danger' : ''}`}
                      placeholder="Mumbai, Delhi, etc."
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <span className="small text-danger">{errors.city}</span>}
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="small fw-semibold text-muted mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      className={`ryva-input ${errors.state ? 'border-danger' : ''}`}
                      placeholder="Maharashtra, etc."
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && <span className="small text-danger">{errors.state}</span>}
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="small fw-semibold text-muted mb-1">PIN / Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      className={`ryva-input ${errors.postalCode ? 'border-danger' : ''}`}
                      placeholder="6-digit PIN"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    {errors.postalCode && <span className="small text-danger">{errors.postalCode}</span>}
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="bg-white border p-4 mb-4">
                <span className="ryva-subheading mb-3 d-block">3. DELIVERY DISPATCH METHOD</span>

                <div className="d-flex flex-column gap-2">
                  <label className={`d-flex align-items-center justify-content-between p-3 border cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-dark bg-light' : ''}`}>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <span className="small fw-bold d-block">Standard Atelier Shipping ({brandConfig.shipping.estimatedDaysStandard})</span>
                        <span className="small text-muted">Reliable doorstep tracked dispatch</span>
                      </div>
                    </div>
                    <span className="small fw-bold">
                      {cartSubtotal >= brandConfig.shipping.freeShippingThreshold ? 'FREE' : `₹${brandConfig.shipping.standardCost}`}
                    </span>
                  </label>

                  <label className={`d-flex align-items-center justify-content-between p-3 border cursor-pointer ${formData.shippingMethod === 'express' ? 'border-dark bg-light' : ''}`}>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className="form-check-input mt-0"
                      />
                      <div>
                        <span className="small fw-bold d-block">Priority Express Dispatch ({brandConfig.shipping.estimatedDaysExpress})</span>
                        <span className="small text-muted">Expedited air transit with dedicated handling</span>
                      </div>
                    </div>
                    <span className="small fw-bold">₹{brandConfig.shipping.expressCost}</span>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Simulation */}
              <div className="bg-white border p-4 mb-4">
                <span className="ryva-subheading mb-2 d-block">4. PAYMENT METHOD (DEMONSTRATION)</span>
                <p className="text-muted small mb-3">
                  This checkout is in test demonstration mode. No real money or card details will be charged.
                </p>

                <div className="d-flex flex-column gap-2 mb-3">
                  <label className={`d-flex align-items-center gap-3 p-3 border cursor-pointer ${formData.paymentMethod === 'upi' ? 'border-dark bg-light' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="form-check-input mt-0"
                    />
                    <div>
                      <span className="small fw-bold d-block">Instant UPI (GPay, PhonePe, Paytm Demo)</span>
                      <span className="small text-muted">Simulate instantaneous UPI authorization</span>
                    </div>
                  </label>

                  <label className={`d-flex align-items-center gap-3 p-3 border cursor-pointer ${formData.paymentMethod === 'card' ? 'border-dark bg-light' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="form-check-input mt-0"
                    />
                    <div>
                      <span className="small fw-bold d-block">Credit / Debit Card (Demo Gate)</span>
                      <span className="small text-muted">Visa, Mastercard, RuPay, Amex demo</span>
                    </div>
                  </label>

                  <label className={`d-flex align-items-center gap-3 p-3 border cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-dark bg-light' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="form-check-input mt-0"
                    />
                    <div>
                      <span className="small fw-bold d-block">Cash on Delivery (Demo COD)</span>
                      <span className="small text-muted">Pay upon doorstep receipt</span>
                    </div>
                  </label>
                </div>

                <div className="p-3 bg-light border small text-muted d-flex align-items-center gap-2">
                  <ShieldCheck size={18} className="text-success flex-shrink-0" />
                  <span>256-bit TLS encrypted client environment. Demo mode active.</span>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="col-12 col-lg-5">
              <div className="bg-white border p-4 position-sticky" style={{ top: '90px' }}>
                <div className="d-flex justify-content-between align-items-center pb-2 border-bottom mb-3">
                  <h5 className="ryva-serif m-0">Order Summary</h5>
                  <Link to="/cart" className="small text-muted text-decoration-underline">
                    Edit Bag
                  </Link>
                </div>

                {/* Items preview list */}
                <div className="d-flex flex-column gap-3 mb-4 pb-3 border-bottom overflow-auto" style={{ maxHeight: '280px' }}>
                  {cartItems.map((item) => (
                    <div key={item.itemKey} className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '45px', height: '60px', objectFit: 'cover' }}
                          className="border flex-shrink-0"
                        />
                        <div>
                          <span className="small fw-semibold text-dark d-block text-truncate" style={{ maxWidth: '170px' }}>
                            {item.name}
                          </span>
                          <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>
                            {item.selectedSize} {item.selectedColor ? `• ${item.selectedColor.name}` : ''} • Qty {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="small fw-bold">
                        {brandConfig.currency.symbol}{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold">
                    {brandConfig.currency.symbol}{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3 small">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-semibold">
                    {shippingCost === 0 ? <span className="text-success">Complimentary</span> : `₹${shippingCost}`}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-baseline pt-3 border-top mb-4">
                  <span className="fw-bold text-uppercase" style={{ letterSpacing: '0.1em' }}>Grand Total</span>
                  <span className="fs-3 fw-bold text-dark">
                    {brandConfig.currency.symbol}{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-ryva-dark w-100 py-3 mb-3"
                  disabled={isSubmitting}
                  id="checkout-place-order"
                >
                  <span>{isSubmitting ? 'PROCESSING DEMO ORDER...' : 'PLACE ORDER (DEMO)'}</span>
                  <ArrowRight size={15} />
                </button>

                <p className="text-muted small text-center m-0" style={{ fontSize: '0.72rem' }}>
                  By clicking Place Order, you confirm acceptance of RYVA COLLECTION terms and acknowledge this checkout is for demonstration purposes.
                </p>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Checkout;
