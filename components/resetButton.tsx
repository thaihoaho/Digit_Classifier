// import React from "react";

// export default function ResetButton({ onReset }: { onReset: () => void }) {
//   return (
//     <button
//       onClick={onReset}
//       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//     >
//       Reset
//     </button>
//   );
// }

import React from "react";

export default function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      onClick={onReset}
      className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-600 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          d="M3 6L5 6L21 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M19 6L18.5 20H5.5L5 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M10 11V17"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
        <path
          d="M14 11V17"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </button>
  );
}
