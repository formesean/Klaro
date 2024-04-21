import { cn } from "../lib/utils";

export default function Loading({ big }) {
  return (
    <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <div className="flex flex-col items-center justify-center space-y-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={big ? "40" : "24"}
          height={big ? "40" : "24"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    </div>
  );
}
