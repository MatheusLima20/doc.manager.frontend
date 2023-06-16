import axios from '../../config/axios';
import { Error } from '../errors/check.errors';
import { companyCPFCNPJ } from '../../util/platform.number/platform.number';

export const PlatformController = {
    get: async () => {
        let request;
        let data;

        try {
            const platformCNPJ = companyCPFCNPJ;

            request = await axios.get(`/platform/${platformCNPJ}`, {});

            data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    }
};
