const CircularProgress = ({ progress = 0, size = 47, strokeWidth = 6 }) => {
  // SVG Math
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate the offset: 0% means full circumference, 100% means 0 offset
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]" // Start the progress from the top
      >
        {/* Background Circle (The "Empty" track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-white"
        />
        {/* Progress Circle (The "Filled" track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
          strokeLinecap="round"
          className="text-brand-primary"
        />
      </svg>

      {/* Percentage Text */}
      <span className="font-primary absolute text-xs font-bold text-white">
        {progress}%
      </span>
    </div>
  );
};

export default CircularProgress;
