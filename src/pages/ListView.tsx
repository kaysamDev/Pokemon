import { Box } from "@chakra-ui/react";
import ToolBar from "../components/ToolBar";
import PokemonCardList from "../components/PokemonCardList";
import { useState } from "react";

export default function ListView() {
  const [selectedColor, setSelectedColor] = useState(() => {
    return localStorage.getItem("selectedColor") || "#E85382";
  });

  const hexColors = ["#E85382", "#39BADF", "#E1A725"];

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    localStorage.setItem("selectedColor", color);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <ToolBar
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          hexColors={hexColors}
        />
      </div>

      {/* Main list rendering */}
      <Box mt={146}>
        <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          <PokemonCardList selectedColor={selectedColor} />
        </Box>
      </Box>
    </>
  );
}
