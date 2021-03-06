import { Record } from 'api/records/types';

export type RecordsState = {
    entities: Record[];
    loadedRecords: boolean;
};
