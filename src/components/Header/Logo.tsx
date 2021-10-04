import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      color="gray.600"
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Pharma-inc
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>
  )
}