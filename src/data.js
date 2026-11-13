/*
 * ============================================================
 *  PORTFOLIO KA SAARA CONTENT ISI FILE MEIN HAI
 * ============================================================
 *  - Text change karna ho: bas quotes '...' ke andar likh dein.
 *  - Naya project / job / skill add karna ho: maujooda { ... } block
 *    copy karke neeche paste karein aur values badal dein.
 *  - Images / CV: file ko `public/` folder mein daalein aur yahan
 *    '/file-name.jpg' likh dein.
 *  - Icons: https://lucide.dev/icons se naam dhoondein, upar import
 *    line mein add karein aur `icon:` mein use karein.
 *  - Save karte hi browser khud refresh ho jayega (npm run dev).
 * ============================================================
 */
import {
  Brain, Code, Server, Layers, Trophy, Megaphone, Rocket, Users, Search, FlaskConical, Puzzle, TrendingUp,
} from 'lucide-react'

// ---------- BASIC INFO ----------
export const profile = {
  name: 'Salman Ahmed',
  title: 'AI Engineer & Software Developer',
  // Hero mein yeh words ek ek karke type hote hain
  roles: ['AI Engineer', 'Computer Vision Developer', 'ML & NLP Engineer', 'Backend Developer'],
  tagline:
    "I like taking AI out of notebooks and turning it into things people can actually use. Lately that's meant fine-tuning Llama-3.1 on medical exam questions and running my own chatbot locally, along with the backends that hold everything together.",
  // About section ki sab se bari line
  intro: 'I turn data and models into software people can actually use.',
  bio: [
    "I'm an AI Engineer and Software Developer from Islamabad and a Computer Science graduate of COMSATS University. I work across the AI stack: fine-tuning LLMs like Llama-3.1 with QLoRA, running local models through Ollama, building computer vision and NLP systems, and training ML models such as a flight fare predictor with an R² score of 0.984.",
    "Right now I'm an IT Support Engineer at EMC Corporation, working on SAP-based enterprise workflows, system reliability and backend workflow automation. Before that I built ML pipelines at Arch Technologies and maintained backend systems at FBISE.",
  ],
  // About section ke chhote info boxes
  facts: [
    { label: 'Based in', value: 'Islamabad, Pakistan' },
    { label: 'Currently', value: 'IT Support Engineer @ EMC' },
    { label: 'Focus', value: 'GenAI · CV · ML · NLP' },
    { label: 'Education', value: 'BS CS, COMSATS' },
  ],
  location: 'Islamabad, Pakistan',
  status: 'BS Computer Science Graduate',
  available: true, // false karein to "Open to work" wali chalti patti chhup jayegi
  email: 'salmanmalikme11@gmail.com',
  phone: '', // number dikhana ho to yahan likh dein, jaise '+92-3XXXXXXXXX'. Khali = website par nahi dikhega
  // TODO: apne asli profile links yahan daalein
  linkedin: 'https://www.linkedin.com/in/salman-ahmed-a6b164362',
  github: 'https://github.com/salmanmalikme11',
  // CV ki PDF ko public/ folder mein isi naam se rakhein
  cv: '/Salman-Ahmed-CV.pdf',
  // Contact form ki key: https://web3forms.com par apna email daalein, key email mein aayegi, yahan paste karein.
  // Khali ho to form visitor ki email app khol deta hai.
  formKey: '4d5869bc-d571-4ebd-b45c-b5d3b39230ad',
}

// ---------- NAVBAR LINKS (id = section ka id) ----------
export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'skills', label: 'Stack' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

// ---------- ABOUT SECTION KE NUMBERS ----------
export const stats = [
  { value: 3, suffix: '', label: 'Professional roles' },
  { value: 8, suffix: '+', label: 'AI & software projects' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 4, suffix: '', label: 'Leadership roles & awards' },
]

// ---------- EXPERIENCE (sab se nayi job sab se upar) ----------
export const experience = [
  {
    role: 'IT Support Engineer',
    company: 'EMC Corporation',
    period: 'May 2026 — Present',
    current: true,
    points: [
      'Handle SAP-based enterprise workflows, including user issue resolution, system configuration and troubleshooting of internal business applications.',
      'Investigate application and workflow issues by analyzing user-reported problems and identifying configuration or system-level causes.',
      'Collaborate with engineering teams on software troubleshooting, system reliability improvements and backend workflow automation.',
    ],
    tags: ['SAP', 'Troubleshooting', 'Workflow Automation'],
  },
  {
    role: 'Generative AI Intern · Data & AI',
    company: 'Arch Technologies',
    period: 'Jun 2025 — Jul 2025',
    points: [
      'Developed machine learning solutions for spam detection and handwritten digit recognition on the MNIST dataset.',
      'Built data preprocessing pipelines to prepare text and image data for model training.',
      'Helped integrate trained models into application workflows for automated prediction.',
    ],
    tags: ['Machine Learning', 'NLP', 'Data Pipelines'],
  },
  {
    role: 'Web Development Intern',
    company: 'Federal Board of Intermediate and Secondary Education',
    period: 'Jul 2024 — Aug 2024',
    points: [
      'Maintained and debugged backend web systems used across the organization.',
      'Investigated software defects, traced root causes of backend issues and shipped fixes.',
      'Optimized existing application workflows to improve system behavior and reliability.',
    ],
    tags: ['Backend', 'Debugging', 'Optimization'],
  },
]

// ---------- PROJECTS ----------
// cover:   card ki picture (public/projects/covers/ mein). Apni image bhi laga sakte hain.
// summary: card par dikhne wali ek choti line. Baqi detail click karne par popup mein khulti hai.
// images:  popup mein dikhne wale screenshots ['/erp-1.png', '/erp-2.png']. Khali ho to cover dikhega.
// metrics: sirf asli numbers daalein, jaise { value: '92%', label: 'Accuracy' }. Khali chhor sakte hain.
// github / live: links. Khali ho to button nahi dikhega.
// liveLabel: (optional) live button ka text, jaise 'Open in Colab'. Na ho to 'View live'.
export const projects = [
  {
    title: 'Medical Q&A with QLoRA Fine-tuning',
    category: 'Generative AI',
    cover: '/projects/covers/medical-qlora.svg',
    summary: 'Fine-tuned Llama-3.1 8B on real medical exam questions, on a free Colab T4 GPU.',
    problem: 'General-purpose LLMs give unreliable answers to medical questions, and fully fine-tuning an 8B model needs far more GPU memory than a free Colab T4 has.',
    solution: 'Fine-tuned Llama-3.1 8B Instruct on MedMCQA (medical entrance exam questions) with QLoRA and Unsloth: a 4-bit base model with rank-16 LoRA adapters on every attention and MLP projection. Prompts use the Llama-3 chat template, and the loss is computed only on the answer token. The base and fine-tuned models are scored on the same 500 validation questions by comparing the logits for A/B/C/D, so the effect of fine-tuning is measured directly and does not depend on parsing generated text.',
    role: 'Research, fine-tuning & evaluation',
    stack: ['Python', 'Llama-3.1 8B', 'QLoRA', 'Unsloth', 'PEFT', 'Hugging Face', 'PyTorch', 'Google Colab'],
    images: [],
    metrics: [
      { value: '8B', label: 'Parameters, trained in 4-bit' },
      { value: '5,000', label: 'MedMCQA training questions' },
      { value: '500', label: 'Held-out eval questions' },
    ],
    github: 'https://github.com/salmanmalikme11/medical-qlora-finetuning',
    live: 'https://colab.research.google.com/github/salmanmalikme11/medical-qlora-finetuning/blob/main/Medical_QLoRA_Finetuning_Colab.ipynb',
    liveLabel: 'Open in Colab',
  },
  {
    title: 'Local LLM Chatbot',
    category: 'Generative AI',
    cover: '/projects/covers/llm-chatbot.svg',
    summary: 'A private ChatGPT-style app that runs LLaMA 3 on my own machine.',
    problem: 'Cloud chatbots send every conversation to a third-party server and charge per request, and a model running only in a terminal is unusable for non-technical people.',
    solution: 'A Streamlit chat app for LLaMA 3 running locally through the Ollama API. Replies stream in token by token like ChatGPT, and the full conversation is sent with every request so the model keeps context between turns. The model and host can be switched with environment variables, connection errors show a clear message, and nothing ever leaves the local machine.',
    role: 'Built end to end · Arch Technologies',
    stack: ['Python', 'Streamlit', 'Ollama', 'LLaMA 3', 'REST APIs'],
    images: [],
    metrics: [],
    github: 'https://github.com/salmanmalikme11/local-llm-chatbot',
    live: '',
  },
  {
    title: 'Flight Fare Prediction',
    category: 'Machine Learning',
    cover: '/projects/covers/flight-fare.svg',
    summary: 'Predicts ticket prices from 300K+ flights with an R² of 0.984.',
    problem: 'Flight prices swing with airline, route, time of day, class and how early you book, which makes fares hard for travellers to anticipate.',
    solution: 'An end-to-end regression pipeline on 300K+ real flight records: feature engineering on airline, city pair, departure/arrival time, class, duration and days left; visual analysis of pricing patterns; and a comparison of Linear Regression, Decision Tree, SVR, KNN and Random Forest. Random Forest came out on top.',
    role: 'Data analysis & ML modelling',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'Seaborn', 'Plotly'],
    images: [],
    metrics: [
      { value: '0.984', label: 'R² score (Random Forest)' },
      { value: '300K+', label: 'Flight records' },
      { value: '5', label: 'Models compared' },
    ],
    github: '',
    live: '',
  },
  {
    title: 'ERP Management System',
    category: 'Backend',
    cover: '/projects/covers/erp-system.svg',
    summary: 'Inventory, invoicing, ledgers and reports in one ASP.NET Core backend.',
    problem: 'Businesses juggle inventory, invoices and ledgers across disconnected tools, which leads to errors and no single source of truth.',
    solution: 'A modular ERP backend in ASP.NET Core 8 covering inventory, invoicing, ledger tracking and reporting, with clean OOP layers and PostgreSQL through Entity Framework Core.',
    role: 'Client project · Backend design & development (code is private)',
    stack: ['C#', 'ASP.NET Core 8', 'PostgreSQL', 'EF Core', 'OOP'],
    images: [],
    metrics: [],
    github: '',
    live: '',
  },
  {
    title: 'Wardrobe Genius',
    category: 'NLP',
    cover: '/projects/covers/wardrobe-genius.svg',
    summary: "Search for clothes the way you'd describe them, across many stores.",
    problem: 'Keyword search on fashion stores misses what shoppers mean, and products are scattered across many sites.',
    solution: 'A semantic clothing search engine: Scrapy crawls multiple stores, NLP understands the query, custom ranking logic orders results, and a React + TypeScript interface ties it together.',
    role: 'Full stack · NLP & scraping',
    stack: ['Python', 'Scrapy', 'NLP', 'React', 'TypeScript'],
    images: [],
    metrics: [],
    github: '',
    live: '',
  },
  {
    title: 'Digital Image Processing System',
    category: 'Computer Vision',
    cover: '/projects/covers/image-processing.svg',
    summary: 'Click-and-see desktop app for classic image processing techniques.',
    problem: 'Applying image processing techniques usually means writing code for every experiment, which slows down learning and analysis.',
    solution: 'A menu-driven desktop app with a clean Tkinter UI that applies histogram equalization, spatial filtering, frequency-domain processing, intensity transformations, pixel-level operations, edge detection and segmentation on any image, with results visualized side by side, no code needed.',
    role: 'Team project (2 members) · COMSATS',
    stack: ['Python', 'OpenCV', 'Matplotlib', 'Tkinter', 'NumPy'],
    images: [],
    metrics: [],
    github: '',
    live: '',
  },
  {
    title: 'Spam Detection Classifier',
    category: 'Machine Learning',
    cover: '/projects/covers/spam-detection.svg',
    summary: 'A text classifier that keeps spam out of the inbox.',
    problem: 'Spam messages flood inboxes and manual filtering does not scale.',
    solution: 'A text preprocessing pipeline and machine learning classifier that separates spam from legitimate messages, integrated into an application workflow for automated prediction.',
    role: 'ML engineering · Arch Technologies',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NLP'],
    images: [],
    metrics: [],
    github: '',
    live: '',
  },
  {
    title: 'Handwritten Digit Recognition',
    category: 'Machine Learning',
    cover: '/projects/covers/digit-recognition.svg',
    summary: 'A neural network that reads handwritten digits.',
    problem: 'Handwriting varies from person to person, so rule-based digit reading breaks easily.',
    solution: 'A neural network trained on the MNIST dataset with a preprocessing pipeline for image normalization, wired into an app workflow for automatic digit prediction.',
    role: 'ML engineering · Arch Technologies',
    stack: ['Python', 'TensorFlow', 'Keras', 'MNIST'],
    images: [],
    metrics: [],
    github: '',
    live: '',
  },
]

// ---------- PROCESS (main kaise kaam karta hoon) ----------
export const workProcess = [
  { icon: Search, title: 'Understand', text: 'Dig into the real problem, the users and the data before writing a line of code.' },
  { icon: FlaskConical, title: 'Prototype', text: 'Explore the data, build a quick model or API, and validate the approach early.' },
  { icon: Puzzle, title: 'Build & integrate', text: 'Turn the prototype into clean, tested code and wire it into the real system.' },
  { icon: TrendingUp, title: 'Ship & improve', text: 'Deploy, measure, fix what breaks and keep improving reliability.' },
]

// ---------- SKILLS ----------
export const skillGroups = [
  {
    title: 'AI & Data Science',
    icon: Brain,
    items: ['Machine Learning', 'Computer Vision', 'NLP', 'LLM Fine-tuning (QLoRA)', 'Pattern Recognition', 'Feature Engineering', 'Model Evaluation', 'Data Visualization', 'PyTorch', 'Hugging Face Transformers', 'PEFT / LoRA', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    title: 'Languages & Databases',
    icon: Code,
    items: ['Python', 'C++', 'C#', 'TypeScript', 'JavaScript', 'SQL', 'PostgreSQL'],
  },
  {
    title: 'Backend & Web',
    icon: Server,
    items: ['ASP.NET Core 8', 'FastAPI', 'REST APIs', 'Entity Framework Core', 'Node.js', 'Express.js', 'React', 'Tailwind CSS', 'Streamlit', 'MongoDB', 'Supabase'],
  },
  {
    title: 'Tools & Platforms',
    icon: Layers,
    items: ['Git', 'Linux', 'Firebase', 'Ollama', 'LLMs', 'Scrapy', 'SAP', 'Data Pipelines'],
  },
]

// Skills section ke neeche chalne wali patti
export const marquee = ['Python', 'Llama-3.1', 'QLoRA', 'Unsloth', 'Hugging Face', 'PyTorch', 'Ollama', 'TensorFlow', 'OpenCV', 'Keras', 'Scikit-learn', 'FastAPI', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Scrapy', 'Supabase', 'Streamlit', 'C#', 'C++', 'Git', 'SAP']

// ---------- EDUCATION ----------
export const education = {
  degree: 'BS Computer Science',
  school: 'COMSATS University Islamabad',
  period: '2022 — 2026',
  focus: ['Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Pattern Recognition', 'Feature Engineering', 'Data Pipelines'],
  coursework: ['OOP', 'Data Structures & Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Digital Image Processing'],
}

// ---------- LEADERSHIP & AWARDS (award: true = golden card) ----------
export const leadership = [
  {
    title: '1st Position — Bizz Buzz',
    org: 'Business Idea Competition · Dept. of Management Sciences, CUI',
    period: '2023',
    icon: Trophy,
    award: true,
    text: 'Won first place in a university-level competition for business idea development and presentation.',
  },
  {
    title: 'Vice President',
    org: 'Student Startup Business Society (SSBS)',
    period: 'Sep 2025 — Jan 2026',
    icon: Rocket,
    text: 'Led student teams and coordinated entrepreneurship and technology workshops, from planning through execution.',
  },
  {
    title: 'Media & Marketing Head',
    org: 'COMSATS Heritage Society (CHS)',
    period: 'May 2025 — Jan 2026',
    icon: Megaphone,
    text: 'Ran digital campaigns, recruitment drives and society branding; planned promotional content for events.',
  },
  {
    title: 'Marketing Head',
    org: 'COMECS Society, CUI',
    period: '2025',
    icon: Users,
    text: "Promoted for dedication and leadership; led marketing and outreach initiatives behind the society's growth.",
  },
]
