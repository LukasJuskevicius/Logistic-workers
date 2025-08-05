// Simple vacancy card component
interface VacancyCardProps {
  vacancy: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    requirements?: string[];
    description: string;
  };
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {vacancy.title}
          </h3>
          <p className="text-gray-600 font-medium">{vacancy.company}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {vacancy.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Location:</span> {vacancy.location}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Salary:</span> {vacancy.salary}
        </p>
      </div>

      {vacancy.requirements && vacancy.requirements.length > 0 && (
        <div className="mb-4">
          <p className="font-medium text-gray-700 mb-2">Requirements:</p>
          <div className="flex flex-wrap gap-2">
            {vacancy.requirements.map((req, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-600 mb-4">{vacancy.description}</p>

      <div className="flex justify-between items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Apply Now
        </button>
        <button className="text-blue-600 hover:text-blue-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}