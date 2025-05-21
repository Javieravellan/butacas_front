
const ErrorBubble = ({ message, onClose }: any) => {
  if (!message) return null;
    console.log("ErrorBubble", message);
  return (
    <div className="fixed top-4 right-4 z-50 ">
      <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-start max-w-xs">
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-2 text-white hover:text-red-200 focus:outline-none"
          aria-label="Cerrar mensaje"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorBubble;