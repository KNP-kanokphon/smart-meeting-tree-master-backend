import { RuleBaseSeqStatus } from '../enums/RuleBaseReqStatus.enum';

export type RuleBaseDetail = {
  seq: number;
  expression: string; // compress
  distribution: string;
  listname: string;
  assignType: string;
  type: 'BASIC' | 'ADVANCE';
  days: number;
  status: RuleBaseSeqStatus;
  fields?: {
    [name: string]: {
      op: '>' | '<' | '=' | 'in' | 'between';
      value: string | number;
      type: 'STRING' | 'NUMBER';
    };
  };
};
