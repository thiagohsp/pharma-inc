import { api } from "../services/api";

export type Pacient = {
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

export async function getPacientsList(page: number): Promise<Pacient[]> {
  return api.get('/', {
    params: {
      page
    }
  }).then((response) => {
    return response.data?.results?.map((pacient: any) => {
      return {
        ...pacient,
        picture: pacient.picture.medium,
        dob: new Date(pacient.dob.date).toLocaleDateString('pt-BR', {
          dateStyle: 'short'
        }),
        login: {
          id: pacient.login.uuid,
          url: `/${pacient.login.username}`
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