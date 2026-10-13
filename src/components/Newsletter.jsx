import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage('Thank you for subscribing to the RYVA Atelier dispatch.');
    setEmail('');
  };

  return (
    <section className="ryva-section py-5 bg-white border-top border-bottom border-light">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-8 col-lg-6">
            
            <span className="ryva-subheading mb-1 d-block">ATELIER DISPATCH</span>
            <h2 className="mb-2">JOIN THE RYVA CIRCLE</h2>
            <div className="ryva-divider-gold mb-3"></div>
            <p className="text-muted small mb-4">
              Receive private invitations to seasonal capsules, editorial releases, and private showroom events.
            </p>

            {status === 'success' ? (
              <div className="alert alert-success d-flex align-items-center justify-content-center gap-2 rounded-0 border-0 p-3 bg-light text-dark">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small fw-semibold">{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <div className="position-relative flex-grow-1">
                    <input
                      type="email"
                      className="ryva-input"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      aria-label="Email address for newsletter"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-ryva-dark flex-shrink-0 py-2 px-4"
                  >
                    <span>SUBSCRIBE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {status === 'error' && (
                  <div className="d-flex align-items-center justify-content-center gap-1 text-danger small mt-2">
                    <AlertCircle size={14} />
                    <span>{message}</span>
                  </div>
                )}
              </form>
            )}

            <p className="text-muted small m-0" style={{ fontSize: '0.72rem' }}>
              *Demonstration form. No marketing spam. You can unsubscribe at any time.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
