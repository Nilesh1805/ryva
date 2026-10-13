import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import FeaturedBanner from '../components/FeaturedBanner';
import BrandStorySection from '../components/BrandStorySection';
import InstagramSection from '../components/InstagramSection';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { products } from '../data/products';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // New Arrivals (limit 4 for homepage showcase)
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  // Best Sellers (limit 4 for homepage showcase)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="ryva-home-page">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Section */}
      <CategorySection />

      {/* 3. New Arrivals Section */}
      <section className="ryva-section pt-0" id="new-arrivals-section">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 pb-2 border-bottom">
            <div>
              <span className="ryva-subheading mb-1 d-block">LATEST ATELIER DROPS</span>
              <h2 className="m-0">NEW ARRIVALS</h2>
            </div>
            <Link to="/shop?filter=new" className="btn-ryva-link mt-3 mt-md-0">
              <span>View All New Arrivals</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {newArrivals.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Collection Editorial Banner */}
      <FeaturedBanner />

      {/* 5. Best Sellers Section */}
      <section className="ryva-section" id="best-sellers-section">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 pb-2 border-bottom">
            <div>
              <span className="ryva-subheading mb-1 d-block">HIGH-ROTATION SILHOUETTES</span>
              <h2 className="m-0">BEST SELLERS</h2>
            </div>
            <Link to="/shop?filter=bestseller" className="btn-ryva-link mt-3 mt-md-0">
              <span>View All Best Sellers</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="row g-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Story Section */}
      <BrandStorySection />

      {/* 7. Instagram Showcase */}
      <InstagramSection />

      {/* 8. Newsletter Dispatch */}
      <Newsletter />

      {/* Modals */}
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

export default Home;
