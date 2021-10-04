import axios from "axios";

export const api = axios.create({
  baseURL: 'https://randomuser.me/api',
  params: {
    results: 50,
    nat: 'br',
    seed: 'pharmainc'
  }
})