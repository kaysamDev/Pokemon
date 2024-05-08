import { Box, Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";

interface Props{
  selectedPokemon: {
    name: string
    sprites: {
      other: {
        dream_world: {
          front_default: string
        }
      }
    }
  }
  onClose: ()=>void
}

export default function PokemonModalBanner({onClose, selectedPokemon}:Props) {
  
  return (
    <>
      <Box bg="blue" borderRadius="15px" height="200px" position="relative">
        <Button size="sm" margin="16px" onClick={onClose} h="42px">
          <ArrowLeft />
        </Button>
        <img
          src={selectedPokemon.sprites.other.dream_world.front_default}
          alt="trial image"
          width={200}
          className="absolute left-0 right-0 mx-auto -bottom-10"
        />
      </Box>

      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="4px"
        justifyContent="center"
        mt="32px"
      >
        <h3>{selectedPokemon.name}</h3>
      </Box>
    </>
  );
}
