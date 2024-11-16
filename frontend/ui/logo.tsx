import React from "react";

const Logo = ({
  size = 24,
  isGradient = false,
}: {
  size?: number;
  isGradient?: boolean;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isGradient && (
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#F7F2FF", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#998CB8", stopOpacity: 0.75 }}
            />
          </linearGradient>
        </defs>
      )}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.4166 309.289C32.7239 384.713 7.52218 468.677 1.14023 555.565C-0.324576 575.508 -1.05698 585.479 5.47027 592.503C11.9975 599.527 22.5077 599.527 43.5282 599.527H288.102C294.543 599.527 299.74 594.304 299.991 587.868V587.868V587.868C300.262 594.564 305.669 599.999 312.371 599.999L556.472 599.999C577.492 599.999 588.003 599.999 594.53 592.975C601.057 585.95 600.325 575.979 598.86 556.036C592.454 468.832 567.092 384.571 525.126 308.935C535.327 306.309 545.684 304.215 556.157 302.67C578.256 299.41 589.306 297.78 594.653 291.586C600 285.393 600 275.413 600 255.455L600 43.3823C600 22.3622 600 11.8522 592.977 5.32501C585.954 -1.20213 575.981 -0.470863 556.037 0.991661C465.229 7.6507 377.611 34.8327 299.591 79.8849C221.776 35.1147 134.453 8.09924 43.9629 1.46346C24.0187 0.000929584 14.0466 -0.730336 7.02334 5.7968C3.19657e-05 12.3239 3.05867e-05 22.834 2.78288e-05 43.8542L3.66319e-09 255.927C-2.61499e-06 275.885 -3.92432e-06 285.864 5.34714 292.058C10.6943 298.252 21.7439 299.882 43.8432 303.142C54.1593 304.664 64.3635 306.718 74.4166 309.289ZM74.4166 309.289C126.156 322.521 173.894 349.432 212.299 387.816C265.736 441.224 296.95 512.693 299.991 587.868C302.92 512.52 334.152 440.864 387.701 387.344C425.993 349.074 473.562 322.208 525.126 308.935C498.23 260.46 464.514 215.527 424.598 175.632C386.987 138.042 344.901 105.954 299.591 79.8849C254.592 105.869 212.787 137.797 175.402 175.161C135.26 215.282 101.388 260.498 74.4166 309.289Z"
        fill={isGradient ? "url(#grad1)" : "currentColor"}
      />
    </svg>
  );
};

export default Logo;