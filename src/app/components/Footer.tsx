// src/components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mt-10 py-4">
        <div className="max-w-6xl mx-auto text-center text-sm">
          © {new Date().getFullYear()} ProductFinder by Malahima. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  