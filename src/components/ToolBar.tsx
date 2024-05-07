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
import { useState } from "react";

export default function ToolBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedColor, setSelectedColor] = useState("pink");
  
  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    onClose();
  };

  return (
    <>
      <nav className="bg-white/50 drop-shadow-md">
        <div className="flex items-center justify-between container">
          <div className="relative top-4 left-8">
            <Link to="/home" className="flex items-start gap-4">
              <Logo width={129} />
              <Name size={24} selectedColor={selectedColor}/>
            </Link>
          </div>

          <div>
            <InputGroup>
              <Input
                placeholder="Enter pokemon name"
                maxWidth="440px"
                padding="12px"
                className="
                border border-gray-500 rounded-[60px] placeholder:pl-8
                focus:outline-none
                "
              />
              <InputLeftElement className="p-3">
                <Search color="#d2d2d2" width="20px" height="20px" />
              </InputLeftElement>
            </InputGroup>
          </div>

          <div className="rounded-full border border-blue-500 p-1">
            <div
              className={`w-8 max-w-full aspect-square rounded-full bg-${selectedColor}`}
              onClick={onOpen}
            ></div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose Theme</ModalHeader>
              <ModalBody className="bg-gray-300">
                <Box className="flex justify-center items-center gap-4">
                  <Box className="rounded-full border border-blue-500 p-1">
                    <div className="w-[70px] max-w-full aspect-square rounded-full bg-pink" onClick={() =>handleColorChange("pink")}></div>
                  </Box>
                  <Box>
                    <div className="w-[70px] max-w-full aspect-square rounded-full bg-blue" onClick={() =>handleColorChange("blue")}></div>
                  </Box>
                  <Box>
                    <div className="w-[70px] max-w-full aspect-square rounded-full bg-yellow" onClick={() =>handleColorChange("yellow")}></div>
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </nav>
    </>
  );
}
