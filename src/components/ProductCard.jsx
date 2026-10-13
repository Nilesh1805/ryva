import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../config/brand';

const ProductCard = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const primaryImage = Array.isArray(product.images) && product.images.length > 0 
    ? product.images[0] 
    : product.image;
    
  const secondaryImage = Array.isArray(product.images) && product.images.length > 1 
    ? product.images[1] 
    : primaryImage;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // For products with sizes, open quick view modal so user selects valid size
    if (product.sizes && product.sizes.length > 1 && onQuickView) {
      onQuickView(product);
    } else {
      addToCart(
        product,
        product.sizes ? product.sizes[0] : 'Standard',
        product.colors ? product.colors[0] : null,
        1
      );
    }
  };

  return (
    <div className="ryva-product-card">
      {/* Thumbnail Container */}
      <div className="ryva-product-thumb-container">
        
        {/* Badges */}
        <div className="ryva-product-badges">
          {product.badge && (
            <span className={`ryva-badge ${
              product.badge === 'NEW' 
                ? 'ryva-badge-new' 
                : product.badge === 'LIMITED' 
                ? 'ryva-badge-limited' 
                : 'ryva-badge-gold'
            }`}>
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="ryva-badge bg-danger text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`ryva-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "In Wishlist" : "Save to Wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "#B22222" : "none"} />
        </button>

        {/* Product Images (Primary + Secondary Hover) */}
        <Link to={`/product/${product.slug}`} className="d-block w-100 h-100">
          <img
            src={primaryImage}
            alt={product.name}
            className="ryva-product-img"
            loading="lazy"
          />
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              className="ryva-product-img ryva-product-img-secondary"
              loading="lazy"
            />
          )}
        </Link>

        {/* Quick Actions Hover Bar */}
        <div className="ryva-product-quick-actions">
          {onQuickView && (
            <button
              type="button"
              className="btn btn-sm btn-light w-50 py-2 d-flex align-items-center justify-content-center gap-1 rounded-0 fw-semibold text-uppercase"
              style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye size={13} />
              <span>Quick View</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-sm btn-dark w-50 py-2 d-flex align-items-center justify-content-center gap-1 rounded-0 fw-semibold text-uppercase"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={13} />
            <span>{product.sizes && product.sizes.length > 1 ? 'Select Size' : 'Add to Bag'}</span>
          </button>
        </div>

      </div>

      {/* Product Info */}
      <div className="ryva-product-info">
        <span className="ryva-product-category">
          {product.categoryName}
        </span>

        <h3 className="ryva-product-title">
          <Link to={`/product/${product.slug}`} title={product.name}>
            {product.name}
          </Link>
        </h3>

        {/* Price Row */}
        <div className="ryva-product-price-row">
          <span className="ryva-current-price">
            {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="ryva-original-price">
              {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="ryva-color-swatches" title={`${product.colors.length} available colors`}>
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="ryva-color-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
