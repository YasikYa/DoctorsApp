import { UserInfo } from 'api/auth/types';

export type AuthStore = {
    loadingFlags: { [key: string]: boolean };
    isAuthorized: boolean;
    userInfo: UserInfo | null;
};
