import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  AlertCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { brandConfig } from '../config/brand';
import { buildWhatsAppProductMessage } from '../components/WhatsAppButton';
import SizeGuideModal from '../components/SizeGuideModal';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes && product.sizes.length === 1 ? product.sizes[0] : '');
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setQuantity(1);
      setValidationError('');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="container py-5 text-center my-5">
        <h2 className="ryva-serif mb-3">Product Not Found</h2>
        <p className="text-muted mb-4">
          The requested fashion piece could not be located in the RYVA Atelier catalogue.
        </p>
        <Link to="/shop" className="btn-ryva-dark">
          <span>RETURN TO CATALOGUE</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image];

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    // Critical validation: require size selection before adding size-dependent products!
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size to add this piece to your bag.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleWhatsAppEnquire = () => {
    const url = buildWhatsAppProductMessage(product, selectedSize, selectedColor);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(brandConfig.instagram.url, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Related products from same category or gender
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="ryva-product-details-page py-3 py-lg-4">
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small m-0" style={{ letterSpacing: '0.06em' }}>
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/shop" className="text-muted">Shop</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/shop?category=${product.category}`} className="text-muted">
                {product.categoryName}
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Layout */}
        <div className="row g-4 g-lg-5 mb-5">
          
          {/* Left Column: Product Gallery */}
          <div className="col-12 col-lg-7">
            <div className="row g-2 g-md-3">
              
              {/* Thumbnail Selector Column (Desktop) */}
              {images.length > 1 && (
                <div className="col-12 col-md-2 order-2 order-md-1">
                  <div className="d-flex flex-row flex-md-column gap-2 overflow-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn p-0 border rounded-0 overflow-hidden ${activeImageIndex === idx ? 'border-2 border-dark' : 'border-light'}`}
                        style={{ width: '65px', height: '85px', flexShrink: 0 }}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Featured Image Container */}
              <div className={`col-12 ${images.length > 1 ? 'col-md-10' : 'col-md-12'} order-1 order-md-2`}>
                <div
                  className="position-relative overflow-hidden bg-light border"
                  style={{ aspectRatio: '3/4', maxHeight: '720px' }}
                >
                  <img
                    src={images[activeImageIndex]}
                    alt={product.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="ryva-badge ryva-badge-new">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Heart on Image */}
                  <button
                    type="button"
                    className={`ryva-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={18} fill={isWishlisted ? "#B22222" : "none"} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Information, Pricing, Selectors & Actions */}
          <div className="col-12 col-lg-5">
            <div className="ps-lg-2">
              
              {/* Category & Collection */}
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="ryva-subheading m-0">
                  {product.categoryName} • {product.subcategory}
                </span>
                <button
                  type="button"
                  className="btn btn-link p-0 text-muted small d-flex align-items-center gap-1"
                  onClick={handleShare}
                  title="Share link"
                >
                  <Share2 size={15} />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="ryva-serif fs-2 mb-3">
                {product.name}
              </h1>

              {/* Price & Tax Note */}
              <div className="d-flex align-items-baseline gap-3 mb-2">
                <span className="fs-3 fw-bold text-dark">
                  {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="fs-5 text-muted text-decoration-line-through">
                    {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent && (
                  <span className="badge bg-danger rounded-0 px-2 py-1 small">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-muted small mb-4" style={{ fontSize: '0.78rem' }}>
                Inclusive of all taxes. Complimentary shipping on orders above ₹{brandConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')}.
              </p>

              {/* Stock Status Indicator */}
              <div className="d-flex align-items-center gap-2 mb-4 p-2 bg-light border small">
                <Sparkles size={14} className="text-warning" />
                <span>
                  {product.inStock ? (
                    <>
                      In Stock Atelier Edition — <strong className="text-dark">Only {product.stockCount} pieces</strong> available in current batch.
                    </>
                  ) : (
                    <span className="text-danger fw-semibold">Temporarily Sold Out</span>
                  )}
                </span>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: '0.12em' }}>
                      Colour: <span className="fw-normal text-muted">{selectedColor?.name}</span>
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`btn p-1 rounded-circle d-flex align-items-center justify-content-center ${selectedColor?.name === color.name ? 'border border-2 border-dark' : 'border border-light'}`}
                        style={{ width: '34px', height: '34px' }}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                      >
                        <span
                          className="rounded-circle d-block w-100 h-100"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-uppercase" style={{ letterSpacing: '0.12em' }}>
                      Select Size: {selectedSize && <span className="fw-normal text-muted">{selectedSize}</span>}
                    </span>
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-muted text-decoration-underline"
                      style={{ fontSize: '0.78rem' }}
                      onClick={() => setSizeGuideOpen(true)}
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="d-flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`btn rounded-0 px-3 py-2 small fw-semibold transition-all ${
                          selectedSize === size
                            ? 'btn-dark'
                            : 'btn-outline-secondary'
                        }`}
                        style={{ minWidth: '48px' }}
                        onClick={() => {
                          setSelectedSize(size);
                          setValidationError('');
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Size Validation Alert */}
                  {validationError && (
                    <div className="d-flex align-items-center gap-2 text-danger small mt-2 p-2 bg-danger bg-opacity-10 border border-danger border-opacity-25">
                      <AlertCircle size={15} />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4">
                <span className="small fw-bold text-uppercase d-block mb-2" style={{ letterSpacing: '0.12em' }}>
                  Quantity
                </span>
                <div className="d-inline-flex align-items-center border border-secondary border-opacity-25 bg-white">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-dark px-3 py-2"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 fw-bold small">{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-dark px-3 py-2"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag, Wishlist, WhatsApp */}
              <div className="d-flex flex-column gap-2 mb-4">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn-ryva-dark flex-grow-1 py-3"
                    onClick={handleAddToCart}
                    id="product-add-to-cart"
                  >
                    <ShoppingBag size={17} />
                    <span>ADD TO SHOPPING BAG</span>
                  </button>

                  <button
                    type="button"
                    className={`btn btn-outline-dark rounded-0 px-3 d-flex align-items-center justify-content-center ${isWishlisted ? 'text-danger border-danger' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                  >
                    <Heart size={20} fill={isWishlisted ? "#B22222" : "none"} />
                  </button>
                </div>

                {/* Direct WhatsApp Concierge Order Button */}
                <button
                  type="button"
                  className="btn btn-outline-success rounded-0 py-2 d-flex align-items-center justify-content-center gap-2 small fw-bold"
                  onClick={handleWhatsAppEnquire}
                >
                  <MessageCircle size={16} />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>

              {/* Reassurance Badges */}
              <div className="row g-2 border-top border-bottom py-3 mb-4 text-center text-muted small" style={{ fontSize: '0.75rem' }}>
                <div className="col-4">
                  <Truck size={16} className="text-dark d-block mx-auto mb-1" />
                  <span>Express Dispatch</span>
                </div>
                <div className="col-4 border-start border-end">
                  <RotateCcw size={16} className="text-dark d-block mx-auto mb-1" />
                  <span>7-Day Return / Exchange</span>
                </div>
                <div className="col-4">
                  <ShieldCheck size={16} className="text-dark d-block mx-auto mb-1" />
                  <span>100% Authentic Atelier</span>
                </div>
              </div>

              {/* Product Accordion / Tabs: Description, Details & Care, Delivery */}
              <div className="border">
                {/* Description Item */}
                <div className="border-bottom">
                  <button
                    type="button"
                    className="btn w-100 text-start p-3 fw-bold small text-uppercase d-flex justify-content-between align-items-center"
                    style={{ letterSpacing: '0.1em' }}
                    onClick={() => setActiveAccordion(activeAccordion === 'desc' ? '' : 'desc')}
                  >
                    <span>The Design Story</span>
                    <span>{activeAccordion === 'desc' ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === 'desc' && (
                    <div className="p-3 pt-0 text-muted small">
                      <p className="mb-0">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Details & Composition */}
                <div className="border-bottom">
                  <button
                    type="button"
                    className="btn w-100 text-start p-3 fw-bold small text-uppercase d-flex justify-content-between align-items-center"
                    style={{ letterSpacing: '0.1em' }}
                    onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                  >
                    <span>Fabric, Craft &amp; Care</span>
                    <span>{activeAccordion === 'details' ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === 'details' && (
                    <div className="p-3 pt-0 text-muted small">
                      {product.details && product.details.length > 0 ? (
                        <ul className="mb-0 ps-3">
                          {product.details.map((item, idx) => (
                            <li key={idx} className="mb-1">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">Premium crafted fabric. Dry clean recommended.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping & Delivery placeholder */}
                <div>
                  <button
                    type="button"
                    className="btn w-100 text-start p-3 fw-bold small text-uppercase d-flex justify-content-between align-items-center"
                    style={{ letterSpacing: '0.1em' }}
                    onClick={() => setActiveAccordion(activeAccordion === 'delivery' ? '' : 'delivery')}
                  >
                    <span>Shipping &amp; Delivery (Demo)</span>
                    <span>{activeAccordion === 'delivery' ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === 'delivery' && (
                    <div className="p-3 pt-0 text-muted small">
                      <p className="mb-1">
                        • Standard delivery: <strong>{brandConfig.shipping.estimatedDaysStandard}</strong> across India.
                      </p>
                      <p className="mb-1">
                        • Complimentary express shipping on all orders over ₹{brandConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')}.
                      </p>
                      <p className="mb-0 text-secondary" style={{ fontSize: '0.72rem' }}>
                        *Demonstration preview: Real delivery timeline will be coordinated upon live store launch.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-5 border-top">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span className="ryva-subheading mb-1 d-block">COMPLETE THE LOOK</span>
                <h3 className="ryva-serif m-0">YOU MAY ALSO DESIRE</h3>
              </div>
              <Link to="/shop" className="btn-ryva-link">
                <span>View Full Atelier</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="row g-4">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="col-6 col-md-3">
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        defaultTab={product.category === 'footwear' ? 'footwear' : 'clothing'}
      />
    </div>
  );
};

export default ProductDetails;
