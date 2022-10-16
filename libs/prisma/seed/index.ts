import { Debt, Prisma, PrismaClient } from '@prisma/client';
import Scripts from './scripts';

const DISTS = ['dist_01', 'dist_02'];

const CIF_DISTS = [
  '133350234690',
  '132350234176',
  '137750234897',
  '1394250234530',
  '1364150234356',
  '132165023497',
  '1378850234697',
  '1362850234106',
  '1323950234699',
  '136350234224',
  '1380150234325',
  '1332850234870',
  '1354050234939',
  '1349450234500',
  '1349350234823',
  '131305023495',
  '1341250234985',
  '1389250234247',
  '1390550234882',
  '1388150234414',
  '1391450234835',
  '1398350234117',
  '1380950234744',
  '1373850234990',
  '1310350234577',
  '14433',
  '13862',
];

const ruleBaseData = async (prisma: PrismaClient) => {
  const dists = ['dist_01', 'dist_02'];
  const expressions = [`channel='OD'`, `channel='LN'`];

  await prisma.ruleBase.upsert({
    update: {},
    where: { name: 'AssignUser' },
    create: {
      name: 'AssignUser',
      detail: expressions.map((v, i) => ({
        seq: i + 1,
        expression: v,
        distribution: dists[i],
        days: 60,
        status: 'APPROVED',
      })),
    },
  });

  const users: Record<string, string[]> = {};
  const userEx: Record<string, string[]> = {};
  let count = 0;
  let userDistCount = 0;
  for (let i = 0; i < dists.length * 2; i++) {
    count += 1;
    if (users[count] === undefined) users[count] = [];
    if (userEx[count] === undefined) userEx[count] = [];
    userDistCount += 1;
    let dist = userDistCount > 9 ? userDistCount : `0${userDistCount}`;
    users[count].push(`a_dist_${dist}`);
    userDistCount += 1;
    dist = userDistCount > 9 ? userDistCount : `0${userDistCount}`;
    users[count].push(`a_dist_${dist}`);
    userEx[count].push('overdueAmt >= 20000');
    userEx[count].push('overdueAmt < 20000');
  }

  for (const userId in users) {
    await prisma.ruleBase.upsert({
      update: {},
      where: { name: `User:${userId}:AssignUser` },
      create: {
        name: `User:${userId}:AssignUser`,
        detail: userEx[userId].map((v, i) => ({
          seq: i + 1,
          expression: v,
          distribution: users[userId][i],
          days: 30,
          status: 'APPROVED',
        })),
      },
    });
  }
};

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const { Decimal } = Prisma;

const randomYearToMs = (max: number) =>
  1000 * 360 * 24 * 365 * getRandomInt(max);

const YearToMs = (year: number) => 1000 * 360 * 24 * 365 * year;

const userData = async (prisma: PrismaClient) => {
  await prisma.user.upsert({
    create: {
      id: 1,
      capabilities: [],
      type: 'BANK',
      name: 'BANK',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 1 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 2,
      capabilities: [{ value: 100 }],
      type: 'OA',
      name: 'OA2',
      parentId: '',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 2 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 3,
      capabilities: [{ value: 100 }, { value: 50 }],
      type: 'OA',
      name: 'OA3',
      parentId: '',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 3 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 100,
      capabilities: { value: 500 },
      type: 'SUP',
      parentId: '',
      name: 'SUP100',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 100 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 200,
      capabilities: { value: 200 },
      type: 'SUP',
      parentId: '',
      name: 'SUP200',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 200 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 300,
      capabilities: { value: 400 },
      type: 'Agent',
      parentId: '',
      name: 'Agent300',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 300 },
    update: {},
  });
};

const userDataPartTwo = async (prisma: PrismaClient) => {
  await prisma.user.upsert({
    create: {
      id: 101,
      capabilities: { value: 500 },
      type: 'SUP',
      parentId: '',
      name: 'SUP101',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 100 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 201,
      capabilities: { value: 200 },
      type: 'SUP',
      parentId: '',
      name: 'SUP201',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 200 },
    update: {},
  });
  await prisma.user.upsert({
    create: {
      id: 301,
      capabilities: { value: 400 },
      type: 'Agent',
      parentId: '',
      name: 'Agent301',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 300 },
    update: {},
  });
};

const distData = async (prisma: PrismaClient) => {
  await prisma.userDistribution.upsert({
    where: { id: 'dist_01' },
    create: {
      id: 'dist_01',
      name: 'dist_01',
      description: 'dist_01',
      user: '1',
      detail: [
        { UserId: 1, share: 20 },
        { UserId: 2, share: 30 },
        { UserId: 3, share: 50 },
      ],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });

  await prisma.userDistribution.upsert({
    where: { id: 'dist_02' },
    create: {
      id: 'dist_02',
      name: 'dist_02',
      description: 'dist_02',
      user: '1',
      detail: [
        { UserId: 4, share: 50 },
        { UserId: 5, share: 25 },
        { UserId: 6, share: 25 },
      ],
      assignBy: 'ACCOUNT',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });

  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_01' },
    create: {
      id: 'a_dist_01',
      name: 'a_dist_01',
      description: 'a_dist_01',
      user: '1',
      detail: [{ UserId: 3, share: 100 }],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_02' },
    create: {
      id: 'a_dist_02',
      name: 'a_dist_02',
      description: 'a_dist_02',
      user: '1',
      detail: [
        { UserId: 4, share: 30 },
        { UserId: 5, share: 70 },
      ],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_03' },
    create: {
      id: 'a_dist_03',
      name: 'a_dist_03',
      description: 'a_dist_03',
      user: '1',
      detail: [{ UserId: 2, share: 100 }],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_04' },
    create: {
      id: 'a_dist_04',
      name: 'a_dist_04',
      description: 'a_dist_04',
      user: '1',
      detail: [
        { UserId: 6, share: 50 },
        { UserId: 7, share: 30 },
        { UserId: 8, share: 20 },
      ],
      assignBy: 'ACCOUNT',
      assignMode: 'NEW_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_05' },
    create: {
      id: 'a_dist_05',
      name: 'a_dist_05',
      description: 'a_dist_05',
      user: '1',
      detail: [{ UserId: 7, share: 100 }],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_06' },
    create: {
      id: 'a_dist_06',
      name: 'a_dist_06',
      description: 'a_dist_06',
      user: '1',
      detail: [
        { UserId: 5, share: 50 },
        { UserId: 2, share: 50 },
      ],
      assignBy: 'ACCOUNT',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_07' },
    create: {
      id: 'a_dist_07',
      name: 'a_dist_07',
      description: 'a_dist_07',
      user: '1',
      detail: [
        { UserId: 2, share: 50 },
        { UserId: 3, share: 25 },
        { UserId: 4, share: 25 },
      ],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
  // LN DIST
  await prisma.userDistribution.upsert({
    where: { id: 'a_dist_08' },
    create: {
      id: 'a_dist_08',
      name: 'a_dist_08',
      description: 'a_dist_08',
      user: '1',
      detail: [
        { UserId: 9, share: 50 },
        { UserId: 8, share: 50 },
      ],
      assignBy: 'OS_BAL',
      assignMode: 'PREVIOUS_USER',
      cifGrouping: true,
      updateBy: '',
      createBy: '',
    },
    update: {},
  });
};

const randomDebt = async (prisma: PrismaClient) => {
  const num = getRandomInt(10);
  const channel = ['OD', 'LN'];
  const cif = CIF_DISTS[Math.floor(Math.random() * CIF_DISTS.length)];
  const cus = await prisma.cus.findUnique({ where: { cif } });
  if (!cus) {
    await prisma.cus.create({
      data: {
        cif,
        channel: `account`,
        cusTitle: getRandomInt(10) > 5 ? 'mr' : 'ms',
        custName: `fname:${cif}`,
        custLastName: `lnm:${cif}`,
        custIdCard: cif,
        dob: (Date.now() - YearToMs(25) - randomYearToMs(15)).toString(),
        sex: getRandomInt(10) > 5 ? 'M' : 'F',
        occ1: 'DEV',
        occ1Desc: 'dev_desc',
        subOcc1: 'DEV',
        subOcc1Desc: 'dev',
        occ2: 'dev',
        occ2Desc: 'dev',
        subOcc2: 'dev2',
        subOcc2Desc: 'dev2_desc',
        homePhone: `0285585${getRandomInt(99)}`,
        officePhone: `0285585${getRandomInt(99)}`,
        mobilePhone: `09279000${getRandomInt(99)}`,
        previousUser: {},
      },
    });
  }

  const debt: Prisma.DebtCreateManyInput = {
    cif,
    status: 'UNASSIGNED',
    channel: channel[num < 8 ? 0 : 1],
    cid: getRandomInt(100000000).toString(),
    overdueAmt: new Decimal(getRandomInt(40000)),
    tmpUserId: null,
    UserId: 0,
    remark: '',
    expiredTime: BigInt(Date.now() * 60 * 60),
    UserDistName: null,
    companyCode: '',
    accountNo: '',
    cardNo: '0',
    customerNo: '0',
    productCode: '001',
    subProductCode: '001',
    minPayAmt: new Decimal(getRandomInt(40000)),
    dpd: 0,
    principleAmt: new Decimal(getRandomInt(40000)),
    accountStatus: '0',
    accountLevel: 'SM1',
    detail: '',
    listName: '',
    actionStatus: 'noAcation',
    onHold: false,
    assignType: '',
  };
  // console.log(debt);
  return debt;
};

const debtData = async (prisma: PrismaClient) => {
  const debts: Prisma.DebtCreateManyInput[] = [];

  for (let i = 0; i < 50; i++) {
    debts.push(await randomDebt(prisma));
  }

  // console.log(debts);
  await prisma.debt.createMany({ data: debts });
};

// ===== HEAVY =====

const debtDataH = async (prisma: PrismaClient, count: number) => {
  const debts: Prisma.DebtCreateManyInput[] = [];

  for (let i = 0; i < count; i++) {
    debts.push(await randomDebt(prisma));
  }

  await prisma.debt.createMany({ data: debts });
};

const userDataH = async (prisma: PrismaClient, count: number, cap: number) => {
  await prisma.user.upsert({
    create: {
      id: 0,
      capabilities: {},
      type: 'BANK',
      name: 'BANK',
      oaCode: '',
      level: '',
      token: '',
      team: '',
    },
    where: { id: 0 },
    update: {},
  });
  let aId = 0;
  for (let i = 1; i <= count / 2; i++) {
    await prisma.user.upsert({
      create: {
        id: i,
        capabilities: { value: cap },
        type: 'OA',
        parentId: '',
        name: `user${i}`,
        oaCode: '',
        level: '',
        token: '',
        team: '',
      },
      where: { id: i },
      update: {},
    });
    aId = i + 1;
  }
  for (let i = 1; i <= count / 2; i++) {
    await prisma.user.upsert({
      create: {
        id: aId,
        capabilities: { value: cap },
        type: 'SUP',
        parentId: '',
        name: `user${aId}`,
        oaCode: '',
        level: '',
        token: '',
        team: '',
      },
      where: { id: aId },
      update: {},
    });
    aId += 1;
  }
};

const distDataH = async (prisma: PrismaClient) => {
  let count = 0;
  const userIds: number[] = [];
  for (const dist of DISTS) {
    count += 1;
    userIds.push(count);
    count += 1;
    userIds.push(count);
    await prisma.userDistribution.upsert({
      where: { id: dist },
      create: {
        id: dist,
        name: dist,
        description: dist,
        user: '1',
        detail: [
          { UserId: userIds[count - 2], share: getRandomInt(100) },
          { UserId: userIds[count - 1], share: getRandomInt(100) },
        ],
        assignBy: 'OS_BAL',
        assignMode: 'PREVIOUS_USER',
        cifGrouping: true,
        updateBy: '',
        createBy: '',
      },
      update: {},
    });
  }
};

const settingData = async (prisma: PrismaClient) => {
  await prisma.setting.upsert({
    where: { topic: 'DEBT_EXPIRES_DAY' },
    create: {
      topic: 'DEBT_EXPIRES_DAY',
      detail: { value: 30 },
      updatedAt: Date.now(),
    },
    update: {},
  });
};

const userTypeData = async (prisma: PrismaClient) => {
  const types = ['BANK', 'OA', 'SUP', 'AGENT'];
  let count = 0;
  for (const type of types) {
    await prisma.userType.upsert({
      where: { type },
      create: {
        type,
        rank: count,
      },
      update: {},
    });
    count += 1;
  }
};

const organizationProfileData = async (prisma: PrismaClient) => {
  const oaList = [
    'oa1',
    'oa2',
    'oa3',
    'oa4',
    'oa5',
    'oa6',
    'oa7',
    'oa8',
    'oa9',
    'oa10',
    'oa11',
    'oa12',
    'oa13',
    'oa14',
    'oa15',
    'oa16',
    'oa17',
    'oa18',
    'oa19',
    'oa20',
    'oa21',
    'oa22',
    'oa23',
    'oa24',
    'oa25',
    'oa26',
    'oa27',
    'oa28',
    'oa29',
    'oa30',
    'oa31',
    'oa32',
    'oa33',
    'oa34',
    'oa35',
    'oa36',
    'oa37',
    'oa38',
    'oa39',
    'oa40',
    'oa41',
  ];
  const address = [
    'aaa1',
    'aaa2',
    'aaa3',
    'aaa4',
    'aaa5',
    'aaa6',
    'aaa7',
    'aaa8',
    'aaa9',
    'aaa10',
    'aaa11',
    'aaa12',
    'aaa13',
    'aaa14',
    'aaa15',
    'aaa16',
    'aaa17',
    'aaa18',
    'aaa19',
    'aaa20',
    'aaa21',
    'aaa22',
    'aaa23',
    'aaa24',
    'aaa25',
    'aaa26',
    'aaa27',
    'aaa28',
    'aaa29',
    'aaa30',
    'aaa31',
    'aaa32',
    'aaa33',
    'aaa34',
    'aaa35',
    'aaa36',
    'aaa37',
    'aaa38',
    'aaa39',
    'aaa40',
    'aaa41',
  ];
  const email = [
    'aaa1@gmail.com',
    'aaa2@gmail.com',
    'aaa3@gmail.com',
    'aaa4@gmail.com',
    'aaa5@gmail.com',
    'aaa6@gmail.com',
    'aaa7@gmail.com',
    'aaa8@gmail.com',
    'aaa9@gmail.com',
    'aaa10@gmail.com',
    'aaa11@gmail.com',
    'aaa12@gmail.com',
    'aaa13@gmail.com',
    'aaa14@gmail.com',
    'aaa15@gmail.com',
    'aaa16@gmail.com',
    'aaa17@gmail.com',
    'aaa18@gmail.com',
    'aaa19@gmail.com',
    'aaa20@gmail.com',
    'aaa21@gmail.com',
    'aaa22@gmail.com',
    'aaa23@gmail.com',
    'aaa24@gmail.com',
    'aaa25@gmail.com',
    'aaa26@gmail.com',
    'aaa27@gmail.com',
    'aaa28@gmail.com',
    'aaa29@gmail.com',
    'aaa30@gmail.com',
    'aaa31@gmail.com',
    'aaa32@gmail.com',
    'aaa33@gmail.com',
    'aaa34@gmail.com',
    'aaa35@gmail.com',
    'aaa36@gmail.com',
    'aaa37@gmail.com',
    'aaa38@gmail.com',
    'aaa39@gmail.com',
    'aaa40@gmail.com',
    'aaa41@gmail.com',
  ];
  const adminUserID = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
  ];
  const oaName = [
    'บริษัท สำนักกฎหมายประชาชน จำกัด',
    'บริษัท ชโย กรุ๊ป จำกัด (มหาชน)',
    'บริษัท อลีนา อินเตอร์เนชั่นแนล ลอว์ ออฟฟิศ จำกัด',
    'บริษัท วีไอพี กรุ๊ป 888  จำกัด',
    'บริษัท รักษาความปลอดภัย กรุงไทยธุรกิจบริการ  จำกัด',
    'บริษัท เทรด คอนเนคชั่น จำกัด',
    'บริษัท เวนเจอร์ อินคอร์ปอเรชั่น จำกัด (มหาชน)',
    'บริษัท เดอะ พรีเมี่ยม ซุปเปอร์ริช คอร์ปอเรชั่น จำกัด',
    'บริษัท พีพีเอส ลอว์ แอนด์ บีสซิเนส จำกัด',
    'บริษัท เค เอ็ม เซอร์วิสพลัส จำกัด',
    'บริษัท เดอะเบสต์ อินเตอร์เนชั่นแนล บิซซิเนส จำกัด',
    'บริษัท ศุภบูรณ์ จำกัด',
    'บริษัท แม็คซ์กรุ๊ป คอร์ปอเรชั่น จำกัด',
    'บริษัท โกลบอล เซอร์วิส เซ็นเตอร์  จำกัด (มหาชน)',
    'บริษัท กอเงิน คอนเลคชั่น จำกัด',
    'บริษัท สำนักกฎหมาย ซี.เอ.แอล จำกัด',
    'บริษัท คีฟสเต็ป เคาน์เซลเลอร์ จำกัด',
    'บริษัท ณัฐทรงรัฐ จำกัด',
    'บริษัท ซุปเปอร์ริช อินเตอร์ เนชั่นแนล โอปอเรชั่น แอนด์ เซอร์วิส (ประเทศไทย) จำกัด ',
    'บริษัท กฎหมายจักรเพชร จำกัด',
    'บริษัท เดอะคอลเล็คเตอร์ส จำกัด',
    'บริษัท พี.ซี.เอส.บิซิเนส จำกัด',
    'บริษัท นิติรัฐ ลอว์ แอนด์ คอลเลคชั่น จำกัด',
    'บริษัท วันคอลพลัส แอ๊ดไวเซอรี่ จำกัด',
    'บริษัท เฟิร์ส คอลเลคชั่นเซอร์วิส จำกัด',
    'บริษัท ลีเกิ้ล มายด์ จำกัด',
    'บริษัท กฎหมาย  อรรถวุฒิ จำกัด',
    'บริษัท เอส กรุ๊ป (2008) จำกัด',
    'บริษัท สำนักงานกฎหมายสิทธิประชา จำกัด',
    'บริษัท เอ็นอาร์เค คอลเลคชั่น แอนด์ เซอร์วิส จำกัด',
    'บริษัท สาเกตุนครลอว์เยอร์ จำกัด',
    'บริษัท แอคทีฟ อินฟินิตี้ จำกัด',
    'บริษัท กฎหมายตงฉิน จำกัด',
    'บริษัท วินวิน ทูเก็ตเทอร์ จำกัด',
    'บริษัท สำนักงานกฎหมายชัยพิพัฒน์ จำกัด',
    'บริษัท ดีดีเจ โซลูชั่น จำกัด',
    'บริษัท สารคามนิติธรรม จำกัด',
    'บริษัท ลอว์ ออฟ จัสติซ จำกัด',
    'บริษัท ดับเบิ้ลพี คอนซัลท์ แอนด์ เซอร์วิส จำกัด',
    'บริษัท ภัทรพรพล จำกัด',
    'บริษัท เจ เอ็ม ที เน็ทเวอร์เซอร์วิสเซส จำกัด มหาชน',
  ];
  const oaOrganize = [{ seq: '1', group: 'Manager' }];
  let count = 0;
  for (const oa of oaList) {
    await prisma.organizationProfile.create({
      data: {
        oaCode: oa,
        oaName: oaName[count],
        address: address[count],
        email: email[count],
        contactName: address[count],
        contactPhone: '08XXXXXXXX',
        adminUserId: adminUserID[count],
        userBank: '',
        oaOrganize: oaOrganize,
        oaId: oa,
      },
    });
    count += 1;
  }
};

const organizationContractData = async (prisma: PrismaClient) => {
  const oaList = ['oa1', 'oa2', 'oa3', 'oa4', 'oa5', 'oa6', 'oa7', 'oa8'];
  const contractNo = ['111', '222', '333', '444', '555', '666', '777', '888'];
  let count = 0;
  for (const oa of oaList) {
    await prisma.organizationContract.create({
      data: {
        oaCode: oa,
        contractNo: contractNo[count],
        contractCredit: 1000000,
        contractStatus: true,
        contractStartDate: '2022-01-01',
        contractEndDate: '2022-12-31',
      },
    });
    count += 1;
  }
};

const actionCodeData = async (prisma: PrismaClient) => {
  const actionCodes = ['contact', 'noContact', 'letter', 'other'];
  const actionName = [
    'C : ติดต่อได้',
    'NC : ติดต่อไม่ได้',
    'letter : ส่งจดหมาย',
    'Oth : อื่น ๆ',
  ];
  let count = 0;
  for (const actionCode of actionCodes) {
    await prisma.actionCodeDesc.create({
      data: {
        actionCode: actionCode,
        actionName: actionName[count],
      },
    });
    count += 1;
  }
};

const producCodeData = async (prisma: PrismaClient) => {
  const productCode = [
    '20002',
    '30001',
    '30004',
    '40001',
    '10001',
    '80005',
    '80002',
    '80004',
    '80006',
    '90002',
    '20001',
    '90003',
    '11001',
    '50001',
    '60001',
    '30006',
    '90001',
    '20005',
    '30002',
    '20003',
    '30003',
    '30005',
    '101',
    '201',
    '202',
    '203',
    '301',
    '501',
    '511',
    '521',
    '801',
    '802',
    '821',
  ];
  const productDesc = [
    'สินเชื่อสวัสดิการ',
    'สินเชื่อธนาคารประชาชน',
    'สินเชื่อเพื่อพัฒนากลุ่มอาชีพ',
    'สินเชื่อธุรกิจทั่วไป',
    'สินเชื่อเคหะ',
    'สินเชื่อเพื่อพัฒนาชนบท',
    'สินเชื่อห้องแถว',
    'สินเชื่อพัฒนาองค์กรชุมชน (รายบุคคล)',
    'สินเชื่อเพื่อเกษตรกรชาวไร่ยาสูบ',
    'ลูกหนี้ค่าเบี้ยประกันภัยจ่ายแทน',
    'สินเชื่อไทรทอง',
    'ลูกหนี้ค่าธรรมเนียมบสย.จ่ายแทน',
    'เช่าซื้อรถยนต์',
    'สินเชื่อธุรกิจทั่วไป',
    'สินเชื่อธุรกิจทั่วไป',
    'สินเชื่ออุทกภัยและวาตภัย (PSA)',
    'ลูกหนี้ตามภาระหนังสือค้ำประกัน',
    'สินเชื่อชีวิตสุขสันต์',
    'สินเชื่อแก้ไขหนี้สินภาคประชาชน',
    'สินเชื่อเพื่อพนักงานธนาคารออมสิน',
    'สินเชื่อปรับโครงสร้างหนี้ภาคประชาชน',
    'สินเชื่อเพื่อสมาชิก สพช.',
    'Platinum Signature',
    'Platinum',
    'Platinum',
    'Platinum',
    'Gold',
    'World Elite',
    'World',
    'Master Platinum',
    'Prima',
    'GSB Refinance',
    'People',
  ];
  const loanType = [
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'LOAN',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
    'CARD',
  ];
  let count = 0;
  for (const actionCodes of productCode) {
    await prisma.productCode.create({
      data: {
        productCode: actionCodes,
        productDesc: productDesc[count],
        loanType: loanType[count],
      },
    });
    count += 1;
  }
};

const statusCodeData = async (prisma: PrismaClient) => {
  const statusCodes = [
    'A01',
    'A02',
    'PTP-P',
    'PTP-F',
    'PTP-C',
    'PTP-R',
    'PTP-S',
    'PTP-SR',
    'PP',
    'FP',
    'FP-AC',
    'CPT',
    'BP',
    'SP',
    'C-CB',
    'UnTP',
    'RF',
    'DP',
    'LO',
    'UK',
    'TN',
    'WN',
    'NS',
    'NA',
    'BZ',
    'DC',
    'NC-CB',
    'L01',
    'L02',
    'L03',
    'L04',
    'L05',
    'OTH1',
    'OTH2',
    'OTH3',
    'OTH4',
    'OTH5',
    'OTH6',
    'OTH7',
    'OTH8',
    'OTH9',
    'OTH10',
    'OTH11',
    'OTH12',
    'OTH13',
    'OTH14',
    'OTH15',
    'OTH16',
  ];
  const statusName = [
    'ติดต่อได้แต่ไม่นัดชำระ',
    'อยู่ระหว่างเจรจายังไม่ได้ข้อสรุป',
    'PTP-P :นัดชำระบางส่วน',
    'PTP-F :นัดชำระเต็มจำนวน',
    'PTP-C :นัดชำระปิดบัญชี',
    'PTP-R :นัดชำระพร้อมไถ่ถอน',
    'PTP-S :นัดชำระพร้อมถอนยึด',
    'PTP-SR :นัดชำระพร้อมถอนยึด-ไถ่ถอน',
    'PP :ชำระแล้วบางส่วน',
    'FP :ชำระแล้วเต็มจำนวน (ตามเงินงวดค้างที่ให้ติดตาม)',
    'FP-AC :ชำระปิดบัญชีแล้ว',
    'ขอเปลี่ยนแปลงเงื่อนไขผ่อนชำระ หรือ ปรับโครงสร้างหนี้',
    'BP :ไม่ชำระตามนัดหมาย/ผิดนัดชำระ',
    'SP :เงินตั้งพัก',
    'C-CB :เจอตัว-โทรกลับ',
    'UnTP :ไม่สามารถชำระได้',
    'RF :ปฏิเสธการชำระ',
    'DP :มีข้อโต้แย้ง',
    'รอเงินกู้ เงินยืม เพื่อนัดชำระ',
    'ไม่รู้จัก ไม่มีชื่อนี้ รู้จักแต่ไม่ได้ติดต่อกันนานแล้ว',
    'TN :ระงับการใช้งาน/ยกเลิกเบอร์',
    'WN :ไม่ใช่เบอร์ลูกค้า',
    'NS :ไม่มีสัญญาณโทรศัพท์',
    'NA :ไม่รับสาย',
    'BZ :สายไม่ว่าง',
    'DC :ลูกค้าเสียชีวิต',
    'NC-CB :ไม่เจอตัว-โทรกลับ',
    'จดหมายเตือนฉบับที่ 1',
    'จดหมายเตือนฉบับที่ 2',
    'จดหมายบอกเลิกสัญญา',
    'บอกกล่าวให้ไถ่ถอน',
    'บอกกล่าวขายขาดทุน',
    'แจ้งเพื่อทราบ-ไม่สามารถชำระได้',
    'แจ้งเพื่อทราบ-ขอเปลี่ยนแปลงเงื่อนไขปรับโครงสร้างหนี้',
    'แจ้งเพื่อทราบ-ไม่ผ่อนชำระแล้ว ให้เป็นไปตามขั้นตอนกฏหมาย',
    'แจ้งเพื่อทราบ-ไม่รับเงื่อนไขปรับโครงสร้างหนี้',
    'แจ้งเพื่อทราบ-เงื่อนไขการปรับโครงสร้างหนี้ไม่ตรงตามที่เจรจาไว้',
    'แจ้งเพื่อทราบ-อื่นๆ',
    'ส่งตรวจสอบ - ภาระหนี้/ยอดหนี้/ยอดเงิน',
    'ส่งตรวจสอบ เงื่อนไขการปรับโครงสร้างหนี้',
    'ส่งตรวจสอบ-ลูกค้าแจ้งชำระแล้ว',
    'ส่งตรวจสอบ-ลูกค้าแจ้งปิดบัญชีแล้ว',
    'ส่งตรวจสอบ-อื่น ๆ',
    'แจ้งเพื่อทราบ-ลูกค้าขอเปลี่ยน/ยกเลิก/เพิ่ม ที่อยู่จัดส่งเอกสาร',
    'แจ้งเพื่อทราบ-ลูกค้าขอเปลี่ยน / ยกเลิก ที่อยู่ตามทะเบียนราษฎร์',
    'แจ้งเพื่อทราบ-ลูกค้าขอเปลี่ยน / ยกเลิก ที่อยู่ตามที่ทำงาน',
    'แจ้งเพื่อทราบ-ลูกค้าขอเปลี่ยน/ยกเลิก/ เพิ่ม ชื่อผู้ติดต่อ/ชื่อผู้ให้ทวงถามหนี้',
    'แจ้งเพื่อทราบ-ลูกค้าขอเปลี่ยน/ยกเลิก/ เพิ่ม เบอร์ผู้ติดต่อ/เบอร์ผู้ให้ทวงถามหนี้',
  ];
  const actionCode = [
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'contact',
    'noContact',
    'noContact',
    'noContact',
    'noContact',
    'noContact',
    'noContact',
    'noContact',
    'letter',
    'letter',
    'letter',
    'letter',
    'letter',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
    'other',
  ];
  let count = 0;
  for (const statusCode of statusCodes) {
    await prisma.statusCodeDesc.create({
      data: {
        statusCode: statusCode,
        statusName: statusName[count],
        actionCode: actionCode[0],
        product: 'CBS',
      },
    });
    count += 1;
  }
};

const main = async () => {
  const prisma = new PrismaClient();
  await actionCodeData(prisma);
  await statusCodeData(prisma);
  await ruleBaseData(prisma);
  await userData(prisma);
  await userTypeData(prisma);
  await distData(prisma);
  await debtData(prisma);
  await userDataPartTwo(prisma);
  await settingData(prisma);
  await Scripts(prisma);
};

const heavyMain = async () => {
  console.log('====> heavy work !!!');
  const prisma = new PrismaClient();
  const count = 100;
  try {
    await organizationProfileData(prisma);
    // await organizationContractData(prisma);
    // await actionCodeData(prisma);
    // await statusCodeData(prisma);
    // await ruleBaseData(prisma);
    // await userTypeData(prisma);
    // await userDataH(prisma, 10, count);
    // await distData(prisma);
    // await settingData(prisma);
    // await producCodeData(prisma);
    // await debtDataH(prisma, count);
    // await Scripts(prisma);
  } catch (error) {
    console.log(error);
  }
};

const setting = async () => {
  const prisma = new PrismaClient();
  await settingData(prisma);
};
// void main();
void heavyMain();
