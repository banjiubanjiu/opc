// 站点全局配置:名称、理念、联系信息(运营时只改这里)
export const site = {
  name: 'OPC 一人公司社区',
  shortName: 'OPC',
  slogan: '一人公司最难的往往不是产品,是没人商量。',
  // 核心理念(文案来自真实材料,见 docs/03-copy.md)
  mission: {
    quote: '我们能不能通过科技缓解人们的苦楚,帮助有需要的人群?',
    quoteSource: '马化腾《科技向善》,2019',
    principles: [
      { title: '有用', desc: '只做真实有益的事,解决真问题,不制造假需求。' },
      { title: '诚实', desc: '不夸大、不助长炒作,把一人公司还原为一种工作方式。' },
      { title: '无害', desc: '对所作所为负责,不让产品伤害任何人。' },
    ],
  },
  contact: {
    wechat: 'opc-community',
    email: 'hello@opc-community.cn',
  },
  // 报名表单后端端点(部署 Cloudflare Worker 后填入;留空则本地演示提交)
  formEndpoint: '',
};

// 活动数据:运营时新增/修改活动只改这里
export interface Activity {
  slug: string;
  title: string;
  city: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  fee: string;
  capacity: string;
  host: string;
  stage: string;
  intro: string;
  agenda: { time: string; item: string }[];
  speakers: { name: string; role: string }[];
  note: string;
  featured?: boolean;
}

export const activities: Activity[] = [
  {
    slug: 'foshan-coffee-chat-01',
    title: 'Coffee Chat · 佛山站:一人公司的一天',
    city: '佛山',
    date: '2026-08-22',
    time: '14:00 – 17:00',
    venue: '报名后通知(禅城区)',
    fee: '公益活动,仅需支付 49 元茶水费',
    capacity: '限 12 人',
    host: 'OPC 社区 · 佛山',
    stage: '想法 / 验证期',
    intro:
      '没有主题演讲,只有真实的人。每人 10 分钟介绍自己在做的事、卡住的地方,其余时间留给提问与讨论。',
    agenda: [
      { time: '14:00', item: '签到,破冰' },
      { time: '14:30', item: '每人 10 分钟:我在做的事 / 我卡在哪' },
      { time: '16:00', item: '自由讨论:AI 工具、获客、定价' },
      { time: '16:45', item: '一句话总结 & 合影' },
    ],
    speakers: [],
    note: '名额有限,报名后请留意微信通知。临时来不了请提前取消,把位置留给同行的人。',
    featured: true,
  },
  {
    slug: 'guangzhou-salon-01',
    title: '闭门沙龙 · 广州站:AI 解决了什么,又没解决什么',
    city: '广州',
    date: '2026-09-05',
    time: '14:00 – 17:30',
    venue: '报名后通知(天河区)',
    fee: '公益活动,仅需支付 49 元茶水费',
    capacity: '限 16 人',
    host: 'OPC 社区 · 广州',
    stage: '验证 / MVP 期',
    intro:
      '邀请 3 位把 AI 用在真实业务里的实践者,每人 20 分钟讲清一个环节:获客、交付、客服。不讲风口,只讲踩过的坑。',
    agenda: [
      { time: '14:00', item: '签到' },
      { time: '14:30', item: '嘉宾分享 ×3(各 20 分钟)' },
      { time: '15:45', item: '茶歇' },
      { time: '16:15', item: '圆桌:AI 没有解决什么' },
      { time: '17:00', item: '自由交流' },
    ],
    speakers: [
      { name: '待定', role: '实践者分享(报名后公布)' },
    ],
    note: '闭门沙龙,内容不外传。报名即默认同意。',
  },
];
