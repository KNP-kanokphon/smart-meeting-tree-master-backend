import { TFormatAllKeyToCustomType } from '..//utils/utilTypes';

type TRawCsvData<T, U extends keyof T> = Pick<T, U> &
  TFormatAllKeyToCustomType<Omit<T, U>, string>;

type LN = {
  CHN: 'LOAN';
  CIF: string;
  CID: string;
  SUBT: string;
  SUBT_DESC: string;
  ZMKTCD: string;
  ZMKTCD_DESC: string;
  DTNT: Date;
  MDT: Date;
  CRLMT: number;
  PMT: number;
  SCHNUM: number;
  ONP: number;
  LPDT: Date;
  GTDUE: number;
  CNTCR: number;
  DIST1FRE: string;
  INDEX: string;
  PCTO: number;
  IRN: number;
  DLCAF: string;
  BAL: number;
  ACR: number;
  LCHG: number;
  PONPT: number;
  POIF: number;
  POVALD: Date;
  ZFWOS: string;
  PROVCAT: number;
  ZFWOD: Date;
  ZSUBAC: string;
  ZMASTER: number;
  STAT: number;
  STAT_DESC: string;
  BOO: number;
  BOO_DESC: string;
  AD1: string;
  AD2: string;
  AD3: string;
  AD4: string;
  ZSDISTCD: string;
  CITY: string;
  STATE: string;
  MZIP: number;
  ZDELPERM: number;
  ZOBFP: string;
  ZOBFI: string;
  OSEQDT: string;
};

type OD = {
  CHN: 'OD';
  CIF: string;
  CID: string;
  ZCLTOT: number;
  TLD: Date;
  IRN: number;
  ACR: number;
  ZFWOS: string;
  PROVCAT: string;
  ZFWOD: Date;
  ZSTATCD: number;
  ZSTATCD_DESC: string;
  BAL: number;
  ZINTDEL: number;
  ZDELPRIN: number;
  ZDLPRD: number;
  ZEXPDT: string;
  NEGACR: number;
  NEGACRUN: number;
  DARCLS: string;
  DARCOVR: string;
  BOO: string;
  BOO_DESC: string;
};

export type TDebt = LN | OD;
export type TDebtRaw = TRawCsvData<LN, 'CHN'> | TRawCsvData<OD, 'CHN'>;

// export type BAR<T, U extends keyof T> = Pick<T, U> & { detail: Omit<T, U> };
// export type FOO =
//   | BAR<LN, 'CHN' | 'CID' | 'CIF'>
//   | BAR<OD, 'CHN' | 'CID' | 'CIF'>;
