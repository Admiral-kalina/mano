import $axios from "axios";

const axios = $axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API });

export default axios;