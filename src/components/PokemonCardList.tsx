import React, { useState } from "react";
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
  Select,
} from "@chakra-ui/react";

import { ChevronLeft, ChevronRight, EyeIcon } from "lucide-react";

import useFetch from "../hooks/useFetch";
import PokemonModalBanner from "./PokemonModalBanner";
import { pokemon } from "../..";
import { ThemeColorProps } from "../..";


export default function PokemonCardList({ selectedColor }: ThemeColorProps) {
  const { isLoading, error, pokemonData } = useFetch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<pokemon>();
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  // Handle change in items per page
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleOpenDrawer = async (id: number) => {
    const selected = pokemonData.find((pokemon) => pokemon.id === id);
    if (selected) {
      setSelectedPokemon(selected);
      onOpen();
    }
  };


  // Calculate total number of pages
  const totalPages = Math.ceil(pokemonData.length / itemsPerPage);

  // Filter pokemon data based on current page
  const paginatedPokemonData = pokemonData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Array of page numbers for pagination buttons
  const pageNumbers = Array.from(Array(totalPages).keys()).map(
    (num) => num + 1
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
        {paginatedPokemonData.map((pokemon: pokemon) => (
          <Box
            bg="white"
            borderRadius="20px"
            minH="268px"
            className="drop-shadow-md group"
            key={pokemon.id}
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

            {/* Drawer */}
            <Box mt="16px" mb="8px" className="group-hover:block hidden">
              <Button
                ref={btnRef}
                colorScheme="pink"
                onClick={() => handleOpenDrawer(pokemon.id)}
                rightIcon={<EyeIcon />}
                iconSpacing={24}
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
                                          (ability) => (
                                            <ListItem
                                              key={ability.ability.name}
                                            >
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
                              onClose={onClose}
                            />
                            <Box>
                              <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                              <h4 className="text-center">Stats</h4>
                              {selectedPokemon && (
                                <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                                  <UnorderedList styleType="none" py="4px">
                                    {selectedPokemon.stats.map((i) => (
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
                              onClose={onClose}
                            />
                            <Box>
                              <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                              <h4 className="text-center">Similar</h4>
                              <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                                <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14"></Box>
                              </Box>
                            </Box>
                          </TabPanel>
                          {/* Third Tab */}
                        </TabPanels>
                      )}

                      <TabList className="absolute left-[25%] right-[25%] bottom-0">
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
      </Box>

      {/* Pagination UI */}
      <Box mt="40px" display="flex" justifyContent="space-between">
        <Box>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            mr="10px"
          >
            <ChevronLeft/>
          </Button>
          <>
            {pageNumbers.map((number, index) => (
              <>
                {index < 5 && (
                  <Button
                  
                    onClick={() => setCurrentPage(number)}
                    style={{
                      backgroundColor: selectedColor ?
                        (number === currentPage ? selectedColor : "#E9E9E9") : undefined
                    }}
                    mr="10px"
                  >
                    {number}
                  </Button>
                )}
                {index === 10 && pageNumbers.length > 10 && (
                  <Button isDisabled mr="10px">
                    ...
                  </Button>
                )}
                {index > pageNumbers.length - 3 && (
                  <Button
                    onClick={() => setCurrentPage(number)}
                    style={{
                      backgroundColor: selectedColor ?
                        (number === currentPage ? selectedColor : "#E9E9E9") : undefined
                    }}
                    mr="10px"
                  >
                    {number}
                  </Button>
                )}
              </>
            ))}
          </>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            ml="10px"
          >
            <ChevronRight/>
          </Button>
        </Box>

        <Box>
          <Select
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Select>
        </Box>
      </Box>
    </>
  );
}