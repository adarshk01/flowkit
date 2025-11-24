import { useState } from "react";

interface Btnprops {
  label: String;
  onClick: () => void;
}

export function Button({ label, onClick }: Btnprops) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="cursor-pointer relative inline-block"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={onClick}
    >
      <div
        className={
          "absolute inset-0 rounded-full bg-linear-to-b from-gray-200/80 to-white to-50% transition-opacity duration-300"
        }
        style={{ opacity: hover ? 0 : 1 }}
      />

      {/* White background */}
      <div
        className={
          "absolute inset-0 rounded-full bg-white transition-opacity duration-300"
        }
        style={{ opacity: hover ? 1 : 0 }}
      />
      <div
        className={`text-black relative   h-9 w-fit px-4 flex justify-center items-center rounded-full font-semibold tracking-tight`}
      >
        {label}
      </div>
    </div>
  );
}
