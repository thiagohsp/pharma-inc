import { AxiosRequestConfig } from "axios";
import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

export type Patient = {
  gender: 'male' | 'female';
  name: {
    first: string;
    last: string;
  },
  dob: string;
  picture: string;
  email: string;
  phone: string;
  location: {
    street: {
      name: string;
      number: number;
    };
    city: string;
    state: string;
    country: string;
  };
  login: {
    id: string;
    username: string;
    url: string;
  }
}

interface GetPatientsProps {
  page: number;
  perPage?: number;
  params?: AxiosRequestConfig;
}

type PatientContextData = {
  patientList: Patient[];
  getPatientsList(props: GetPatientsProps): Promise<Patient[]>;
  clearList: () => void
  isLoading: boolean;
}

type PatientProviderProps = {
  children: ReactNode;
}

export const PatientContext = createContext({} as PatientContextData);

export function PatientProvider({ children }: PatientProviderProps) {

  const [patientList, setPatientList] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function clearList() {
    setPatientList([])
  }

  async function getPatientsList({ page, perPage = 50, params }: GetPatientsProps): Promise<Patient[]> {
    
    setIsLoading(true);

    const patients = await api.get('/', {
      params: {
        page,
        results: perPage,
        ...params
      }
    }).then((response) => {
      return response.data?.results?.map((patient: any) => {
        return {
          ...patient,
          picture: patient.picture.medium,
          dob: new Date(patient.dob.date).toLocaleDateString('pt-BR', {
            dateStyle: 'short'
          }),
          login: {
            id: patient.login.uuid,
            url: `/${patient.login.username}`
          }
        }
      })
    });

    setPatientList((prevState) => [...prevState, ...patients]);

    setIsLoading(false);

    return patients
  }

  return (
    <PatientContext.Provider value={{ getPatientsList, patientList, isLoading, clearList }}>
      {children}
    </PatientContext.Provider>
  )
}