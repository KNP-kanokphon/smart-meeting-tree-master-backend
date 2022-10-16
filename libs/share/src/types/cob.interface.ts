import { TFormatAllKeyToCustomType } from '../utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type COB = {
  CHN: 'LOAN';
  CID: string; // compress
  CIF: string;
};

export type TCobRaw = TRawCsvData<COB, 'CHN'>;
