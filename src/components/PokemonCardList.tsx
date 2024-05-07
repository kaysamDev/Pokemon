import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Image,
  ListItem,
  UnorderedList,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { EyeIcon } from "lucide-react";

import TrialImg from "../../img/images/trialImg.svg";

import useFetch from "../useFetch";
import PokemonModalBanner from "./PokemonModalBanner";
import Colorthief from "colorthief"

interface Pokemon {
  id: number;
  name: string;
  types: { name: string }[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export default function PokemonCardList({ selectedColor }: any) {
  const { data, isLoading, error, pokemonData } = useFetch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [pokemonColors, setPokemonColors] = useState<string[]>([]);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const extractColors = async () => {
      if (selectedPokemon) {
        const image = new Image();
        image.src = selectedPokemon.sprites.other.dream_world.front_default;
        image.onload = () => {
          const colorThief = new ColorThief();
          const colors = colorThief.getPalette(image, 5); // You can adjust the number of colors extracted
          setPokemonColors(
            colors.map(
              (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            )
          );
        };
      }
    };

    extractColors();
  }, [selectedPokemon]);
  
  const handleOpenDrawer = (id: any) => {
    const selected = pokemonData.find((pokemon) => pokemon.id === id);
    if (selected) {
      setSelectedPokemon(selected);
      onOpen();
    }
  };

  // console.log(selectedPokemon);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {pokemonData.map((pokemon: Pokemon, index: any) => (
        <Box
          bg="white"
          borderRadius="20px"
          minH="268px"
          className="drop-shadow-md group"
          key={index.id}
        >
          <Box
            bg="rgba(241, 241, 241, 1)"
            margin={2}
            borderRadius="15px"
            height="148px"
          >
            <Image
              src={pokemon.sprites.other.dream_world.front_default}
              alt="trial image"
              className="absolute left-0 right-0 mx-auto -top-4"
              width="170px"
              height="170px"
            />
          </Box>

          <h4>{pokemon.name}</h4>

          {/* <Box
            display="flex"
            alignItems="center"
            gap="4px"
            justifyContent="center"
          >
            {pokemon.types.map((type: any) => (
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
                key={type.name}
              >
                <Box>
                  <p>🔥</p>
                </Box>
                <Box>
                  <h5>{type.name}</h5>
                </Box>
              </Box>
            ))}
          </Box> */}

          {/* Drawer */}
          <Box mt="16px" mb="8px" className="group-hover:block hidden">
            <Button
              ref={btnRef}
              colorScheme="pink"
              onClick={() => handleOpenDrawer(pokemon.id)}
              rightIcon={<EyeIcon />}
              className={`text-white w-[90%] py-2 rounded-2xl
                    `}
              style={{ backgroundColor: `${selectedColor}` }}
            >
              View Pokemon
            </Button>

            {/* Drawer Placement */}
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody mt="8px">
                  <Tabs
                    variant="soft-rounded"
                    colorScheme="twitter"
                    size="sm"
                    height="100%"
                  >
                    {selectedPokemon && (
                      <TabPanels>
                        <TabPanel overflowY="auto" h="100vh" padding="0">
                          <PokemonModalBanner
                            selectedPokemon={selectedPokemon}
                            colors={pokemonColors}
                            onClose={onClose}
                          />
                          <Box>
                            <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                            <h4 className="text-center">About</h4>
                            <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                              <UnorderedList styleType="none" py="4px">
                                <Box className="text-[20px] flex items-center justify-center gap-4">
                                  <ListItem>Height</ListItem>
                                  <ListItem className="font-bold">
                                    {selectedPokemon.height}m
                                  </ListItem>
                                </Box>

                                <Box className="text-[20px] flex items-center justify-center gap-4">
                                  <ListItem>Weight</ListItem>
                                  <ListItem className="font-bold">
                                    {selectedPokemon.weight}kg
                                  </ListItem>
                                </Box>

                                <Box className="text-[20px] flex items-center justify-center gap-4 ml-[4.5rem]">
                                  <ListItem>Abilities</ListItem>
                                  <Box>
                                    <UnorderedList className="font-bold">
                                      {selectedPokemon.abilities.map(
                                        (ability: any) => (
                                          <ListItem key={ability.ability.name}>
                                            {ability.ability.name}
                                          </ListItem>
                                        )
                                      )}
                                      {/* <ListItem>overflow</ListItem>,
                                    <ListItem>chlorophyll</ListItem> */}
                                    </UnorderedList>
                                  </Box>
                                </Box>
                              </UnorderedList>
                            </Box>
                          </Box>
                        </TabPanel>

                        {/* Second Tab */}
                        <TabPanel overflowY="auto" h="100vh" padding="0">
                          <PokemonModalBanner
                            selectedPokemon={selectedPokemon}
                            colors={pokemonColors}
                            onClose={onClose}
                          />
                          <Box>
                            <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                            <h4 className="text-center">Stats</h4>
                            {selectedPokemon && (
                              <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                                <UnorderedList styleType="none" py="4px">
                                  {selectedPokemon.stats.map((i: any) => (
                                    <Box
                                      className="text-[18px] flex items-center justify-end gap-4"
                                      key={i.stat.name}
                                    >
                                      <ListItem className="capitalize">
                                        {i.stat.name}
                                      </ListItem>
                                      <ListItem className="font-bold">
                                        <progress
                                          value={i.base_stat}
                                          max={200}
                                          className="h-2 progress-bar"
                                        />
                                      </ListItem>
                                      <ListItem className="font-bold text-base">
                                        {i.base_stat}
                                      </ListItem>
                                    </Box>
                                  ))}
                                </UnorderedList>
                              </Box>
                            )}
                          </Box>
                        </TabPanel>
                        {/* Second Tab */}

                        {/* Third Tab */}
                        <TabPanel overflowY="auto" h="100vh" padding="0">
                          <PokemonModalBanner
                            selectedPokemon={selectedPokemon}
                            colors={pokemonColors}
                            onClose={onClose}
                          />
                          <Box>
                            <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                            <h4 className="text-center">Similar</h4>
                            <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                              <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
                                {data.results.map((i: any) => (
                                  <Box
                                    bg="white"
                                    borderRadius="20px"
                                    minW="210px"
                                    className="drop-shadow-md group"
                                    key={i}
                                  >
                                    <Box
                                      bg="rgba(241, 241, 241, 1)"
                                      margin="8px"
                                      borderRadius="15px"
                                      height="100px"
                                    >
                                      <Image
                                        src={TrialImg}
                                        width="137px"
                                        height="137px"
                                        alt="trial image"
                                        className="left-8 absolute -top-8"
                                      />
                                    </Box>
                                    <h4 className="text-center capitalize mb-2">
                                      charizard
                                    </h4>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        </TabPanel>
                        {/* Third Tab */}
                      </TabPanels>
                    )}

                    <TabList className="absolute left-28 bottom-0">
                      <Box
                        backgroundColor="#E9E9E9"
                        borderRadius="24px"
                        padding="8px"
                        display="flex"
                        justifyContent="center"
                      >
                        <Tab>About</Tab>
                        <Tab>Stats</Tab>
                        <Tab>Similar</Tab>
                      </Box>
                    </TabList>
                  </Tabs>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      ))}
    </>
  );
}