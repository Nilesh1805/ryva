import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const SizeGuideModal = ({ isOpen, onClose, defaultTab = 'clothing' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isOpen) return null;

  return (
    <div className={`ryva-modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className="ryva-modal-content"
        style={{ maxWidth: '800px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="ryva-modal-close"
          onClick={onClose}
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        <div className="p-4 p-md-5">
          <span className="ryva-subheading mb-1 d-block">PRECISION TAILORING</span>
          <h3 className="ryva-serif mb-3">RYVA ATELIER SIZE GUIDE</h3>
          <p className="small text-muted mb-4">
            Our silhouettes are engineered with modern architectural proportions. Use the charts below to determine your ideal size.
          </p>

          {/* Tab Selector & Unit Switcher */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 border-bottom pb-3 mb-4">
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn btn-sm rounded-0 text-uppercase fw-semibold ${activeTab === 'clothing' ? 'btn-dark' : 'btn-outline-secondary'}`}
                style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
                onClick={() => setActiveTab('clothing')}
              >
                Clothing (Men &amp; Women)
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-0 text-uppercase fw-semibold ${activeTab === 'footwear' ? 'btn-dark' : 'btn-outline-secondary'}`}
                style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
                onClick={() => setActiveTab('footwear')}
              >
                Footwear Conversion
              </button>
            </div>

            {activeTab === 'clothing' && (
              <div className="d-flex align-items-center gap-1 border p-1 rounded-0">
                <button
                  type="button"
                  className={`btn btn-sm py-0 px-2 rounded-0 ${unit === 'in' ? 'btn-dark' : 'btn-light'}`}
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => setUnit('in')}
                >
                  Inches
                </button>
                <button
                  type="button"
                  className={`btn btn-sm py-0 px-2 rounded-0 ${unit === 'cm' ? 'btn-dark' : 'btn-light'}`}
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => setUnit('cm')}
                >
                  CM
                </button>
              </div>
            )}
          </div>

          {/* Table Content */}
          {activeTab === 'clothing' ? (
            <div className="table-responsive">
              <table className="table table-bordered table-sm text-center align-middle mb-4">
                <thead className="table-dark">
                  <tr>
                    <th className="py-2">RYVA Size</th>
                    <th>Chest / Bust ({unit})</th>
                    <th>Waist ({unit})</th>
                    <th>Hips ({unit})</th>
                    <th>Shoulder ({unit})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">XS (UK 6 / 34)</td>
                    <td>{unit === 'in' ? '34 - 36' : '86 - 91'}</td>
                    <td>{unit === 'in' ? '28 - 30' : '71 - 76'}</td>
                    <td>{unit === 'in' ? '34 - 36' : '86 - 91'}</td>
                    <td>{unit === 'in' ? '16.5' : '42'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">S (UK 8 / 36)</td>
                    <td>{unit === 'in' ? '36 - 38' : '91 - 96'}</td>
                    <td>{unit === 'in' ? '30 - 32' : '76 - 81'}</td>
                    <td>{unit === 'in' ? '36 - 38' : '91 - 96'}</td>
                    <td>{unit === 'in' ? '17.2' : '43.5'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">M (UK 10 / 38)</td>
                    <td>{unit === 'in' ? '38 - 40' : '96 - 102'}</td>
                    <td>{unit === 'in' ? '32 - 34' : '81 - 86'}</td>
                    <td>{unit === 'in' ? '38 - 40' : '96 - 102'}</td>
                    <td>{unit === 'in' ? '18.0' : '45.7'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">L (UK 12 / 40)</td>
                    <td>{unit === 'in' ? '40 - 42' : '102 - 107'}</td>
                    <td>{unit === 'in' ? '34 - 36' : '86 - 91'}</td>
                    <td>{unit === 'in' ? '40 - 42' : '102 - 107'}</td>
                    <td>{unit === 'in' ? '18.7' : '47.5'}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">XL (UK 14 / 42)</td>
                    <td>{unit === 'in' ? '42 - 44' : '107 - 112'}</td>
                    <td>{unit === 'in' ? '36 - 38' : '91 - 96'}</td>
                    <td>{unit === 'in' ? '42 - 44' : '107 - 112'}</td>
                    <td>{unit === 'in' ? '19.5' : '49.5'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-sm text-center align-middle mb-4">
                <thead className="table-dark">
                  <tr>
                    <th className="py-2">UK / India</th>
                    <th>EU</th>
                    <th>US Men</th>
                    <th>US Women</th>
                    <th>Foot Length (CM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">UK 5</td>
                    <td>38</td>
                    <td>6.0</td>
                    <td>7.0</td>
                    <td>24.2</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 6</td>
                    <td>39</td>
                    <td>7.0</td>
                    <td>8.0</td>
                    <td>25.0</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 7</td>
                    <td>40 / 41</td>
                    <td>8.0</td>
                    <td>9.0</td>
                    <td>25.8</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 8</td>
                    <td>42</td>
                    <td>9.0</td>
                    <td>10.0</td>
                    <td>26.7</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 9</td>
                    <td>43</td>
                    <td>10.0</td>
                    <td>11.0</td>
                    <td>27.5</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 10</td>
                    <td>44</td>
                    <td>11.0</td>
                    <td>12.0</td>
                    <td>28.3</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">UK 11</td>
                    <td>45</td>
                    <td>12.0</td>
                    <td>13.0</td>
                    <td>29.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Guidance note */}
          <div className="bg-light p-3 border-start border-3 border-dark">
            <span className="fw-bold small d-block mb-1">Tailor's Fit Recommendation:</span>
            <p className="small text-muted m-0">
              If your measurements fall between two sizes, we recommend sizing up for oversized editorial cuts or sizing down for sculpted form-fitting silhouettes. Need personalized advice? Message our concierge on WhatsApp or DM @ryvacollection01 on Instagram.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
