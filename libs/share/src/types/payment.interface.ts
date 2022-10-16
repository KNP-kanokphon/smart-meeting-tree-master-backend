import { TFormatAllKeyToCustomType } from '../utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LOAN = {
  CHN: 'LOAN';
  CID: string; // compress
  TSEQ: number;
  ETC: string;
  TJD: string;
  TIME: string;
  TOT: number;
  ENDBAL: number;
  EFD: string;
};

export type TPaymentRaw = TRawCsvData<LOAN, 'CHN'>;
