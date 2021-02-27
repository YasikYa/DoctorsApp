/// <reference types="react-scripts" />

import ts from 'typescript';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_ENVIRONMENT: 'dev';
            REACT_APP_BACKEND_URL: string;
        }
    }
}

export default ts;
