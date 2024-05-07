import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSearchClick= () => {
    navigate('/list-view')
  }
  return (
    <>
      <InputGroup className="mt-12">
        <Input placeholder="Enter pokemon name" borderRadius="60px" border="8px solid #E85382" focusBorderColor="#E85382" paddingY="2rem"/>
        <InputRightElement className="bg-pink rounded-full p-3 cursor-pointer mt-5 mr-4" onClick={handleSearchClick}>
          <Search color="white" width="20px" height="20px"/>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
