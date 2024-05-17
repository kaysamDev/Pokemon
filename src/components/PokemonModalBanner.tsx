import { Box, Button, Image } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useColor } from 'color-thief-react'
import { lighten, darken } from "polished";
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
  const { data: dominantColor, loading } = useColor(selectedPokemon.sprites.other.dream_world.front_default, 'hex', {
    crossOrigin: 'anonymous'
  });
  
  const topColor = dominantColor ? lighten(0.2, dominantColor): "rgba(241, 241, 241, 1)";
  const bottomColor = dominantColor ? darken(0.2, dominantColor): "rgba(200, 200, 200, 1)"
  
  return (
    <>
      <Box borderRadius="15px" height="200px" position="relative"
      bgGradient={loading ? "linear(to-b, rgba(241, 241, 241, 1), rgba(200, 200, 200, 1))" : `linear(to-b, ${topColor}, ${bottomColor})`}
      >
        <Button size="sm" margin="16px" onClick={onClose} h="42px">
          <ArrowLeft />
        </Button>
      <Image
        src={selectedPokemon.sprites.other.dream_world.front_default}
        alt={selectedPokemon.name}
        className="absolute left-0 right-0 mx-auto -bottom-10"
        width="200px"
        height="200px"
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
