import dayjs from "dayjs";

export const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080";

export const AUTH_URL = `${BASE_API_URL}/api/auth/users`;
export const ADMIN_HUB_BASE_PATH = "workspace-hub";
export const USER_HUB_BASE_PATH = "user-hub";
export const API_URL = `${BASE_API_URL}/api/`;
export const WORKSPACE_URL = "REMOVE!";

export const ADMIN_WORKSPACE_URL = `${BASE_API_URL}/api/${ADMIN_HUB_BASE_PATH}`;
export const USER_WORKSPACE_URL = `${BASE_API_URL}/api/${USER_HUB_BASE_PATH}`;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/heic",
  "image/heif",
  "application/pdf",
];

export const DRAWER_WIDTH = 270;
export const MINI_DRAWER_WIDTH = 60;
export const HEADER_HEIGHT = 60;

export const DEFAULT_ACTIVITY_DURATION = 8;
export const DEFAULT_DAILY_REPORT_TOTAL_HOURS = 24;

export const DEFAULT_PAGINATION_LIMIT = 10;

export const FEEDBACK_EMAIL_LIST =
  process.env.EMAIL_LIST ?? "anjas.lecnik@gmail.com";

export const WORKSPACE_HUB_PATH = "/workspace-hub";
export const USER_HUB_PATH = "/user-hub";

export const DEFAULT_PROJECT_DATE_FORMAT = "DD. MMM, YYYY";

export const CURRENT_YEAR = dayjs().year();
export const LAST_YEAR = CURRENT_YEAR - 1;

export const DEFAULT_ABSENCE_END_DATE_RANGE = 6; //months
export const DEFAULT_ACTIVITIES_END_DATE_RANGE = 7; //days
export const YEAR_PERFORMANCE_REVIEW_QUARTALS = ["Q1", "Q2", "Q3", "Q4"];
export const RATING_SCALE = [
  "strongly agree",
  "agree",
  "neutral",
  "disagree",
  "strongly disagree",
];

export const QUOTES = [
  { content: "Hold my beer while I do awesome shit!" },
  { content: "I just awesomed all over the place!" },
  { content: "The only way to do great is to love what you do!" },
  { content: "We work to become, not to acquire!" },
  { content: "I love the whooshing noise when the deadlines go by!" },
  { content: "Out of clutter, find simplicity!" },
  {
    content:
      "Nothing is really work unless you would rather be doing something else!",
  },
  { content: "Pleasure in the job puts perfection in the work!" },
  {
    content:
      "The difference between ordinary and extraordinary is that little extra!",
  },
  { content: "Your work speaks volumes of the kind of the human you are." },
  { content: "Alone we can do so little, together we can do so much." },
  {
    content:
      "It's hard to beat a person who never gives up! Keep up the good work!",
  },
  { content: "Yay, you are such a fruit loop in a world full of cheerios!" },
  { content: "Thank you for being awesome today! Now go get some fun!" },
  {
    content: "“There are no shortcuts to any place worth going.”",
    author: "Beverly Sills",
  },
  {
    content:
      "“If I had nine hours to chop down a tree, I'd spend the first six sharpening my axe.”",
    author: "Abraham Lincoln",
  },
  {
    content: "“To accomplish great things, we must dream as well as act.”",
    author: "Anatole France",
  },
  {
    content:
      "“If you reach for the stars, you just might land on a decently sized hill.”",
    author: "Stuart Hill",
  },
  {
    content:
      "“Go as far as you can see; when you get there, you'll be able to see further.”",
    author: "Thomas Carlyle",
  },
  {
    content:
      "“Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.”",
    author: "Earl Nightingale",
  },
  {
    content: "“Believe you can and you're halfway there.”",
    author: "Theodore Roosevelt",
  },
  {
    content:
      "“When we strive to become better than we are, everything around us becomes better too.”",
    author: "Paulo Coelho",
  },
  {
    content:
      "“Success is the sum of small efforts repeated day in and day out.”",
    author: "Robert Collier",
  },
  {
    content:
      "“Coming together is a beginning, keeping together is progress, working together is success.”",
    author: "Henry Ford",
  },
  {
    content:
      "“The trouble with most of us is that we'd rather be ruined by praise than saved by criticism.”",
    author: "Norman Vincent Peale",
  },
  {
    content: "“Don't wish it were easier. Wish you were better.”",
    author: "Jim Rohn",
  },
  {
    content:
      "“I'm a great believer in luck, and I find the harder I work the more I have of it.”",
    author: "Thomas Jefferson",
  },
  {
    content:
      "“Do the hard jobs first. The easy jobs will take care of themselves.”",
    author: "Dale Carnegie",
  },
  {
    content:
      "“Try not to become a person of success, but rather try to become a person of value.”",
    author: "Albert Einstein",
  },
  {
    content:
      "“Learn from the mistakes of others. You can't live long enough to make them all yourselves.”",
    author: "Chanakya",
  },
  {
    content:
      "“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.”",
    author: "Stephen King",
  },
];
