import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandConfig } from '../config/brand';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const STORAGE_KEY = 'ryva_collection_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showNotification = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    // Generate unique key by ID + size + color
    const colorName = typeof selectedColor === 'object' ? selectedColor?.name : selectedColor || 'Default';
    const itemKey = `${product.id}-${selectedSize || 'Standard'}-${colorName}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem = {
          itemKey,
          id: product.id,
          slug: product.slug,
          name: product.name,
          categoryName: product.categoryName || 'RYVA Atelier',
          price: product.price,
          originalPrice: product.originalPrice,
          image: Array.isArray(product.images) ? product.images[0] : product.image,
          selectedSize: selectedSize || (product.sizes ? product.sizes[0] : 'Standard'),
          selectedColor: selectedColor || (product.colors ? product.colors[0] : null),
          quantity,
        };
        return [...prev, newItem];
      }
    });

    showNotification(`Added "${product.name}" (${selectedSize}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.itemKey === itemKey ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const freeShippingThreshold = brandConfig.shipping.freeShippingThreshold;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : brandConfig.shipping.standardCost;
  const cartTotal = cartSubtotal + shippingFee;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTotal,
        shippingFee,
        isFreeShipping,
        progressToFreeShipping,
        amountToFreeShipping,
        freeShippingThreshold,
        isCartOpen,
        setIsCartOpen,
        openCartDrawer: () => setIsCartOpen(true),
        closeCartDrawer: () => setIsCartOpen(false),
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
