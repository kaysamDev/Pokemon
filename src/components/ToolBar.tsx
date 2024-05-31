import { Link } from "react-router-dom";
import Logo from "./Logo";
import Name from "./Name";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { Key, useEffect } from "react";
import Home from "../pages/Home";

interface ToolBarProps {
  selectedColor: string | void
  handleColorChange: (color: string) => void
  hexColors: string[]
}

export default function ToolBar({selectedColor, handleColorChange, hexColors}:ToolBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  useEffect(() => {
    if (selectedColor) {
      document.documentElement.style.setProperty("--selected-color", selectedColor);
    }
  }, [selectedColor]);

  return (
    <>
      <nav className="bg-white/50 drop-shadow-md">
        <div className="flex items-center justify-between container">
          <div className="md:relative top-4 left-8 m-3 md:m-0">
            <Link to="/home" className="flex items-start gap-2 md:gap-4 max-sm:w-12">
              <Logo width={129} height={40}/>
              <div className="max-sm:hidden">
                <Name size={24} selectedColor={selectedColor}/>
              </div>
            </Link>
          </div>

          <div>
            <InputGroup>
              <Input
                placeholder="Enter pokemon name"
                maxWidth="440px"
                paddingX="12px"
                borderRadius="60px"
                className="
                border border-gray-500
                focus:outline-none bg-transparent
                "
              />
              <InputLeftElement>
                <Search color="#d2d2d2" width="20px" height="20px" />
              </InputLeftElement>
            </InputGroup>
          </div>

          <div className="rounded-full border border-blue-500 p-1">
            <div
              className={`w-8 max-w-full aspect-square rounded-full`}
              style={{backgroundColor: `${selectedColor}`}}
              onClick={onOpen}
            ></div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose Theme</ModalHeader>
              <ModalBody className="bg-gray-300">
                <Box className="flex justify-center items-center gap-4">
                {hexColors.map((color: string, index: Key | null | undefined) => (
                  <Box
                  key={index}
                  className="rounded-full border border-blue-500 p-1"
                  >
                      <div
                        className={`w-[70px] max-w-full aspect-square rounded-full`}
                        style={{backgroundColor: `${color}`}}
                        onClick={() => handleColorChange(color)}
                      ></div>
                    </Box>
                  ))}
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
        <div className="hidden">
          <Home selectedColor={selectedColor}/>
        </div>
      </nav>
    </>
  );
}
