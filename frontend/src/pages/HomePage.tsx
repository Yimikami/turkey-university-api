import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { AcademicCapIcon, BuildingLibraryIcon, MapPinIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'university' | 'faculty' | 'program'>('university');

  const handleSearch = (query: string) => {
    if (searchType === 'university') {
      navigate('/universities', { state: { searchQuery: query } });
    } else if (searchType === 'faculty') {
      navigate('/search', { state: { type: 'faculty', searchQuery: query } });
    } else if (searchType === 'program') {
      navigate('/search', { state: { type: 'program', searchQuery: query } });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Türkiye Üniversiteleri
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Türkiye'deki tüm üniversiteler, fakülteler ve programlar hakkında bilgi edinin
        </p>

        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setSearchType('university')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  searchType === 'university'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200`}
              >
                <BuildingLibraryIcon className="w-5 h-5 inline mr-1" />
                Üniversite
              </button>
              <button
                type="button"
                onClick={() => setSearchType('faculty')}
                className={`px-4 py-2 text-sm font-medium ${
                  searchType === 'faculty'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border-t border-b border-gray-200`}
              >
                <AcademicCapIcon className="w-5 h-5 inline mr-1" />
                Fakülte
              </button>
              <button
                type="button"
                onClick={() => setSearchType('program')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  searchType === 'program'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200`}
              >
                <MapPinIcon className="w-5 h-5 inline mr-1" />
                Program
              </button>
            </div>
          </div>

          <SearchBar
            onSearch={handleSearch}
            placeholder={
              searchType === 'university'
                ? 'Üniversite ara...'
                : searchType === 'faculty'
                ? 'Fakülte ara...'
                : 'Program ara...'
            }
            className="max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BuildingLibraryIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Üniversiteler</h3>
            <p className="text-gray-600 mb-4">
              Türkiye'deki tüm devlet ve vakıf üniversitelerini keşfedin
            </p>
            <button
              onClick={() => navigate('/universities')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Tümünü Gör
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <AcademicCapIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fakülteler</h3>
            <p className="text-gray-600 mb-4">
              Üniversitelerin fakülteleri hakkında detaylı bilgi alın
            </p>
            <button
              onClick={() => navigate('/search', { state: { type: 'faculty' } })}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Fakülteleri Ara
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPinIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Programlar</h3>
            <p className="text-gray-600 mb-4">
              Fakültelerin sunduğu eğitim programlarını inceleyin
            </p>
            <button
              onClick={() => navigate('/search', { state: { type: 'program' } })}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Programları Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
