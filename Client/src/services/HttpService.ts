import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'shared/constants';
import { paths } from 'routes/paths';
import { history } from 'lib/history';
import { tokenService } from './TokenService';

class HttpService {
    public instance: AxiosInstance;

    constructor(baseURL: string) {
        const instance = axios.create({
            baseURL,
        });

        // setting the token if it exists
        instance.interceptors.request.use(this.handleToken);
        // processing request
        instance.interceptors.response.use(this.handleSuccess, this.handleError);

        this.instance = instance;
    }

    private handleToken(config: AxiosRequestConfig) {
        const token = tokenService.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }

    private handleSuccess(response: AxiosResponse) {
        return response;
    }

    private handleError(error: AxiosError): Promise<AxiosResponse> {
        if (error.response?.status) {
            switch (error.response.status) {
                case 401:
                    tokenService.removeToken();
                    history.push(paths.LOGIN);
                    break;
                // case 403:
                // case 500:
                //     history.push(paths.ERROR);
                //     break;
                default:
                    console.warn('Error: ', error.response.data);
                    break;
            }
        }

        return Promise.reject(error.response);
    }
    
    public createCancelToken(signal: AbortSignal) {
        const source = axios.CancelToken.source();

        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return source.token;
    }
}

const httpService = new HttpService(BASE_URL);

export const {
    createCancelToken,
    instance: { get, post, put, delete: del },
} = httpService;
