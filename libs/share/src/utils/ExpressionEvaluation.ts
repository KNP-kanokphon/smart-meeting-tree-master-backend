import { removeMultipleBlank } from '../utils';

function deduce(expression: string): string {
  const s = ` ${expression.trim()} `;

  let r = /\s*\(\s*(?<content>[^\(\)]*)\s*\)\s*/;
  let m = s.match(r);
  if (m) {
    const content = m.groups!['content'];
    if (content.match(/^\s*[-+]?\d+(\.\d+)?\s*$/))
      return s.replace(r, ` ${(+(+content.trim()).toFixed(8)).toString()} `);
    if (content.match(/^\s*\'([^\']*)\'\s*$/))
      return s.replace(r, ` ${content.trim()} `);
    return s.replace(r, ` (${deduce(content).trim()}) `);
  }

  r = /\s*not\s+(?<first>(0|1|\+0|\-0|\+1))\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    return ` ${s.replace(r, first === 0 ? ' 1 ' : ' 0 ')} `;
  }

  r =
    /\s*(?<first>[-+]?\d+(\.\d+)?)\s*(?<sign>[\*\/])\s*(?<second>[-+]?\d+(\.\d+)?)\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    const second = +m.groups!['second'];
    const sign = m.groups!['sign'];
    let result = (+(sign === '*' ? first * second : first / second).toFixed(
      8,
    )).toString();
    if (!result.startsWith('-')) result = `+${result}`;
    return ` ${s.replace(r, ` ${result} `)} `;
  }

  r =
    /\s*(?<first>[-+]?\d+(\.\d+)?)\s*(?<sign>[-+])\s*(?<second>[-+]?\d+(\.\d+)?)\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    const second = +m.groups!['second'];
    const sign = m.groups!['sign'];
    let result = (+(sign === '+' ? first + second : first - second).toFixed(
      8,
    )).toString();
    if (!result.startsWith('-')) result = `+${result}`;
    return ` ${s.replace(r, ` ${result} `)} `;
  }

  r =
    /\s*(?<first>[-+]?\d+(\.\d+)?)\s*(?<sign>(=|>=|<=|>|<))\s*(?<second>[-+]?\d+(\.\d+)?)\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    const second = +m.groups!['second'];
    const sign = m.groups!['sign'];
    if (sign === '=') return s.replace(r, first === second ? ' 1 ' : ' 0 ');
    if (sign === '>=') return s.replace(r, first >= second ? ' 1 ' : ' 0 ');
    if (sign === '<=') return s.replace(r, first <= second ? ' 1 ' : ' 0 ');
    if (sign === '>') return s.replace(r, first > second ? ' 1 ' : ' 0 ');
    if (sign === '<') return s.replace(r, first < second ? ' 1 ' : ' 0 ');
  }

  r =
    /\s*\'(?<first>[^\']*)\'\s*(?<sign>(=|>=|<=|>|<))\s*\'(?<second>[^\']*)\'\s*/;
  m = s.match(r);
  if (m) {
    const first = m.groups!['first'];
    const second = m.groups!['second'];
    const sign = m.groups!['sign'];
    if (sign === '=') return s.replace(r, first === second ? ' 1 ' : ' 0 ');
    if (sign === '>=') return s.replace(r, first >= second ? ' 1 ' : ' 0 ');
    if (sign === '<=') return s.replace(r, first <= second ? ' 1 ' : ' 0 ');
    if (sign === '>') return s.replace(r, first > second ? ' 1 ' : ' 0 ');
    if (sign === '<') return s.replace(r, first < second ? ' 1 ' : ' 0 ');
  }

  r = /\s*(?<first>[-+]?\d+(\.\d+)?)\s*in\s*\[(?<list>[^\[\]]*)\]\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    const list = m.groups!['list'].split(',').map((x) => +x.trim());
    return ` ${s.replace(r, list.includes(first) ? ' 1 ' : ' 0 ')} `;
  }

  r = /\s*\'(?<first>[^\']*)\'\s*in\s*\[(?<list>[^\[\]]*)\]\s*/;
  m = s.match(r);
  if (m) {
    const first = m.groups!['first'];
    const list = m
      .groups!['list'].split(',')
      .map((x) => x.trim())
      .map((x) => {
        const matcher = x.match(/\'(?<content>.*)\'/);
        if (!matcher)
          throw new Error(`unrecognized pattern for string in list.`);
        return matcher.groups!['content'];
      });
    return ` ${s.replace(r, list.includes(first) ? ' 1 ' : ' 0 ')} `;
  }

  r = /\s*(?<first>[01])\s*(?<sign>(and|or))\s*(?<second>[01])\s*/;
  m = s.match(r);
  if (m) {
    const first = +m.groups!['first'];
    const second = +m.groups!['second'];
    const sign = m.groups!['sign'];
    if (sign === 'and')
      return ` ${s.replace(r, first === 1 && second === 1 ? ' 1 ' : ' 0 ')} `;
    if (sign === 'or')
      return ` ${s.replace(r, first === 1 || second === 1 ? ' 1 ' : ' 0 ')} `;
  }

  return s;
}

export function evalExpression(
  expression: string,
  values: Record<string, number | string>,
  debug: boolean = false,
): string {
  let s = ` ${expression.trim()} `;
  if (debug) console.log(s.trim());
  for (const [key, v] of Object.entries(values)) {
    const r = new RegExp(`\\b${key}\\b`, 'g');
    s = s.replace(r, typeof v === 'string' ? `'${v}'` : v.toString());
  }
  while (true) {
    const prev = s;
    if (debug) console.log(prev.trim());
    s = removeMultipleBlank(deduce(prev));
    if (s.trim() === prev.trim()) {
      break;
    }
  }
  s = s.trim();
  if (s.match(/^[-+]?\d+(\.\d+)?$/)) return (+(+s).toFixed(8)).toString();
  if (s.match(/^\'([^\']*)\'$/)) return s;
  throw new Error(`unrecognized pattern (${expression})`);
}

export function testMass() {
  console.log(
    evalExpression(
      "a<3 and (1=2) and not ( b <=2 and (a=3 or a2>='y')) or -3 in [-2,-3,-4,-5] and a2 in ['p','z','y']  ",
      {
        a: 2,
        b: 3,
        a2: 'z',
      },
      true,
    ),
  );
  console.log(
    evalExpression(
      ' 4+2*3',
      {
        a: 2,
        b: 3,
        a2: 'z',
      },
      true,
    ),
  );
  console.log(
    evalExpression(
      ' -4-2*-3',
      {
        a: -2,
        b: -3,
        a2: 'z',
      },
      true,
    ),
  );
  console.log(
    evalExpression(
      '1.0000',
      {
        a: -2,
        b: -3,
        a2: 'z',
      },
      true,
    ),
  );

  const a = evalExpression(
    'a<1-4*2+(-100+5.2+18.6/(2+5/-1.25))*-5',
    {
      a: -2,
      b: -3,
      a2: 'z',
    },
    true,
  );
  console.log(a);
}
