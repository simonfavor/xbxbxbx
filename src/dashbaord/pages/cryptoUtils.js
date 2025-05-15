// src/utils/cryptoUtils.js
import {
    FaBitcoin,
    FaWallet,

  } from 'react-icons/fa';

export const cryptoColors = {
    BTC: 'bg-amber-500',
    ETH: 'bg-blue-500',
    USDT: 'bg-green-500',
    BNB: 'bg-yellow-500',
    USDC: 'bg-blue-400',
    XRP: 'bg-gray-500',
    ADA: 'bg-blue-600',
    DOGE: 'bg-yellow-400',
    MATIC: 'bg-purple-500',
    SOL: 'bg-black',
    DOT: 'bg-pink-500',
    LTC: 'bg-gray-400',
    SHIB: 'bg-orange-400',
    AVAX: 'bg-red-500',
    LINK: 'bg-blue-300',
    UNI: 'bg-pink-400',
    BCH: 'bg-green-600',
    XLM: 'bg-purple-400',
    VET: 'bg-teal-500',
    DEFAULT: 'bg-gray-300'
  };
  
  export const cryptoBorderColors = {
    BTC: 'border-amber-500',
    ETH: 'border-blue-500',
    USDT: 'border-green-500',
    BNB: 'border-yellow-500',
    USDC: 'border-blue-400',
    XRP: 'border-gray-500',
    ADA: 'border-blue-600',
    DOGE: 'border-yellow-400',
    MATIC: 'border-purple-500',
    SOL: 'border-black',
    DOT: 'border-pink-500',
    LTC: 'border-gray-400',
    SHIB: 'border-orange-400',
    AVAX: 'border-red-500',
    LINK: 'border-blue-300',
    UNI: 'border-pink-400',
    BCH: 'border-green-600',
    XLM: 'border-purple-400',
    VET: 'border-teal-500',
    DEFAULT: 'border-gray-300'
  };
  
  export const cryptoTextColors = {
    BTC: 'text-amber-500',
    ETH: 'text-blue-500',
    USDT: 'text-green-500',
    BNB: 'text-yellow-500',
    USDC: 'text-blue-400',
    XRP: 'text-gray-500',
    ADA: 'text-blue-600',
    DOGE: 'text-yellow-400',
    MATIC: 'text-purple-500',
    SOL: 'text-black',
    DOT: 'text-pink-500',
    LTC: 'text-gray-400',
    SHIB: 'text-orange-400',
    AVAX: 'text-red-500',
    LINK: 'text-blue-300',
    UNI: 'text-pink-400',
    BCH: 'text-green-600',
    XLM: 'text-purple-400',
    VET: 'text-teal-500',
    DEFAULT: 'text-gray-300'
  };
  
  export const getCryptoIcon = (symbol) => {
    const icons = {
      BTC: <FaBitcoin />,
      ETH: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L11.8928 2.35781V16.0978L11.8928 16.2049L18.785 12.1468L12 2Z" fill="currentColor"/>
        <path d="M12 2L5.21496 12.1468L12 16.2049V9.56973V2Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M12 17.4729L11.9343 17.5534V22.7932L11.9343 22.9999L18.7893 13.4172L12 17.4729Z" fill="currentColor"/>
        <path d="M12 22.9999V17.4729L5.21496 13.4172L12 22.9999Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M12 16.2049L18.785 12.1468L12 9.56973V16.2049Z" fill="currentColor" fillOpacity="0.5"/>
        <path d="M5.21496 12.1468L12 16.2049V9.56973L5.21496 12.1468Z" fill="currentColor" fillOpacity="0.5"/>
      </svg>,
      USDT: <span className="text-sm font-bold">₮</span>,
      BNB: <span className="text-sm font-bold">B</span>,
      USDC: <span className="text-sm font-bold">C</span>,
      XRP: <span className="text-sm font-bold">X</span>,
      DEFAULT: <FaWallet />
    };
    return icons[symbol] || icons.DEFAULT;
  };