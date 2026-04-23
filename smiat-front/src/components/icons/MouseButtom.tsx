function MouseButtonIcon({ side }: { side: "left" | "right" | "middle" }) {
  return (
    <svg
      width="28"
      height="36"
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* mouse body */}
      <rect
        x="1"
        y="10"
        width="26"
        height="24"
        rx="8"
        className="stroke-gray-300 fill-gray-100"
        strokeWidth="1"
      />
      {/* divider */}
      <line
        x1="14"
        y1="10"
        x2="14"
        y2="24"
        className="stroke-gray-300"
        strokeWidth="1"
      />
      {/* scroll wheel */}
      <rect
        x="11"
        y="14"
        width="6"
        height="8"
        rx="3"
        className="stroke-gray-300 fill-white"
        strokeWidth="1"
      />
      {/* cable */}
      <line
        x1="14"
        y1="1"
        x2="14"
        y2="10"
        className="stroke-gray-300"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* highlighted button */}
      {side === "left" && (
        <path d="M2 18 Q2 10 14 10 L14 24 L2 24 Z" className="fill-gray-400" />
      )}
      {side === "right" && (
        <path
          d="M26 18 Q26 10 14 10 L14 24 L26 24 Z"
          className="fill-gray-400"
        />
      )}
      {side === "middle" && (
        <rect
          x="11"
          y="14"
          width="6"
          height="8"
          rx="3"
          className="fill-gray-400"
        />
      )}
    </svg>
  );
}

export default MouseButtonIcon;
