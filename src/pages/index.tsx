import { Box, Flex, Heading, IconButton, Spinner, Table, Tbody, Td, Th, Thead, Tr , Text} from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState, UIEvent, ChangeEvent } from 'react'
import { RiDeleteBin2Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri'
import Header from '../components/Header'
import SearchBox from '../components/Header/SearchBox'
import ShowPacientInfoModal from '../components/ShowPacientInfoModal'
import { getPacientsList, Pacient } from '../hooks/usePacients'
import { api } from '../services/api'

interface PacientListProps {
  pacients: Pacient[]
}

export default function PacientsList({ pacients = [] }: PacientListProps) {

  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ pacientList, setPacientList ] = useState<Pacient[]>(pacients)
  const [ pacient, setPacient ] = useState<Pacient>({} as Pacient)
  const [ filter, setFilter ] = useState<string>()
  const [ isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadPacients() {
      if (page > 1) {
        getPacientsList(page).then((response) => {
          setPacientList((prevList) => {
            return [...prevList, ...response]
          })
          setIsLoading(false)
        })
      }
    }
    
    loadPacients();
    
  }, [page]);

  const checkName = (name: string, str: string) => {
    const pattern = str.split("").map((x)=>{
        return `(?=.*${x})`
    }).join("");
    var regex = new RegExp(`${pattern}`, "g")
    return name.match(regex);
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const isBottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
    if (isBottom) { 
      setIsLoading(true);
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

  const handleOpenModal = (pacient: Pacient) => {
    setPacient(pacient);
    setIsOpen(true);
  }

  return (
    <>
      <Head>
        <title>Home | Pharma-inc.</title>
      </Head>

      { pacient && 
        <ShowPacientInfoModal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pacient={pacient}
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

            <SearchBox 
              onChange={handleSearch}
            />

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
            {pacientList && (
              <Table
                colorScheme="whiteAlpha"
                fontSize="sm"
              >
                <Thead>
                  <Tr 
                    bg="gray.50"
                  >
                    <Th>Nome</Th>
                    <Th>Gênero</Th>
                    <Th>Data de Nascimento</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pacientList.filter((pacient) =>
                    filter ?
                      pacient.name.first
                        .concat(pacient.name.last)
                        .toLowerCase()
                        .includes(
                          filter.toLowerCase()
                        ) || checkName(pacient.name.first.concat(pacient.name.last), filter)
                      : true
                    ).map((item) => (
                    <Tr key={`${item.name.first} ${item.name.last}`} borderBlock="2px" borderColor="gray.200" >
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
                  ))}
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
              { isLoading && (
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
              ) }
            
            </Flex>

          </Box>

        </Box>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pacients: Pacient[] = await getPacientsList(1);
  
  return {
    props: {
      pacients
    }
  }
}