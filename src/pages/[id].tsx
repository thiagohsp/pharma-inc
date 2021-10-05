import type { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next'
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import ShowPatientInfoModal from '../components/ShowPatientInfoModal'
import { PatientContext } from '../contexts/PatientContext';
import { Patient } from '../hooks/usePatients';
import { api } from '../services/api';


export default function PatientsInfo({ id }: any) {

  const { getPatientsList, patientList, clearList} = useContext(PatientContext)
  const [isOpen, setIsOpen] = useState(true);
  const [patient, setPatient] = useState<Patient>({} as Patient);

  useEffect(() => {
    getPatientsList({ page: 1, perPage: undefined }).then((result) => {
      console.log(result)
      return result.filter((patient) => patient?.login?.url === `/${id}` )[0]
    }).then((patient) => {
      console.log(patient)
      setPatient(patient)
    });

    return () => {
      clearList();
    }
  }, [id])

  const handleClose = () => {
    clearList();
    Router.push('/')
  }
  return (
    <ShowPatientInfoModal
      isOpen={isOpen}
      onClose={handleClose}
      patient={patient}
    />
  )
  
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
  const { id } = props.query
  return {
    props: {
      id
    }
  }
}
