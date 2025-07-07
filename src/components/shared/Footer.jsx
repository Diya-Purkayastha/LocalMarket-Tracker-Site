const Footer = () => {
  return (
    <footer className="bg-pink-600 text-white py-8 mt-16">
      <div className="container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-3xl">🛍️</span>
          <span>LocalMarket Tracker</span>
        </div>
        <div>
          <p>Contact: info@localmarket.com | +880123456789</p>
          <p className="text-sm mt-1">© 2025 LocalMarket Tracker. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-pink-300">📘</a>
          <a href="#" aria-label="Twitter" className="hover:text-pink-300">🐦</a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-300">📸</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
