function Modal({ children, title, hideHeader, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="0" y1="0" x2="14" y2="14" />
            <line x1="0" y1="14" x2="14" y2="0" />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
