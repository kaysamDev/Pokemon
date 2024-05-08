import { Box } from "@chakra-ui/react";
import ToolBar from "../components/ToolBar";
import PokemonCardList from "../components/PokemonCardList";
import { useState } from "react";
// import { ThemeColorProps } from "../..";

export default function ListView() {
  const [selectedColor, setSelectedColor] = useState<string | void>(() => {
    return localStorage.getItem("selectedColor") || "#E85382";
  });
  
  const hexColors = ["#E85382", "#39BADF", "#E1A725"];

  const handleColorChange = (color: string) => {
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
        <Box>
          <PokemonCardList selectedColor={selectedColor}/>
        </Box>
      </Box>
    </>
  );
}
