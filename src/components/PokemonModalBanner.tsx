import { Box, Button, Image } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";

import TrialImg from "../../img/images/trialImg.svg";

export default function PokemonModalBanner({onClose}:any) {
  return (
    <>
      <Box bg="blue" borderRadius="15px" height="200px" position="relative">
        <Button size="sm" margin="16px" onClick={onClose} h="42px">
          <ArrowLeft />
        </Button>
        <Image
          src={TrialImg}
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
        <h3>charizard</h3>
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          paddingY="4px"
          paddingX="12px"
          bg="rgba(241, 241, 241, 1)"
          borderRadius="40px"
          minW="50px"
          mt="12px"
        >
          <Box>
            <p>🔥</p>
          </Box>
          <Box>
            <p>fire</p>
          </Box>
        </Box>
      </Box>
    </>
  );
}
