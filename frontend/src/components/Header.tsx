import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <AcademicCapIcon className="h-8 w-8" />
          <span>Türkiye Üniversiteleri</span>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/universities" className="hover:text-blue-200 transition-colors">
                Üniversiteler
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-blue-200 transition-colors">
                Arama
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
