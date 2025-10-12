// src/components/ConfirmToast.jsx
import toast from 'react-hot-toast';

export const confirmDelete = (itemName, onConfirm) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <div>
        <p className="font-semibold text-white">Delete {itemName}?</p>
        <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
          className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
        >
          Delete
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  ), {
    duration: Infinity, // Won't auto-dismiss
    style: {
      background: '#1f2937',
      border: '2px solid #ef4444',
      minWidth: '300px',
    },
  });
};
