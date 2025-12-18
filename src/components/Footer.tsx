import {
  Facebook,
  Instagram,
  MailIcon,
  MapPin,
  MountainSnow,
  PhoneIcon,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <MountainSnow className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NivaasHub</span>
            </div>
            <p className="text-gray-500 mb-6">
              The most reliable platform to rent a room, flat, or find a
              roommate in Kathmandu. Slowly growing{" "}
              <span className="text-red-500">nationwide</span>.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Browse Rooms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Browse Flats
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Browse Houses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  List Your Property
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition"
                >
                  Find a Roommate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-bold mb-6">Reach us at</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-500">
                <MapPin className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
                Dekocha, Bhaktapur,
                <br />
                Bagmati Province, Nepal
              </li>
              <li className="flex items-center text-gray-500">
                <PhoneIcon className="w-5 h-5 mr-3 text-indigo-600" />
                +977 986XXXXXXX
              </li>
              <li className="flex items-center text-gray-500">
                <MailIcon className="w-5 h-5 mr-3 text-indigo-600" />
                mailme@nivaashub.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NivaasHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
