interface Props {
  // Reuse page navigation in footer CTA
  onNavigate: (page: string) => void;
}

export function CallToActionSection({ onNavigate }: Props) {
  return (
    <div className="bg-blue-600 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('clients')}
            className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            I'M LOOKING FOR DRIVERS
          </button>
          <button
            onClick={() => onNavigate('drivers')}
            className="bg-transparent text-white border-2 border-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-white hover:text-blue-600 transition-colors"
          >
            I'M LOOKING FOR A JOB
          </button>
        </div>
      </div>
    </div>
  );
}


