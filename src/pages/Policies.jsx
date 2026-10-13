import React, { useState } from 'react';
import { Shield, Truck, RotateCcw, FileText } from 'lucide-react';
import { brandConfig } from '../config/brand';

const Policies = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  const tabs = [
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
    { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  ];

  return (
    <div className="ryva-policies-page py-4 py-lg-5">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5 pb-2">
          <span className="ryva-subheading">CLIENT ASSURANCE</span>
          <h1 className="ryva-serif">ATELIER POLICIES</h1>
          <div className="ryva-divider-gold"></div>
          <p className="text-muted small mx-auto" style={{ maxWidth: '520px' }}>
            Clear commitments regarding shipping, returns, garment care, and customer privacy.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                className={`btn rounded-0 px-3 py-2 small fw-semibold text-uppercase d-flex align-items-center gap-2 ${activeTab === tab.id ? 'btn-dark' : 'btn-outline-secondary'}`}
                style={{ letterSpacing: '0.1em' }}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="bg-white border p-4 p-md-5 mx-auto" style={{ maxWidth: '840px' }}>
          
          {/* 1. Shipping Policy */}
          {activeTab === 'shipping' && (
            <div>
              <h3 className="ryva-serif mb-3">Shipping &amp; Dispatch Policy</h3>
              <p className="small text-muted mb-4">
                All RYVA COLLECTION garments and footwear pieces are hand-inspected, steam-finished, and packaged in bespoke dust packaging before dispatch.
              </p>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">1. Delivery Timelines</h5>
                <p className="small text-muted">
                  • <strong>Standard Shipping:</strong> {brandConfig.shipping.estimatedDaysStandard} across major Indian metros and tier-1 cities.
                  <br />
                  • <strong>Express Priority Dispatch:</strong> {brandConfig.shipping.estimatedDaysExpress} via premium courier partners with real-time tracking updates.
                </p>
              </div>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">2. Complimentary Shipping Threshold</h5>
                <p className="small text-muted">
                  Orders exceeding ₹{brandConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')} automatically qualify for complimentary expedited shipping. For orders below this value, a standard logistics fee of ₹{brandConfig.shipping.standardCost} is applied at checkout.
                </p>
              </div>

              <div>
                <h5 className="ryva-serif fs-6 mb-2">3. Package Tracking &amp; Delivery Inquiries</h5>
                <p className="small text-muted mb-0">
                  Tracking credentials are sent upon courier handover. If you require specialized delivery instructions, connect with our concierge at <strong>{brandConfig.contact.email}</strong> or on Instagram @ryvacollection01.
                </p>
              </div>
            </div>
          )}

          {/* 2. Returns & Exchanges */}
          {activeTab === 'returns' && (
            <div>
              <h3 className="ryva-serif mb-3">Returns &amp; Size Exchanges</h3>
              <p className="small text-muted mb-4">
                We take immense pride in the cut and construction of our garments. If an item does not fit precisely as desired, we offer a streamlined 7-day exchange window.
              </p>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">1. Exchange Eligibility</h5>
                <p className="small text-muted">
                  • Garments must be unworn, unwashed, and returned in their original packaging with all atelier tags intact.
                  <br />
                  • Footwear soles must be completely unmarked. We recommend trying footwear on carpeted surfaces.
                </p>
              </div>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">2. Complimentary Reverse Logistics</h5>
                <p className="small text-muted">
                  We provide reverse pickup services across all serviceable pin codes in India. Once your return is received and inspected at our flagship studio, your replacement size is dispatched within 48 hours.
                </p>
              </div>

              <div>
                <h5 className="ryva-serif fs-6 mb-2">3. Initiating an Exchange</h5>
                <p className="small text-muted mb-0">
                  To initiate an exchange, message our concierge on WhatsApp or DM <strong>{brandConfig.instagram.handle}</strong> on Instagram with your order ID and the desired replacement size.
                </p>
              </div>
            </div>
          )}

          {/* 3. Privacy Policy */}
          {activeTab === 'privacy' && (
            <div>
              <h3 className="ryva-serif mb-3">Privacy &amp; Data Security</h3>
              <p className="small text-muted mb-4">
                Your trust is of paramount importance to RYVA COLLECTION. This notice outlines how client data is treated.
              </p>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">1. Information Collection</h5>
                <p className="small text-muted">
                  We gather only the details necessary to deliver your orders: client name, shipping address, telephone number, and email coordinates. We do not sell, rent, or trade client information to any third-party marketing brokers.
                </p>
              </div>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">2. Payment Security</h5>
                <p className="small text-muted">
                  All payment transactions are processed via bank-grade PCI-DSS compliant payment gateways. RYVA COLLECTION never stores full card numbers or sensitive CVV codes on our servers.
                </p>
              </div>

              <div>
                <h5 className="ryva-serif fs-6 mb-2">3. Demonstration Environment Notice</h5>
                <p className="small text-muted mb-0">
                  During demonstration mode, information entered in checkout or contact forms is processed client-side and is not uploaded to permanent databases.
                </p>
              </div>
            </div>
          )}

          {/* 4. Terms & Conditions */}
          {activeTab === 'terms' && (
            <div>
              <h3 className="ryva-serif mb-3">Terms &amp; Conditions</h3>
              <p className="small text-muted mb-4">
                By accessing and utilizing the RYVA COLLECTION digital boutique, you agree to the following standards.
              </p>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">1. Intellectual Property</h5>
                <p className="small text-muted">
                  The RYVA wordmark, R-V monogram crest, imagery, visual design, and editorial copy are proprietary assets created for RYVA COLLECTION. Unauthorized reproduction is prohibited.
                </p>
              </div>

              <div className="mb-4">
                <h5 className="ryva-serif fs-6 mb-2">2. Product Presentation &amp; Colors</h5>
                <p className="small text-muted">
                  While we strive to display fabrics and colors with utmost fidelity, natural variations may occur depending on screen calibration and ambient lighting conditions.
                </p>
              </div>

              <div>
                <h5 className="ryva-serif fs-6 mb-2">3. Demonstration Disclaimer</h5>
                <p className="small text-muted mb-0">
                  This website represents a modern frontend presentation for the RYVA COLLECTION fashion brand. Actual product orders should be confirmed via authorized business channels on Instagram @ryvacollection01.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Policies;
