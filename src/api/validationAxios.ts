import axios from "axios";

const strapiAxios = axios.create({baseURL: process.env.NEXT_PUBLIC_VALIDATION})

export default strapiAxios;