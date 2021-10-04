import { Avatar, Box, Flex, Text, Icon, HStack} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { api } from "../../services/api";

interface ProfileProps {
  showProfileData?: boolean
}

export default function Profile({ showProfileData = true }: ProfileProps) {

  return (
    <Flex 
      align="center"
    >

      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color="gray.800">Thiago Pereira</Text>
          <Text color="gray.500" fontSize="x-small">thiago@pharma-inc.com</Text>          
        </Box>
      )}

      <Avatar size="md" name="Thiago Pereira" src="" />
      
    </Flex>
  )
}