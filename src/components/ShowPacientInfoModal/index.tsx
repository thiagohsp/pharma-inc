import {
  Button, ButtonGroup, Heading, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay,
  Stack, Avatar, Flex, Text
} from "@chakra-ui/react";
import {RiCalendarEventLine, RiFlagLine, RiGenderlessLine, RiHeartPulseLine, RiMailLine, RiMapPinLine, RiPhoneLine} from 'react-icons/ri'
import React from "react";
import { Pacient } from "../../hooks/usePacients";

interface ShowPacientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pacient: Pacient
}

export default function ShowPacientInfoModal({
  isOpen,
  onClose,
  pacient
}: ShowPacientInfoModalProps) {

  return (
    <>
      <Modal 
        size="xl"
        onClose={onClose} 
        isOpen={isOpen} 
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          boxShadow="md"
          borderRadius={16} 
          p={4}
        >
          <Flex
            alignItems="center"
            justifyContent="center" 
            marginTop="-5rem"
          >
            <Avatar 
              size="2xl" 
              border="4px solid white" 
              src={pacient?.picture}
            />
          </Flex>
          <ModalHeader
            borderBottom="1px solid lightgray"
            mb={4}
            pb={8}
          >
            <HStack>
              <RiHeartPulseLine size={32}/>
              <Heading 
                size="md" 
                fontWeight="normal"
              >
                Informações do Paciente
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text fontWeight="bold" fontSize="xl">{`${pacient?.name?.first} ${pacient?.name?.last} `}</Text>
              <HStack>
                <RiMapPinLine size={24}/>
                <Text>{`${pacient?.location?.street?.name}, ${pacient?.location?.street?.number}`}</Text>
              </HStack>
              <HStack>
                <RiFlagLine size={24}/>
                <Text>{`${pacient?.location?.city}, ${pacient?.location?.state} - ${pacient?.location?.country}`}</Text>
              </HStack>
              <HStack>
                <RiCalendarEventLine size={24}/>
                <Text>{pacient?.dob}</Text>
              </HStack>
              <HStack>
                <RiGenderlessLine size={24}/>
                <Text>{`${pacient?.gender === 'male' ? 'Masculino' : 'Feminino'}`}</Text>
              </HStack>
              <HStack>
                <RiPhoneLine size={24}/>
                <Text>{pacient?.phone}</Text>
              </HStack>
              <HStack>
                <RiMailLine size={24}/>
                <Text>{pacient?.email}</Text>
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
