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
    url: string;
  }  
}

export async function getPatientsList(page: number): Promise<Patient[]> {
  return api.get('/', {
    params: {
      page
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
  })
}


/**
 * 

  picture.medium: Imagem
  name.first name.last Nome completo
  email: Email
  gender: Gênero
  dob.date: Data de nascimento
  phone: Telefone
  location.country: Nacionalidade
  location.street: Endereço
  login.uuid: ID (Número de identificação)
  login.username: URL para compartilhamento
*
**/