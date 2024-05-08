import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ColorProps {
  selectedColor: string | void
}

export default function SearchBar({selectedColor}:ColorProps) {
  const navigate = useNavigate();
  const [currentColor, setCurrentColor] = useState<string | void>(() => {
    return localStorage.getItem("selectedColor") || "#E85382";
  });
  
  const handleSearchClick = () => {
    navigate('/list-view')
  }

  useEffect(()=>{
    setCurrentColor(selectedColor)
  },[selectedColor])
  return (
    <>
      <InputGroup className="mt-12">
        <Input placeholder="Enter pokemon name" borderRadius="60px" border="8px solid #E85382" focusBorderColor="white" paddingY="2rem" style={{borderColor: `${currentColor}`}}/>
        <InputRightElement className="rounded-full p-3 cursor-pointer mt-5 mr-4" onClick={handleSearchClick} style={{backgroundColor: `${currentColor}`}}>
          <Search color="white" width="20px" height="20px"/>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
