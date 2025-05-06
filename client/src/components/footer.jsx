import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-800 to-slate-600 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-3">About HOMELAND</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Discover your dream home with HOMELAND. We help you find the perfect place with ease. Whether you're renting or buying, we have a wide selection of properties to suit every need.
          </p>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300">
            Email:{' '}
            <a
              href="mailto:support@homeland.com"
              className="text-green-400 hover:underline"
            >
              support@homeland.com
            </a>
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Phone:{' '}
            <a
              href="tel:+911234567890"
              className="text-green-400 hover:underline"
            >
              +91 1234 567 890
            </a>
          </p>
        </div>

        {/* Social Media Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} HOMELAND. All rights reserved.</p>
        <p>Crafted with love by the HOMELAND team.</p>
      </div>
    </footer>
  );
}
