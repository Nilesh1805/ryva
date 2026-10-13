import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import { brandConfig } from '../config/brand';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify an enquiry subject.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
    setErrors({});
  };

  const faqs = [
    {
      q: "How can I purchase RYVA COLLECTION pieces?",
      a: "You can browse our full online catalogue on this website or reach out directly via Instagram Direct Message (@ryvacollection01) or our WhatsApp concierge to reserve specific pieces from current atelier drops.",
    },
    {
      q: "What is your standard delivery timeframe in India?",
      a: "Standard tracked shipping takes approximately 3 to 5 business days across metropolitan areas in India. Priority express shipping delivers within 1 to 2 business days. Complimentary express shipping is included on all orders over ₹2,999.",
    },
    {
      q: "What is the policy for returns or size exchanges?",
      a: "We offer complimentary 7-day size exchanges for all unworn garments with original tags attached. Reach out to our concierge team within 7 days of delivery to coordinate your reverse pickup.",
    },
    {
      q: "Can I receive custom sizing or styling assistance?",
      a: "Yes. Our atelier stylists provide personalized fitting recommendations based on your measurements. Message our team on WhatsApp or Instagram with your height and measurements for guidance.",
    },
  ];

  return (
    <div className="ryva-contact-page py-4 py-lg-5">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5 pb-2">
          <span className="ryva-subheading">CLIENT CARE &amp; CONCIERGE</span>
          <h1 className="ryva-serif">CONNECT WITH RYVA</h1>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted mx-auto" style={{ maxWidth: '540px' }}>
            Whether you have sizing questions, need bespoke styling advice, or wish to enquire about current drops, our concierge is here to assist.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="row g-4 mb-5">
          
          {/* Instagram Official Support Card */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="bg-white border p-4 h-100 text-center text-md-start">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 bg-light"
                style={{ width: '48px', height: '48px', border: '1px solid #B59A70' }}
              >
                <InstagramIcon size={22} className="text-dark" />
              </div>
              <h5 className="ryva-serif mb-1">Instagram Direct</h5>
              <p className="small text-muted mb-3">
                Fastest channel for live drop updates &amp; instant direct messaging.
              </p>
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ryva-link small fw-bold"
              >
                <span>{brandConfig.instagram.handle}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* WhatsApp Concierge Card */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="bg-white border p-4 h-100 text-center text-md-start">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: '48px', height: '48px', backgroundColor: '#25D366', color: 'white' }}
              >
                <MessageCircle size={22} />
              </div>
              <h5 className="ryva-serif mb-1">WhatsApp Concierge</h5>
              <p className="small text-muted mb-3">
                Direct styling consultation &amp; bespoke garment reservations.
              </p>
              <a
                href={`https://wa.me/${brandConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(brandConfig.whatsapp.welcomeMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ryva-link small fw-bold text-success"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Studio Showroom Card */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="bg-white border p-4 h-100 text-center text-md-start">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 bg-light"
                style={{ width: '48px', height: '48px', border: '1px solid #B59A70' }}
              >
                <MapPin size={22} className="text-dark" />
              </div>
              <h5 className="ryva-serif mb-1">Showroom Studio</h5>
              <p className="small text-muted mb-2">
                {brandConfig.contact.address.line1}, {brandConfig.contact.address.line2}, {brandConfig.contact.address.city} {brandConfig.contact.address.postalCode}
              </p>
              <span className="small text-secondary d-block fst-italic" style={{ fontSize: '0.72rem' }}>
                *(Configurable showroom placeholder)
              </span>
            </div>
          </div>

          {/* Studio Hours Card */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="bg-white border p-4 h-100 text-center text-md-start">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 bg-light"
                style={{ width: '48px', height: '48px', border: '1px solid #B59A70' }}
              >
                <Clock size={22} className="text-dark" />
              </div>
              <h5 className="ryva-serif mb-1">Business Hours</h5>
              <p className="small text-muted mb-2">
                {brandConfig.contact.businessHours}
              </p>
              <span className="small text-muted d-block">
                Email: <strong>{brandConfig.contact.email}</strong>
              </span>
            </div>
          </div>

        </div>

        {/* Contact Form & Studio Map / Atmosphere */}
        <div className="row g-4 g-lg-5 mb-5">
          
          {/* Left Column: Form */}
          <div className="col-12 col-lg-7">
            <div className="bg-white border p-4 p-md-5">
              <span className="ryva-subheading mb-1 d-block">SEND AN INQUIRY</span>
              <h3 className="ryva-serif mb-3">Atelier Message Form</h3>

              {submitted ? (
                <div className="p-4 bg-light border text-center my-3">
                  <CheckCircle size={44} className="text-success mb-3 mx-auto" />
                  <h4 className="ryva-serif mb-2">Message Received (Demo Mode)</h4>
                  <p className="small text-muted mb-3" style={{ maxWidth: '440px', margin: '0 auto' }}>
                    Thank you, <strong>{formData.name}</strong>. Your message regarding "<em>{formData.subject}</em>" has been registered in demo mode. In production, our client concierge responds within 24 hours.
                  </p>
                  <p className="small text-secondary mb-4" style={{ fontSize: '0.75rem' }}>
                    *No email backend is connected to this preview form. For immediate live responses, connect via Instagram <strong>{brandConfig.instagram.handle}</strong>.
                  </p>
                  <button
                    type="button"
                    className="btn-ryva-dark"
                    onClick={handleReset}
                  >
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="small fw-semibold text-muted mb-1">Your Name *</label>
                      <input
                        type="text"
                        className={`ryva-input ${errors.name ? 'border-danger' : ''}`}
                        placeholder="e.g. Meera Kapoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <span className="small text-danger">{errors.name}</span>}
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="small fw-semibold text-muted mb-1">Email Address *</label>
                      <input
                        type="email"
                        className={`ryva-input ${errors.email ? 'border-danger' : ''}`}
                        placeholder="meera@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <span className="small text-danger">{errors.email}</span>}
                    </div>

                    <div className="col-12">
                      <label className="small fw-semibold text-muted mb-1">Subject of Inquiry *</label>
                      <input
                        type="text"
                        className={`ryva-input ${errors.subject ? 'border-danger' : ''}`}
                        placeholder="Sizing Advice, Order Inquiry, Collection Availability"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                      {errors.subject && <span className="small text-danger">{errors.subject}</span>}
                    </div>

                    <div className="col-12">
                      <label className="small fw-semibold text-muted mb-1">Your Message *</label>
                      <textarea
                        rows="5"
                        className={`ryva-input ${errors.message ? 'border-danger' : ''}`}
                        placeholder="Please detail your request or preferred pieces..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                      {errors.message && <span className="small text-danger">{errors.message}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-ryva-dark w-100 py-3"
                    id="contact-submit-btn"
                  >
                    <Send size={15} />
                    <span>TRANSMIT MESSAGE (DEMO)</span>
                  </button>

                  <p className="small text-muted text-center mt-3 mb-0" style={{ fontSize: '0.72rem' }}>
                    *Demo form notice: Messages submitted are client-side simulated demonstrations.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Atmosphere & Direct Actions */}
          <div className="col-12 col-lg-5">
            <div className="bg-white border p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <span className="ryva-subheading mb-1 d-block">DIRECT CLIENT CHANNELS</span>
                <h4 className="ryva-serif mb-3">Prefer Immediate Dialogue?</h4>
                <p className="small text-muted mb-4">
                  Our private client team is most active on Instagram and WhatsApp during studio hours. For immediate confirmation of current size availability or custom styling requests:
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  <a
                    href={brandConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-shadow transition-all"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <InstagramIcon size={20} />
                      <div>
                        <span className="small fw-bold d-block">DM on Instagram</span>
                        <span className="small text-muted">{brandConfig.instagram.handle}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} />
                  </a>

                  <a
                    href={`https://wa.me/${brandConfig.whatsapp.phoneNumber}?text=${encodeURIComponent(brandConfig.whatsapp.welcomeMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-shadow transition-all"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <MessageCircle size={20} className="text-success" />
                      <div>
                        <span className="small fw-bold d-block">WhatsApp Chat</span>
                        <span className="small text-muted">+{brandConfig.whatsapp.phoneNumber} (Demo)</span>
                      </div>
                    </div>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Editorial Image thumbnail */}
              <div className="mt-4 pt-3 border-top">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="RYVA Atelier Concierge"
                  className="w-100 border"
                  style={{ height: '170px', objectFit: 'cover' }}
                />
              </div>

            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <section className="bg-white border p-4 p-md-5">
          <div className="text-center mb-4">
            <span className="ryva-subheading">FREQUENT INQUIRIES</span>
            <h3 className="ryva-serif">CONCIERGE FAQS</h3>
            <div className="ryva-divider-gold"></div>
          </div>

          <div className="row g-3">
            {faqs.map((faq, index) => (
              <div key={index} className="col-12 col-md-6">
                <div className="p-3 border h-100 bg-light bg-opacity-50">
                  <span className="fw-bold small d-block mb-1 text-dark">
                    {faq.q}
                  </span>
                  <p className="small text-muted mb-0">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
