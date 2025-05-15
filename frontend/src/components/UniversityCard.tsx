import { Link } from "react-router-dom";
import { University } from "../types";
import {
  GlobeAltIcon,
  MapPinIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

interface UniversityCardProps {
  university: University;
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-[350px] flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start mb-4 h-20">
          {university.logo ? (
            <img
              src={university.logo}
              alt={`${university.name} Logo`}
              className="w-16 h-16 object-contain mr-4 flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full mr-4 flex-shrink-0">
              <BuildingLibraryIcon className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {university.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{university.city}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              university.type.toLowerCase().includes("devlet")
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {university.type}
          </span>

          {university.website && (
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              <GlobeAltIcon className="w-4 h-4 mr-1 flex-shrink-0" />
              Website
            </a>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-4 flex-grow">
          <p className="line-clamp-3">{university.address}</p>
        </div>

        <div className="text-sm text-gray-700 mb-4">
          <p>{university.faculties.length} Fakülte</p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link
            to={`/universities/${university.id}`}
            className="w-full block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
