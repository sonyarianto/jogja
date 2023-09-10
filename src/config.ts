import { name, version } from "../package.json";

export const appName = name;
export const appVersion = version;
export const dataPerPage = 8;

export const projectTypeOptions = [
  {
    value: "angular",
    label: "Angular",
    hint: "Deliver web apps with confidence",
    cli: "npm init @angular",
    category: "JS",
  },
  {
    value: "nextjs",
    label: "Next.js",
    hint: "The React framework for the web",
    cli: "npx create-next-app@latest",
    category: "JS",
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
    hint: "The intuitive Vue framework",
    cli: "npx create-nuxt-app",
    category: "JS",
  },
  {
    value: "remix",
    label: "Remix",
    hint: "Build better websites. Create modern, resilient user experiences with web fundamentals",
    cli: "npx create-remix@latest",
    category: "JS",
  },
  {
    value: "svelte",
    label: "SvelteKit",
    hint: "Rapidly developing robust, performant web applications using Svelte",
    cli: "npm create svelte@latest",
    category: "JS",
  },
  {
    value: "vuejs",
    label: "Vue.js",
    hint: "The progressive JavaScript framework",
    cli: "npm init vue@latest",
    category: "JS",
  },
  {
    value: "astro",
    label: "Astro",
    hint: "Build the web you want",
    cli: "npm create astro@latest",
    category: "JS",
  },
  {
    value: "nestjs",
    label: "NestJS",
    hint: "A progressive Node.js framework",
    cli: "npx nest new",
    category: "JS",
  },
  {
    value: "emberjs",
    label: "Ember.js",
    hint: "A framework for ambitious web developers",
    cli: "npx ember new",
    category: "JS",
  },
  {
    value: "gatsby",
    label: "Gatsby",
    hint: "The fastest frontend for the headless web",
    cli: "npx gatsby new",
    category: "JS",
  },
  {
    value: "qwik",
    label: "Qwik",
    hint: "Framework reimagined for the edge!",
    cli: "npm create qwik@latest",
    category: "JS",
  },
  {
    value: "sails",
    label: "Sails",
    hint: "Realtime MVC framework for Node.js",
    cli: "npx sails new",
    category: "JS",
  },
  {
    value: "vite",
    label: "Vite",
    hint: "Next Generation Frontend Tooling",
    cli: "npm create vite@latest",
    category: "JS",
  },
  {
    value: "aurelia",
    label: "Aurelia",
    hint: "Simple. Powerful. Unobtrusive.",
    cli: "npx aurelia-cli new",
    category: "JS",
  },
  {
    value: "solidstart",
    label: "SolidStart",
    hint: "The Solid app framework",
    cli: "npm init solid@latest",
    category: "JS",
  },
  {
    value: "preact",
    label: "Preact",
    hint: "A different kind of library",
    cli: "npx preact-cli create default",
    category: "JS",
  },
  {
    value: "createreactapp",
    label: "React (create-react-app/CRA)",
    hint: "Set up a modern web app by running one command",
    cli: "npx create-react-app",
    category: "JS",
  },
  {
    value: "adonisjs",
    label: "AdonisJS",
    hint: "A fully featured web framework for Node.js",
    cli: "npm init adonis-ts-app@latest",
    category: "JS",
  },
  {
    value: "solidjs",
    label: "SolidJS",
    hint: "Reactive Javascript Library",
    cli: "",
    category: "JS",
  },
  {
    value: "stencil",
    label: "Stencil",
    hint: "Build. Customize. Distribute. Adopt.",
    cli: "npm init stencil",
    category: "JS",
  },
  {
    value: "quasar",
    label: "Quasar",
    hint: "The enterprise-ready cross-platform VueJs framework",
    cli: "npm init quasar",
    category: "JS",
  },
  {
    value: "inferno",
    label: "Inferno",
    hint: "An extremely fast, React-like JavaScript library",
    cli: "npx degit infernojs/inferno-boilerplate",
    category: "JS",
  },
  {
    value: "reactredux",
    label: "React Redux",
    hint: "A predictable state container for JavaScript apps",
    cli: "",
    category: "JS",
  },
  {
    value: "expressjs",
    label: "Express.js",
    hint: "Node.js web application framework",
    cli: "npx express-generator",
    category: "JS",
  },
  {
    value: "nx",
    label: "Nx",
    hint: "Smart, fast and extensible build system",
    cli: "npx create-nx-workspace@latest",
    category: "JS",
  },
  {
    value: "blitzjs",
    label: "Blitz.js",
    hint: "The missing fullstack toolkit for Next.js",
    cli: "npx blitz new",
    category: "JS",
  },
  {
    value: "vitepress",
    label: "VitePress",
    hint: "Vite & Vue powered static site generator",
    cli: "npx vitepress init",
    category: "JS",
  },
  {
    value: "openwebcomponents",
    label: "Open Web Components",
    hint: "Web component project scaffolding",
    cli: "npm init @open-wc",
    category: "JS",
  },
  {
    value: "docusaurus",
    label: "Docusaurus",
    hint: "Build optimized websites quickly, focus on your content",
    cli: "npx create-docusaurus@latest",
    category: "JS",
  },
  {
    value: "hexo",
    label: "Hexo",
    hint: "A fast, simple & powerful blog framework",
    cli: "npx hexo-cli init",
    category: "JS",
  },
  {
    value: "vuepress",
    label: "VuePress",
    hint: "Vue-powered static site generator",
    cli: "npx create-vuepress-site",
    category: "JS",
  },
  {
    value: "gridsome",
    label: "Gridsome",
    hint: "Modern site generator for Vue.js",
    cli: "npx @gridsome/cli create",
    category: "JS",
  },
  {
    value: "analogjs",
    label: "Analog",
    hint: "The fullstack Angular meta-framework",
    cli: "npm create analog@latest",
    category: "JS",
  },
  {
    value: "nitro",
    label: "Nitro",
    hint: "Create web servers that run anywhere",
    cli: "npx giget@latest nitro",
    category: "JS",
  },
  {
    value: "redwoodjs",
    label: "RedwoodJS",
    hint: "The app framework for startups",
    cli: "npx create-redwood-app",
    category: "JS",
  },
  {
    value: "medusa",
    label: "Medusa",
    hint: "Building blocks for digital commerce",
    cli: "npx create-medusa-app",
    category: "JS",
  },
  {
    value: "vuetify",
    label: "Vuetify",
    hint: "A Vue Component Framework",
    cli: "npx create-vuetify",
    category: "JS",
  },
  {
    value: "expo",
    label: "Expo",
    hint: "Make any app. Run it everywhere.",
    cli: "npx create-expo-app",
    category: "JS",
  },
  {
    value: "fastify",
    label: "Fastify",
    hint: "Fast and low overhead web framework, for Node.js",
    cli: "npx fastify-cli generate",
    category: "JS",
  },
  {
    value: "alpinejs",
    label: "Alpine.js",
    hint: "A rugged, minimal tool for composing behavior directly in your markup.",
    cli: "npx create-alpine-app",
    category: "JS",
  },
];
