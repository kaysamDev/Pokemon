import { Box } from "@chakra-ui/react";
import ToolBar from "../components/ToolBar";
import PokemonCardList from "../components/PokemonCardList";

export default function ListView() {

  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <ToolBar />
      </div>

      {/* Main list rendering */}
      <Box mt={146}>
        <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          <PokemonCardList/>
        </Box>
      </Box>
    </>
  );
}
