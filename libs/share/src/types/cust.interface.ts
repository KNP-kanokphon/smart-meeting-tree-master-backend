import { TFormatAllKeyToCustomType } from '../utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
TFormatAllKeyToCustomType<Omit<T, U>, string>;

type CBS = {
  CHN: 'LOAN';
  CIF: string;
  ZTITLE: string;
  FNAME: string;
  LNM: string;
  ZCIZID: string;
  DOB: string;
  SEX: string;
  ZOCC: string;
  ZOCC_DESC: string;
  ZSOCC: string;
  ZSOCC_DESC: string;
  ZOCC2: string;
  ZOCC2_DESC: string;
  ZSOCC2: string;
  ZSOCC2_DESC: string;
  HPH: string;
  BPH: string;
  APH: string;
  PAD1: string;
  PAD2: string;
  PAD3: string;
  PAD4: string;
  ZPSDISCD: string;
  PCITY: string;
  PSTATE: string;
  PZIP: string;
  MAD1: string;
  MAD2: string;
  MAD3: string;
  MAD4: string;
  ZMSDISCD: string;
  MCITY: string;
  MSTATE: string;
  MZIP: string;
};

type CARD = {
  CHN: 'CARD';
  CIF: string;
  ZTITLE: string;
  FNAME: string;
  LNM: string;
  ZCIZID: string;
  DOB: string;
  SEX: string;
  ZOCC: string;
  ZOCC_DESC: string;
  ZSOCC: string;
  ZSOCC_DESC: string;
  ZOCC2: string;
  ZOCC2_DESC: string;
  ZSOCC2: string;
  ZSOCC2_DESC: string;
  HPH: string;
  BPH: string;
  APH: string;
};

export type TCust = CBS | CARD;
export type TCustRaw = TRawCsvData<CBS, 'CHN'> | TRawCsvData<CARD, 'CHN'>;
