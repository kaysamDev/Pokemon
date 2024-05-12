import { useEffect, useState } from "react";

interface NameProps {
  size: number;
  selectedColor: string | void;
}
export default function Name({ size,selectedColor }: NameProps) {
  const [currentColor, setCurrentColor] = useState<string | void>(() => {
    return localStorage.getItem("selectedColor") || "#E85382";
  });

  useEffect(() => {
    setCurrentColor(currentColor);
  }, [selectedColor,currentColor]);

  return (
    <>
      <h1 className="py-4" style={{fontSize: `${size}`}}>
        Poké<span style={{ color: `${currentColor}` }}>book</span>
      </h1>
    </>
  );
}
