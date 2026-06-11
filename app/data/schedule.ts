export type Category = 'genai' | 'dsa' | 'core' | 'company' | 'jobs' | 'cloud' | 'break';

export interface Block {
  id: string;
  time: string;
  cat: Category;
  name: string;
  sub: string;
  isBreak?: boolean;
}

export interface DaySchedule {
  dayIndex: number; // 0=Mon...6=Sun
  name: string;
  type: string;
  hours: string;
  blocks: Block[];
}

export const CATEGORY_STYLES: Record<Category, { bg: string; dot: string; text: string; label: string }> = {
  genai:   { bg: 'var(--genai-bg)',   dot: 'var(--genai)',   text: 'var(--genai-text)',   label: 'GenAI / MLOps' },
  dsa:     { bg: 'var(--dsa-bg)',     dot: 'var(--dsa)',     text: 'var(--dsa-text)',     label: 'DSA' },
  core:    { bg: 'var(--core-bg)',    dot: 'var(--core)',    text: 'var(--core-text)',    label: 'Core subjects' },
  company: { bg: 'var(--company-bg)', dot: 'var(--company)', text: 'var(--company-text)', label: 'Company prep' },
  jobs:    { bg: 'var(--jobs-bg)',    dot: 'var(--jobs)',    text: 'var(--jobs-text)',    label: 'Jobs / outreach' },
  cloud:   { bg: 'var(--cloud-bg)',   dot: 'var(--cloud)',   text: 'var(--cloud-text)',   label: 'Cloud / DevOps' },
  break:   { bg: 'var(--break-bg)',   dot: 'var(--break)',   text: 'var(--break-text)',   label: 'Break' },
};

export const SCHEDULE: DaySchedule[] = [
  {
    dayIndex: 0,
    name: 'Monday',
    type: 'GenAI-heavy',
    hours: '9.5 hrs',
    blocks: [
      { id: 'mon-dsa',     time: '6:30–7:30',  cat: 'dsa',     name: 'DSA',              sub: '1 Graphs/DP hard + 2 revision Qs' },
      { id: 'mon-break1',  time: '7:30–8:00',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'mon-genai1',  time: '8:00–10:30', cat: 'genai',   name: 'GenAI / MLOps',    sub: 'RAG concepts + LangChain basics' },
      { id: 'mon-cloud',   time: '10:30–11:00',cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'AWS EC2 / S3 fundamentals' },
      { id: 'mon-core',    time: '11:00–12:00',cat: 'core',    name: 'Core subjects',     sub: 'OS — processes & scheduling' },
      { id: 'mon-break2',  time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'mon-genai2',  time: '13:00–14:30',cat: 'genai',   name: 'GenAI project',    sub: 'Build RAG pipeline or agent' },
      { id: 'mon-company', time: '14:30–15:15',cat: 'company', name: 'Company prep',      sub: 'Research target companies' },
      { id: 'mon-jobs',    time: '15:15–16:00',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Apply + LinkedIn cold DMs' },
    ],
  },
  {
    dayIndex: 1,
    name: 'Tuesday',
    type: 'Core-heavy',
    hours: '9 hrs',
    blocks: [
      { id: 'tue-dsa',     time: '6:30–7:30',  cat: 'dsa',     name: 'DSA',              sub: '1 DP hard + 2 revision Qs (trees/strings)' },
      { id: 'tue-break1',  time: '7:30–8:00',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'tue-genai',   time: '8:00–9:30',  cat: 'genai',   name: 'GenAI / MLOps',    sub: 'LangGraph + agent architecture' },
      { id: 'tue-cloud',   time: '9:30–10:00', cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'Docker networking & volumes' },
      { id: 'tue-core1',   time: '10:00–12:00',cat: 'core',    name: 'Core subjects',     sub: 'DBMS — normalisation, SQL queries' },
      { id: 'tue-break2',  time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'tue-core2',   time: '13:00–14:30',cat: 'core',    name: 'Core subjects',     sub: 'System Design — HLD concepts' },
      { id: 'tue-company', time: '14:30–15:15',cat: 'company', name: 'Company prep',      sub: 'OA-style practice (DSA + aptitude)' },
      { id: 'tue-jobs',    time: '15:15–16:00',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Apply to openings, cold emails' },
    ],
  },
  {
    dayIndex: 2,
    name: 'Wednesday',
    type: 'GenAI-heavy',
    hours: '9.5 hrs',
    blocks: [
      { id: 'wed-dsa',     time: '6:30–7:30',  cat: 'dsa',     name: 'DSA',              sub: '1 Graphs hard + 2 revision Qs (stack/greedy)' },
      { id: 'wed-break1',  time: '7:30–8:00',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'wed-genai1',  time: '8:00–10:30', cat: 'genai',   name: 'GenAI / MLOps',    sub: 'Vector DBs + model serving (FastAPI)' },
      { id: 'wed-cloud',   time: '10:30–11:00',cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'Kubernetes pods & deployments' },
      { id: 'wed-core',    time: '11:00–12:00',cat: 'core',    name: 'Core subjects',     sub: 'CN — TCP/IP, HTTP, DNS' },
      { id: 'wed-break2',  time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'wed-genai2',  time: '13:00–14:30',cat: 'genai',   name: 'GenAI project',    sub: 'Dockerise + deploy AI service' },
      { id: 'wed-company', time: '14:30–15:15',cat: 'company', name: 'Company prep',      sub: 'Behavioral Qs + STAR stories' },
      { id: 'wed-jobs',    time: '15:15–16:00',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'LinkedIn DMs + portfolio share' },
    ],
  },
  {
    dayIndex: 3,
    name: 'Thursday',
    type: 'Core-heavy',
    hours: '9 hrs',
    blocks: [
      { id: 'thu-dsa',     time: '6:30–7:30',  cat: 'dsa',     name: 'DSA',              sub: '1 DP hard + 2 revision Qs (backtracking)' },
      { id: 'thu-break1',  time: '7:30–8:00',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'thu-genai',   time: '8:00–9:30',  cat: 'genai',   name: 'GenAI / MLOps',    sub: 'MLOps — experiment tracking, drift' },
      { id: 'thu-cloud',   time: '9:30–10:00', cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'GCP / Azure intro + compute' },
      { id: 'thu-core1',   time: '10:00–12:00',cat: 'core',    name: 'Core subjects',     sub: 'OS — memory management, deadlocks' },
      { id: 'thu-break2',  time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'thu-core2',   time: '13:00–14:30',cat: 'core',    name: 'Core subjects',     sub: 'System Design — LLD, design patterns' },
      { id: 'thu-company', time: '14:30–15:15',cat: 'company', name: 'Company prep',      sub: 'Mock interview Qs (company-specific)' },
      { id: 'thu-jobs',    time: '15:15–16:00',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Apply to openings, cold emails' },
    ],
  },
  {
    dayIndex: 4,
    name: 'Friday',
    type: 'Deep project + full mock',
    hours: '10 hrs',
    blocks: [
      { id: 'fri-dsa',     time: '6:30–7:30',  cat: 'dsa',     name: 'DSA',              sub: '1 Graphs hard + 2 revision Qs (arrays)' },
      { id: 'fri-break1',  time: '7:30–8:00',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'fri-genai',   time: '8:00–11:00', cat: 'genai',   name: 'GenAI deep project',sub: 'End-to-end feature build session' },
      { id: 'fri-cloud',   time: '11:00–11:30',cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'Terraform / CI-CD pipelines' },
      { id: 'fri-core',    time: '11:30–12:00',cat: 'core',    name: 'Core subjects',     sub: 'CN — load balancing, CDN, caching' },
      { id: 'fri-break2',  time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'fri-company1',time: '13:00–15:00',cat: 'company', name: 'Company mock (2 hrs)',sub: 'Full timed OA mock — target company' },
      { id: 'fri-jobs',    time: '15:00–15:30',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Apply + follow-up emails' },
      { id: 'fri-company2',time: '15:30–16:30',cat: 'company', name: 'Mock debrief',      sub: 'Review mistakes + notes' },
    ],
  },
  {
    dayIndex: 5,
    name: 'Saturday',
    type: 'GenAI-heavy',
    hours: '9.5 hrs',
    blocks: [
      { id: 'sat-dsa',     time: '7:00–8:00',  cat: 'dsa',     name: 'DSA',              sub: '1 medium + 2 revision Qs (mixed)' },
      { id: 'sat-break1',  time: '8:00–8:30',  cat: 'break',   name: 'Break',            sub: 'Breakfast', isBreak: true },
      { id: 'sat-genai1',  time: '8:30–11:00', cat: 'genai',   name: 'GenAI / MLOps',    sub: 'Agents deep-dive + LangChain tools' },
      { id: 'sat-cloud',   time: '11:00–11:30',cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'CI/CD with GitHub Actions' },
      { id: 'sat-core',    time: '11:30–12:30',cat: 'core',    name: 'Core subjects',     sub: 'DBMS — transactions, indexing, NoSQL' },
      { id: 'sat-break2',  time: '12:30–13:30',cat: 'break',   name: 'Break',            sub: 'Lunch + rest', isBreak: true },
      { id: 'sat-genai2',  time: '13:30–15:30',cat: 'genai',   name: 'GenAI project',    sub: 'Polish & document project; push to GitHub' },
      { id: 'sat-company', time: '15:30–16:30',cat: 'company', name: 'Company prep',      sub: 'Research + behavioral Qs bank review' },
      { id: 'sat-jobs',    time: '16:30–17:00',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Weekly apply sprint (15–20 openings)' },
    ],
  },
  {
    dayIndex: 6,
    name: 'Sunday',
    type: 'Light / rest day',
    hours: '~5 hrs',
    blocks: [
      { id: 'sun-dsa',     time: '8:00–9:00',  cat: 'dsa',     name: 'DSA revision',     sub: 'Light review — revisit weak topics' },
      { id: 'sun-genai',   time: '9:00–10:30', cat: 'genai',   name: 'GenAI reading',     sub: 'Papers, blogs, watch talk (passive)' },
      { id: 'sun-cloud',   time: '10:30–11:00',cat: 'cloud',   name: 'Cloud / DevOps',   sub: 'Watch tutorial — AWS / K8s concept' },
      { id: 'sun-core',    time: '11:00–12:00',cat: 'core',    name: 'Core subjects',     sub: 'System Design flashcard review' },
      { id: 'sun-break',   time: '12:00–13:00',cat: 'break',   name: 'Break',            sub: 'Lunch + free time', isBreak: true },
      { id: 'sun-jobs',    time: '13:00–13:30',cat: 'jobs',    name: 'Jobs / outreach',   sub: 'Weekly tracker update + wishlist' },
      { id: 'sun-company', time: '13:30–14:00',cat: 'company', name: 'Week ahead plan',   sub: 'Set targets for next 7 days' },
    ],
  },
];

// Given a blockId, find the same category's next occurrence across the week
export function getNextOccurrence(blockId: string, cat: Category): { dayName: string; blockName: string; time: string } | null {
  const flatBlocks: { dayName: string; block: Block }[] = [];
  for (const day of SCHEDULE) {
    for (const block of day.blocks) {
      flatBlocks.push({ dayName: day.name, block });
    }
  }
  const idx = flatBlocks.findIndex(f => f.block.id === blockId);
  if (idx === -1) return null;
  for (let i = idx + 1; i < flatBlocks.length; i++) {
    if (flatBlocks[i].block.cat === cat && !flatBlocks[i].block.isBreak) {
      return {
        dayName: flatBlocks[i].dayName,
        blockName: flatBlocks[i].block.name,
        time: flatBlocks[i].block.time,
      };
    }
  }
  // Wrap around to beginning of week
  for (let i = 0; i < idx; i++) {
    if (flatBlocks[i].block.cat === cat && !flatBlocks[i].block.isBreak) {
      return {
        dayName: flatBlocks[i].dayName,
        blockName: flatBlocks[i].block.name,
        time: flatBlocks[i].block.time,
      };
    }
  }
  return null;
}
