import * as React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="cursor-pointer">
      <svg
        width={155}
        height={48}
        viewBox="0 0 155 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x={0}
          y={32}
          fontFamily="'Fira Code', 'JetBrains Mono', 'Courier New', monospace"
          fontSize={18}
          fontWeight="bold"
          fill="#FFFFFF"
          letterSpacing={0.5}
        >
          {"STATE"}
          <tspan fill="#8B5CF6">{"OF"}</tspan>
          {"DEV"}
          <tspan fill="#A1A1AA" fontWeight="normal" fontSize={18}>
            {"_DZ"}
          </tspan>
        </text>
      </svg>
    </Link>
  );
}

export default Logo;
