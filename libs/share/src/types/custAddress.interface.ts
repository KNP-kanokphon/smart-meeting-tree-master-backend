import { TFormatAllKeyToCustomType } from '../utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type ACC = {
  CHN: 'ACC';
  CIF: string;
  CID: string;
  AD1: string;
  AD2: string;
  AD3: string;
  AD4: string;
  ZSDISTCD: string;
  CITY: string;
  STATE: string;
  MZIP: number;
};

type HOME = {
  CHN: 'HOME';
  CIF: string;
  CID: string;
  AD1: string;
  AD2: string;
  AD3: string;
  AD4: string;
  ZSDISTCD: string;
  CITY: string;
  STATE: string;
  MZIP: number;
};

export type TCustAdd = ACC | HOME;
export type TCustAddRaw = TRawCsvData<ACC, 'CHN'> | TRawCsvData<HOME, 'CHN'>;
