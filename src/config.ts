import { name, version } from "../package.json";

export const appName = name;
export const appVersion = version;

export const projectTypeOptions = [
  {
    value: "angular",
    label: "Angular",
    hint: "Deliver web apps with confidence",
    cli: "npm init @angular",
  },
  {
    value: "nextjs",
    label: "Next.js",
    hint: "The React framework for the web",
    cli: "npx create-next-app@latest",
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
    hint: "The intuitive Vue framework",
    cli: "npx create-nuxt-app",
  },
  {
    value: "remix",
    label: "Remix",
    hint: "Build better websites. Create modern, resilient user experiences with web fundamentals",
    cli: "npx create-remix@latest",
  },
  {
    value: "svelte",
    label: "SvelteKit",
    hint: "Rapidly developing robust, performant web applications using Svelte",
    cli: "npm create svelte@latest",
  },
  {
    value: "vuejs",
    label: "Vue.js",
    hint: "The progressive JavaScript framework",
    cli: "npm init vue@latest",
  },
  {
    value: "astro",
    label: "Astro",
    hint: "Build the web you want",
    cli: "npm create astro@latest",
  },
  {
    value: "nestjs",
    label: "NestJS",
    hint: "A progressive Node.js framework",
    cli: "npx nest new",
  },
  {
    value: "emberjs",
    label: "Ember.js",
    hint: "A framework for ambitious web developers",
    cli: "npx ember new",
  },
  {
    value: "gatsby",
    label: "Gatsby",
    hint: "The fastest frontend for the headless web",
    cli: "npx gatsby new",
  },
  {
    value: "qwik",
    label: "Qwik",
    hint: "Framework reimagined for the edge!",
    cli: "npm create qwik@latest",
  },
  {
    value: "sails",
    label: "Sails",
    hint: "Realtime MVC framework for Node.js",
    cli: "npx sails new",
  },
  {
    value: "vite",
    label: "Vite",
    hint: "Next Generation Frontend Tooling",
    cli: "npm create vite@latest",
  },
  {
    value: "aurelia",
    label: "Aurelia",
    hint: "Simple. Powerful. Unobtrusive.",
    cli: "npx aurelia-cli new",
  },
  {
    value: "solidstart",
    label: "SolidStart",
    hint: "The Solid app framework",
    cli: "npm init solid@latest",
  },
  {
    value: "preact",
    label: "Preact",
    hint: "A different kind of library",
    cli: "npx preact-cli create default",
  },
  {
    value: "createreactapp",
    label: "React (create-react-app)",
    hint: "Set up a modern web app by running one command",
    cli: "npx create-react-app",
  },
  {
    value: "adonisjs",
    label: "AdonisJS",
    hint: "A fully featured web framework for Node.js",
    cli: "npm init adonis-ts-app@latest",
  },
  {
    value: "solidjs",
    label: "SolidJS",
    hint: "Reactive Javascript Library",
    cli: "",
  },
  {
    value: "inferno",
    label: "Inferno",
    hint: "An extremely fast, React-like JavaScript library",
    cli: "npx degit infernojs/inferno-boilerplate",
  },
  {
    value: "react_redux",
    label: "React Redux",
    hint: "A predictable state container for JavaScript apps",
    cli: "",
  },
];
