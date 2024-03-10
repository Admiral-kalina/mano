import { AxiosInstance } from "axios";

import validationAxios from "./validationAxios";


class Api {
    private $axios: AxiosInstance;

    constructor($axios:AxiosInstance) {
        this.$axios = $axios
    }

    async get(endpoint:string) {
        return this.$axios.get(endpoint)
    }
}

export const validationApi = new Api(validationAxios);
