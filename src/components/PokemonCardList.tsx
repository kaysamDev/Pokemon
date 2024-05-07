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
  TabPanel
} from "@chakra-ui/react";

import {EyeIcon} from "lucide-react";

import TrialImg from "../../img/images/trialImg.svg";

import useFetch from "../useFetch";
import React from "react";
import PokemonModalBanner from "./PokemonModalBanner";

export default function PokemonCardList({selectedColor}:any) {
  const { data, isLoading, error } = useFetch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  // console.log(data)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const c = ["", "", "", "", "", ""];
  const c2 = ["", "", ""];

  return (
    <>
      {c.map((i: any) => (
        <Box
          bg="white"
          borderRadius="20px"
          minH="268px"
          className="drop-shadow-md group"
        >
          <Box
            bg="rgba(241, 241, 241, 1)"
            margin={2}
            borderRadius="15px"
            height="148px"
          >
            <Image
              src={TrialImg}
              alt="trial image"
              className="absolute left-0 right-0 mx-auto -top-8"
            />
          </Box>

          <h4>charizard</h4>

          <Box
            display="flex"
            alignItems="center"
            gap="4px"
            justifyContent="center"
          >
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

          {/* Drawer */}
          <Box
            mt="16px"
            mb="8px"
            className="group-hover:block hidden"
          >
            <Button
            ref={btnRef}
            colorScheme="pink"
            onClick={onOpen}
            rightIcon={<EyeIcon />}
            className="bg-pink text-white w-[90%] py-2 rounded-2xl
                    "
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
                    <TabPanels>
                      <TabPanel overflowY="auto" h="100vh" padding="0">
                        <PokemonModalBanner onClose={onClose}/>
                        <Box>
                          <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                          <h4 className="text-center">About</h4>
                          <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                            <UnorderedList styleType="none" py="4px">
                              <Box className="text-[20px] flex items-center justify-center gap-4">
                                <ListItem>Height</ListItem>
                                <ListItem className="font-bold">1.0m</ListItem>
                              </Box>

                              <Box className="text-[20px] flex items-center justify-center gap-4">
                                <ListItem>Weight</ListItem>
                                <ListItem className="font-bold">
                                  13.0kg
                                </ListItem>
                              </Box>

                              <Box className="text-[20px] flex items-center justify-center gap-4 ml-[4.5rem]">
                                <ListItem>Height</ListItem>
                                <Box>
                                  <UnorderedList className="font-bold">
                                    <ListItem>overflow</ListItem>,
                                    <ListItem>chlorophyll</ListItem>
                                  </UnorderedList>
                                </Box>
                              </Box>
                            </UnorderedList>
                          </Box>
                        </Box>
                      </TabPanel>

                      {/* Second Tab */}
                      <TabPanel overflowY="auto" h="100vh" padding="0">
                        <PokemonModalBanner onClose={onClose}/>
                        <Box>
                          <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                          <h4 className="text-center">Stats</h4>
                          <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                            <UnorderedList styleType="none" py="4px">
                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>HP</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={60}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold text-base">
                                  60
                                </ListItem>
                              </Box>

                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>Attack</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={62}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold text-base">
                                  62
                                </ListItem>
                              </Box>

                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>Defense</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={63}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold text-base">
                                  63
                                </ListItem>
                              </Box>

                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>Special Attack</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={80}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold text-base">
                                  80
                                </ListItem>
                              </Box>

                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>Special Defense</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={80}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold text-base">
                                  80
                                </ListItem>
                              </Box>

                              <Box className="text-[18px] flex items-center justify-end gap-4">
                                <ListItem>Speed</ListItem>
                                <ListItem className="font-bold">
                                  <progress
                                    value={60}
                                    max={200}
                                    className="h-2 progress-bar"
                                  />
                                </ListItem>
                                <ListItem className="font-bold">60</ListItem>
                              </Box>
                            </UnorderedList>
                          </Box>
                        </Box>
                      </TabPanel>
                      {/* Second Tab */}

                      {/* Third Tab */}
                      <TabPanel overflowY="auto" h="100vh" padding="0">
                        <PokemonModalBanner onClose={onClose}/>
                        <Box>
                          <Box className="mt-4 h-[2px] bg-gradient-to-b from-white from-10% via-[#d2d2d2] via-[27%] to-white to-10%"></Box>
                          <h4 className="text-center">Similar</h4>
                          <Box className="mt-4 bg-gradient-to-r from-white from-100% via-[#d2d2d2] via-[6%] to-white to-100%">
                            <Box className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
                              {c2.map((i) => (
                                <Box
                                  bg="white"
                                  borderRadius="20px"
                                  minW="210px"
                                  className="drop-shadow-md group"
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
