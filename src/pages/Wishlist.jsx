import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { brandConfig } from '../config/brand';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const handleMoveToBag = (product) => {
    if (product.sizes && product.sizes.length > 1) {
      // Prompt user to select size via quick view modal
      setQuickViewProduct(product);
    } else {
      addToCart(
        product,
        product.sizes ? product.sizes[0] : 'Standard',
        product.colors ? product.colors[0] : null,
        1
      );
      removeFromWishlist(product.id);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="p-5 bg-white border mx-auto" style={{ maxWidth: '560px' }}>
          <Heart size={52} className="text-muted opacity-40 mb-3" />
          <h2 className="ryva-serif mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted small mb-4">
            Curate your personal wardrobe edit by saving favorite pieces as you browse.
          </p>
          <Link to="/shop" className="btn-ryva-dark">
            <span>EXPLORE THE ATELIER</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ryva-wishlist-page py-4 py-lg-5">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-4 pb-2 border-bottom">
          <div>
            <span className="ryva-subheading mb-1 d-block">CURATED SELECTION</span>
            <h1 className="ryva-serif m-0">SAVED PIECES ({wishlistItems.length})</h1>
          </div>
          <button
            type="button"
            className="btn btn-link text-muted small p-0 mt-2 mt-sm-0 text-decoration-underline"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </button>
        </div>

        {/* Product Grid */}
        <div className="row g-4">
          {wishlistItems.map((product) => {
            const primaryImg = Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : product.image;

            return (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className="ryva-product-card">
                  
                  {/* Thumbnail */}
                  <div className="ryva-product-thumb-container">
                    <Link to={`/product/${product.slug}`} className="d-block w-100 h-100">
                      <img
                        src={primaryImg}
                        alt={product.name}
                        className="ryva-product-img"
                        loading="lazy"
                      />
                    </Link>

                    {/* Remove Wishlist Button */}
                    <button
                      type="button"
                      className="ryva-wishlist-btn active"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={15} className="text-danger" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="ryva-product-info">
                    <span className="ryva-product-category">{product.categoryName}</span>
                    <h3 className="ryva-product-title">
                      <Link to={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <div className="ryva-product-price-row mb-3">
                      <span className="ryva-current-price">
                        {brandConfig.currency.symbol}{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="ryva-original-price">
                          {brandConfig.currency.symbol}{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn-ryva-dark w-100 py-2 small"
                      onClick={() => handleMoveToBag(product)}
                    >
                      <ShoppingBag size={13} />
                      <span>{product.sizes && product.sizes.length > 1 ? 'Select Size' : 'Move to Bag'}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Quick View Modal for size selection */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
          setSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};

export default Wishlist;
