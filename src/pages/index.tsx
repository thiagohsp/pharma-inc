import { Box, Flex, Heading, IconButton, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, Select, Button } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState, UIEvent, ChangeEvent, useContext } from 'react'
import { RiDeleteBin2Line, RiEdit2Line, RiEyeLine, RiFilter2Line } from 'react-icons/ri'
import GenderFilter from '../components/GenderFilter'
import Header from '../components/Header'
import SearchBox from '../components/Header/SearchBox'
import ShowPatientInfoModal from '../components/ShowPatientInfoModal'
import { PatientContext } from '../contexts/PatientContext'
import { getPatientsList, Patient } from '../hooks/usePatients'

enum Gender {
  Male = 'male',
  Female = 'female'
}

type PerPageValues = 50 | 25 | 10| 5

export default function PatientsList() {

  const { getPatientsList, patientList, isLoading } = useContext(PatientContext);
  
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPageValues>(50);
  const [patient, setPatient] = useState<Patient>({} as Patient)
  const [genderFilter, setGenderFilter] = useState<string[]>([Gender.Male , Gender.Female])
  const [filter, setFilter] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadPatients() {
      getPatientsList({page, perPage})
    }

    loadPatients();

  }, [page]);

  const checkName = (name: string, str: string) => {
    const pattern = str.split("").map((x) => {
      return `(?=.*${x})`
    }).join("");
    var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const isBottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
    if (isBottom) {
      setPage((actualPage) => actualPage + 1)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setFilter(event.target.value);
    } else {
      setFilter('')
    }
  }

  const handleGenderFilter = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    
    const genders = [...genderFilter ]
      .filter((item) => item !== event.target.name);
    
    if (event.target.checked) {
      genders.push(event.target.name)
    }

    setGenderFilter(genders)
  }

  const handleOpenModal = (patient: Patient) => {
    setPatient(patient);
    setIsOpen(true);
  }

  return (
    <>
      <Head>
        <title>Home | Pharma-inc.</title>
      </Head>

      {patient &&
        <ShowPatientInfoModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          patient={patient}
        />
      }

      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1120}
        mx="auto"
        px="6"
        color="gray.700"
      >
        <Box
          flex="1"
          p="8"
          bg="white"
          borderRadius="lg"
          border="1px"
          borderColor="gray.100"
          boxShadow="lg"
        >

          <Flex
            alignItems="center"
            justifyContent="space-between"
          >

            <Heading size="md" fontWeight="bold" >
              Pacientes
            </Heading>

            <Flex
              flex={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <SearchBox
                value={filter}
                onChange={handleSearch}
              />

              <Select
                name="per_page"
                size="lg"
                w="300px"
                ml={4}
                onChange={(event) => {
                  setPerPage(Number(event.target.value) as PerPageValues)
                }}
              >
                <option value={50}>50 registros</option>
                <option value={25}>25 registros</option>
                <option value={10}>10 registros</option>
                <option value={5}>5 registros</option>
              </Select>

            </Flex>

          </Flex>
          <Box
            mt={8}
            h="600px"
            overflowY="scroll"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f0f0f0',
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'lightgray',
                borderRadius: '24px',
              },
            }}
            onScroll={handleScroll}>

            {patientList && (
              <Table
                colorScheme="whiteAlpha"
                fontSize="sm"
              >
                <Thead>
                  <Tr
                    bg="gray.50"
                  >
                    <Th>Nome</Th>
                    <Th>
                      <GenderFilter
                        genders={{
                          male: genderFilter.includes(Gender.Male), 
                          female: genderFilter.includes(Gender.Female)
                        }}
                        onChange={handleGenderFilter}
                      />                  
                    </Th>
                    <Th>Data de Nascimento</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {patientList
                    .filter((patient) => 
                      genderFilter.includes(patient.gender))
                    .filter((patient) =>
                      filter ?
                        patient.name.first
                          .concat(patient.name.last)
                          .toLowerCase()
                          .includes(
                            filter.toLowerCase()
                          ) || checkName(patient.name.first.concat(patient.name.last), filter)
                        : true
                    ).map((item) => (
                      <Tr key={item.login.id} borderBlock="2px" borderColor="gray.200" >
                        <Td>{`${item.name.first} ${item.name.last}`}</Td>
                        <Td>{item.gender === 'male' ? 'Masculino' : 'Feminino'}</Td>
                        <Td>{item.dob}</Td>
                        <Td>
                          <IconButton
                            color="gray.500"
                            aria-label="Visualizar"
                            icon={<RiEyeLine />}
                            onClick={() => handleOpenModal(item)}
                          />
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            )}

            <Flex
              alignItems="center"
              justifyContent="center"
              mt={8}
              mb={10}
              p={4}
            >
              {isLoading && (
                <>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                    mx={8}
                  />
                  <Text color="gray.400">Loading more...</Text>
                </>
              )}

            </Flex>

          </Box>

        </Box>
      </Flex>
    </>
  )
}
