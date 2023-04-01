import { isCancel, outro, select, text } from "@clack/prompts";
import * as appConfig from "./config";
import color from "picocolors";
import { spawn } from "child_process";

const createProjectClis: any = [
  { platform: "angular", cli: "npm init @angular" },
  { platform: "nextjs", cli: "npx create-next-app@latest" },
  { platform: "nuxt", cli: "npx create-nuxt-app" },
  { platform: "remix", cli: "npx create-remix@latest" },
  { platform: "svelte", cli: "npm create svelte@latest" },
  { platform: "vuejs", cli: "npm init vue@latest" },
  { platform: "astro", cli: "npm create astro@latest" },
  { platform: "nestjs", cli: "npx nest new" },
  { platform: "emberjs", cli: "npx ember new" },
  { platform: "gatsby", cli: "npx gatsby new" },
];

const options = [
  {
    value: "angular",
    label: "Angular",
    hint: "Deliver web apps with confidence",
  },
  {
    value: "nextjs",
    label: "Next.js",
    hint: "The React framework for the web",
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
    hint: "The intuitive Vue framework",
  },
  {
    value: "remix",
    label: "Remix",
    hint: "Build better websites. Create modern, resilient user experiences with web fundamentals",
  },
  {
    value: "svelte",
    label: "SvelteKit",
    hint: "Rapidly developing robust, performant web applications using Svelte",
  },
  {
    value: "vuejs",
    label: "Vue.js",
    hint: "The progressive JavaScript framework",
  },
  {
    value: "astro",
    label: "Astro",
    hint: "Build the web you want",
  },
  {
    value: "nestjs",
    label: "NestJS",
    hint: "A progressive Node.js framework",
  },
  {
    value: "emberjs",
    label: "Ember.js",
    hint: "A framework for ambitious web developers",
  },
  {
    value: "gatsby",
    label: "Gatsby",
    hint: "The fastest frontend for the headless web",
  },
];

function mainMenuOptions() {
  // sort options by label

  options.sort((a: any, b: any) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  // add quit option

  options.push({
    value: "quit",
    label: "Quit",
    hint: "Quit the application",
  });

  return options;
}

export async function mainMenu(data: any) {
  // construct menu options and show menu

  const selectedMenu = await select({
    message: "Which framework do you want to use?",
    initialValue: data.selectedMainMenuValue,
    options: mainMenuOptions(),
  });

  if (isCancel(selectedMenu)) {
    quit();
  }

  if (selectedMenu === "quit") {
    quit();
  }

  const selectedProjectDir = await text({
    message: "Project name?",
    placeholder: "./project-name",
    validate: (value: string) => {
      if (value === "") return "Project name cannot be empty";
      if (value.includes(" ")) return "Spaces are not allowed";
    },
  });

  if (isCancel(selectedProjectDir)) {
    quit();
  }

  // handle menu selection

  createProject({
    selectedProject: selectedMenu,
    selectedProjectDir: selectedProjectDir,
  });
}

function createProject(data: any) {
  const child = spawn(
    `${
      createProjectClis.find(
        (cli: any) => cli.platform === data.selectedProject
      ).cli
    } ${data.selectedProjectDir}`,
    { stdio: "inherit", shell: true }
  );
  child.on("exit", () => {
    quit();
  });
}

function quit() {
  outro(
    `🙏 Thank you for using ${color.bgCyan(
      color.black(` ${appConfig.APP_NAME} `)
    )}!`
  );
  process.exit(0);
}
