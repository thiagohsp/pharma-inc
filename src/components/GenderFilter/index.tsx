import { PopoverProps, Text, Button, Checkbox, FormControl, FormLabel, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Switch } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { RiFilter3Fill, RiFilter3Line, RiFilterFill, RiFilterLine, RiFilterOffLine } from 'react-icons/ri';

interface GenderFilterProps extends PopoverProps {
  genders: {
    male: boolean;
    female: boolean;
  },
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const GenderFilter = ({ genders = {female: true, male: true}, onChange, ...rest }: GenderFilterProps) => {
  return (
    <Popover {...rest}>
      <PopoverTrigger>
        <Button 
          w="100%"
          justifyContent="space-between"
          pl={2}
          variant="ghost" 
          rightIcon={(genders.male && genders.female) ? <RiFilterOffLine size={16}/> : <RiFilterFill size={16}/>}
          fontSize="xs"
        >GENERO</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Filtrar</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textTransform="capitalize">
          <Stack
            my={4}
            spacing={4}
            fontWeight="normal"
            fontSize="md"
          >
            <HStack alignItems="center">
              <Text flex={1}>
                Masculino
              </Text>
              <Switch name="male" defaultChecked={genders.male} onChange={onChange} />
            </HStack>
            <HStack alignItems="center">
              <Text flex={1}>
                Feminino
              </Text>
              <Switch name="female" defaultChecked={genders.female} onChange={onChange} />
            </HStack>            
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default GenderFilter;