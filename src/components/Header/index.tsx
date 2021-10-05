import { Flex, useBreakpointValue } from "@chakra-ui/react";
import Logo from "./Logo";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

export default function Header() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      pt="4"
      boxShadow="sm"
      bg="white"
    >
      <Flex
        w="100%"
        maxW={1440}
        mx="auto"
        px="6"
        pb="4"
        align="center"
      >
        
        <Logo />

          <Flex
            align="center"
            ml="auto"
          >
            <Profile showProfileData={isWideVersion} />

          </Flex>

      </Flex>
      

    </Flex>
  )
}