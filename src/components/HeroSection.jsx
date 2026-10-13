import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { brandConfig } from '../config/brand';

const LOOP_DURATION_SECONDS = 10;

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Ensure autoplay starts smoothly on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        // Autoplay policy fallback
        console.log('Autoplay deferred until interaction:', err);
      });
    }
  }, []);

  // 10-second automatic repeat loop logic
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    
    // Once playback reaches 10 seconds, smoothly loop back to 0
    if (current >= LOOP_DURATION_SECONDS) {
      video.currentTime = 0;
      video.play().catch(() => {});
      setProgress(0);
    } else {
      setProgress((current / LOOP_DURATION_SECONDS) * 100);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <section className="ryva-hero">
      {/* 10-Second Auto-Repeating Editorial Background Video */}
      <video
        ref={videoRef}
        className="ryva-hero-bg"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
        onTimeUpdate={handleTimeUpdate}
        aria-label="RYVA Collection SS25 Runway Editorial Video"
      >
        <source src="/videos/hero-fashion.mp4" type="video/mp4" />
        <source src="/videos/hero-fashion.webm" type="video/webm" />
        {/* Fallback image for browsers that don't support HTML5 video */}
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="RYVA Collection Editorial SS25"
          className="ryva-hero-bg"
        />
      </video>

      {/* Luxury Dark Vignette Overlay for Crisp Readability */}
      <div className="ryva-hero-overlay"></div>

      {/* 10-Second Loop Progress Line */}
      <div className="ryva-hero-video-bar" title="10-second editorial loop progression">
        <div
          className="ryva-hero-video-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Video Controls */}
      <div className="ryva-hero-video-controls d-none d-sm-flex">
        <button
          type="button"
          className="ryva-video-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          title={isPlaying ? 'Pause runway loop' : 'Play runway loop'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <button
          type="button"
          className="ryva-video-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {/* Hero Content */}
      <div className="container ryva-hero-content">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8 col-xl-7">
            
            {/* Editorial Badge */}
            <div className="ryva-hero-badge">
              <Compass size={14} />
              <span>SS25 ATELIER EDIT • READY-TO-WEAR</span>
            </div>

            {/* Headline */}
            <h1 className="display-3">
              DEFINE YOUR STYLE.
            </h1>

            {/* Supporting Text */}
            <p className="lead">
              {brandConfig.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
              <Link to="/shop" className="btn-ryva-dark" id="hero-cta-explore">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={15} />
              </Link>
              
              <Link to="/about" className="btn-ryva-outline-gold" id="hero-cta-discover">
                <span>DISCOVER RYVA</span>
              </Link>
            </div>

            {/* Bottom mini-editorial highlights */}
            <div className="row g-3 pt-5 mt-3 border-top border-secondary border-opacity-25 d-none d-md-flex">
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  CRAFT
                </span>
                <span className="text-white small fw-semibold">
                  Hand-Finished Details
                </span>
              </div>
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  AESTHETIC
                </span>
                <span className="text-white small fw-semibold">
                  Modern Minimalist
                </span>
              </div>
              <div className="col-4">
                <span className="d-block text-white-50 text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                  CURATION
                </span>
                <span className="text-white small fw-semibold">
                  Limited Editions
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
