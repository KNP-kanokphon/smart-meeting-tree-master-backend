import { TFormatAllKeyToCustomType } from '../utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type COB = {
  CHN: 'LOAN';
  CID: string;
  SEQ: string;
  ODTYP: string;
  ODTYP_DESC: string;
  STDT: string;
  EXPDT: string;
  CLAMT: string;
  ACTIVATE: string;
  RATECMP: string;
};

export type TOdtRaw = TRawCsvData<COB, 'CHN'>;
