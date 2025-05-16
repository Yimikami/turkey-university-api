import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUniversityById } from "../services/api";
import { University } from "../types";
import FacultyList from "../components/FacultyList";
import {
  ArrowLeftIcon,
  GlobeAltIcon,
  MapPinIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const UniversityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getUniversityById(parseInt(id));
        setUniversity(data);
        setLoading(false);
      } catch (err) {
        setError("Üniversite bilgileri yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Hata!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!university) {
    return (
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">Üniversite bulunamadı.</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/universities"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Üniversitelere Dön
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            {university.logo ? (
              <img
                src={university.logo}
                alt={`${university.name} Logo`}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain mr-6 mb-4 md:mb-0 mx-auto md:mx-0"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 flex items-center justify-center rounded-full mr-6 mb-4 md:mb-0 mx-auto md:mx-0">
                <BuildingLibraryIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
              </div>
            )}

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
                {university.name}
              </h1>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    university.type.toLowerCase().includes("devlet")
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {university.type}
                </span>

                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  <span>{university.city}</span>
                </div>

                {university.website && (
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-2">Adres</h2>
            <p className="text-gray-700 mb-6">{university.address}</p>

            <FacultyList faculties={university.faculties} />
            <h2 className="text-xl font-semibold mb-2">Harita</h2>
            <div className="w-full">
              <iframe
                width="100%"
                height="600"
                src={`https://www.google.com/maps?f=q&source=s_q&hl=tr&geocode=&q=${university.address}&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
