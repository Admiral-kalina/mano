import Api from "@/api";

class ValidationService {
    async validateIBAN(iban: string): Promise<boolean | string> {
        try {
            const response = await Api.get('/validate/',{iban});
            return response.valid ? true : 'IBAN is not valid';
        } catch (error) {
            return 'Failed to validate IBAN';
        }
    }
}

const validationService = new ValidationService();

export default validationService;
