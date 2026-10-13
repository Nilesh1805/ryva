import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../config/brand';
import { Sparkles, ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const messages = [
    brandConfig.announcement.text,
    brandConfig.announcement.secondaryText,
    "EXCLUSIVE HANDCRAFTED FOOTWEAR & BESPOKE SILHOUETTES",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="ryva-announcement-bar text-center">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Sparkles size={13} className="text-warning flex-shrink-0" />
          <span className="text-truncate">
            {messages[index]}
          </span>
          <Link to="/shop" className="d-none d-md-inline-flex align-items-center gap-1 ms-2">
            <span>Shop Now</span>
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
