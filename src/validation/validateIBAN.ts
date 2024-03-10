import {validationApi} from "@/api";

export const validateIBAN = async (iban: string) => {
    try {
        const response = await validationApi.get(`?iban=${iban}`);
        if (response.data.valid) {
            return true;
        }
        return 'IBAN is not valid';
    } catch (error) {
        return 'Failed to validate IBAN';
    }
};
