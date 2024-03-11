import axios from "./config";

class Api {
    async get(endpoint: string, params: any): Promise<any> {
        try {
            const response = await axios.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch data");
        }
    }
}

const apiInstance = new Api();

export default apiInstance;
