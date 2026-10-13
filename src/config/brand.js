/**
 * RYVA COLLECTION — Central Brand & Store Configuration
 * 
 * Keep all brand-level details, contact links, and business constants here.
 * When real credentials or store contact numbers are available, update them in this file.
 */

export const brandConfig = {
  name: "RYVA COLLECTION",
  shortName: "RYVA",
  tagline: "Contemporary fashion. Timeless confidence.",
  heroHeadline: "DEFINE YOUR STYLE.",
  heroSubheadline: "Contemporary fashion. Timeless confidence.",

  // Logos
  logos: {
    primary: "/images/ryva-logo.svg",
    dark: "/images/ryva-logo-dark.svg",
    light: "/images/ryva-logo-light.svg",
    monogram: "/images/ryva-monogram.svg",
    favicon: "/favicon.svg",
  },

  // Official Instagram Channel (Primary reference)
  instagram: {
    handle: "@ryvacollection01",
    url: "https://instagram.com/ryvacollection01/",
  },

  // WhatsApp Integration (Configurable)
  // Set to real 10/12 digit international number when ready e.g. "919876543210"
  whatsapp: {
    enabled: true,
    phoneNumber: "919670770767", // Placeholder demo business number
    isPlaceholder: true, // Indicates to UI that this is demo/configurable
    fallbackInstagram: "https://instagram.com/ryvacollection01/",
    welcomeMessage: "Hello RYVA COLLECTION! I would like to enquire about your luxury collection.",
  },

  // Contact Information (Configurable Placeholders)
  contact: {
    email: "amit@gmail.com",
    supportPhone: "+91 9670770767",
    businessHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
    address: {
      line1: "RYVA Collection & Flagship Showroom",
      line2: "Pakarikala Road",
      city: "Azamgarh",
      state: "India",
      postalCode: "276301",
      country: "India",
    },
  },

  // Pricing & Currency
  currency: {
    code: "INR",
    symbol: "₹",
  },

  // Shipping Rules
  shipping: {
    freeShippingThreshold: 2999, // Free shipping above ₹2,999
    standardCost: 199,
    expressCost: 399,
    estimatedDaysStandard: "3-5 business days",
    estimatedDaysExpress: "1-2 business days",
  },

  // Social Links
  socials: [
    { name: "Instagram", url: "https://instagram.com/ryvacollection01/", handle: "@ryvacollection01" },
    { name: "Pinterest", url: "https://pinterest.com/ryvacollection", handle: "ryvacollection" },
    { name: "Facebook", url: "https://facebook.com/ryvacollection", handle: "ryvacollection" },
  ],

  // Announcement Bar
  announcement: {
    text: "COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹2,999 • EXPLORE THE SS25 EDIT",
    secondaryText: "EXCLUSIVE DROP NOW LIVE • DM @RYVACOLLECTION01 ON INSTAGRAM",
  },

  // Brand Story Quote
  brandStory: {
    headline: "MORE THAN WHAT YOU WEAR.",
    quote: "True style is an unspoken dialogue of precision, quiet luxury, and unapologetic self-expression.",
    description: "At RYVA COLLECTION, we curate contemporary silhouettes designed for those who appreciate clean lines, intentional tailoring, and timeless confidence. Each piece in our edit bridges modern street aesthetics with refined craftsmanship, delivering statement wear that transcends fleeting trends.",
  },

  // Demo Mode Notice
  demoMode: {
    isDemo: true,
    notice: "This is a demonstration preview of the RYVA COLLECTION online boutique. Orders and payment gateways are currently in test demonstration mode.",
  },
};

export default brandConfig;
