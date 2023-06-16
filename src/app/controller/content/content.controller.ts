import { RcFile } from 'antd/es/upload';
import axios from '../../config/axios';
import { Content } from '../../types/content/content';
import { Error } from '../errors/check.errors';
import { cookies } from '../user/adm.cookies';
import { companyCPFCNPJ } from '../../util/platform.number/platform.number';

const cookie = cookies.get('data.user');

export const ContentController = {
    store: async (content: Content, file?: RcFile) => {
        const values = content;

        try {
            const token = cookie.token;

            const formData = new FormData();

            Object.keys(values).forEach((key: string) => {
                if ((values as any)[key]) {
                    formData.append(key, (values as any)[key]);
                }
            });

            if (file) {
                formData.append('file', file);
            }

            const request = await axios.post('/content', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer ${token}`
                }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    patch: async (dataUser: any) => {
        const values = dataUser;

        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.patch('/physical-person', values, {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getByArticle: async (id: number) => {
        try {
            const request = await axios.get(`/article/${id}`);

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getByPage: async (type: string, page: string) => {
        try {
            const request = await axios.get(
                `/content/${type}/${page}/${companyCPFCNPJ}`
            );

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.data };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    getGallery: async () => {
        try {
            const token = cookie.token;

            const request = await axios.get('/content-gallery', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message, data: data.result };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    },

    deleteImage: async (id: number) => {
        try {
            const cookie = cookies.get('data.user');

            const token = cookie.token;

            const request = await axios.delete(`/content-archive/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            });

            const data = request.data;

            const message = data.message;

            return { error: false, message };
        } catch (error: any) {
            const message = await Error.check(error);

            return { error: true, message };
        }
    }
};
