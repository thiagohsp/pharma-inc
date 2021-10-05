import {
  Avatar, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay,
  Stack, Text
} from "@chakra-ui/react";
import React from "react";
import { RiCalendarEventLine, RiFlagLine, RiGenderlessLine, RiHeartPulseLine, RiMailLine, RiMapPinLine, RiPhoneLine, RiShareLine } from 'react-icons/ri';
import { Patient } from "../../hooks/usePatients";

interface ShowPatientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient
}

export default function ShowPatientInfoModal({
  isOpen,
  onClose,
  patient
}: ShowPatientInfoModalProps) {

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
              src={patient?.picture}
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
                Informações do Patiente
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text fontWeight="bold" fontSize="xl">{`${patient?.name?.first} ${patient?.name?.last} `}</Text>
              <HStack>
                <RiMapPinLine size={24}/>
                <Text>{`${patient?.location?.street?.name}, ${patient?.location?.street?.number}`}</Text>
              </HStack>
              <HStack>
                <RiFlagLine size={24}/>
                <Text>{`${patient?.location?.city}, ${patient?.location?.state} - ${patient?.location?.country}`}</Text>
              </HStack>
              <HStack>
                <RiCalendarEventLine size={24}/>
                <Text>{patient?.dob}</Text>
              </HStack>
              <HStack>
                <RiGenderlessLine size={24}/>
                <Text>{`${patient?.gender === 'male' ? 'Masculino' : 'Feminino'}`}</Text>
              </HStack>
              <HStack>
                <RiPhoneLine size={24}/>
                <Text>{patient?.phone}</Text>
              </HStack>
              <HStack>
                <RiMailLine size={24}/>
                <Text>{patient?.email}</Text>
              </HStack>
              <HStack>
                <RiShareLine size={24}/>
                <Text>{patient?.login?.url}</Text>
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
