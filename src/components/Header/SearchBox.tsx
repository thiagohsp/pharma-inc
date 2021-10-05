import { Flex, Icon, Input, InputProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps extends InputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange, ...rest }: SearchBoxProps) {
  return (
    <Flex
      as="label"
      flex="1"
      py="4" px="4" ml="6"
      maxWidth={480}
      alignSelf="center"
      color="gray.600"
      pos="relative"
      bg="transparent"
      border="1px"
      borderColor="gray.100"
      borderRadius="lg"
      boxShadow="md"
    >
      <Input
        color="gray.700"
        variant="unstyled"
        px="4" mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.300' }}
        onChange={onChange || undefined}
        {...rest}
      />

      <Icon as={RiSearchLine} fontSize="20" />

    </Flex>
  )
}