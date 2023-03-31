import { isCancel, outro, select, text } from "@clack/prompts";
import * as appConfig from "./config";
import color from "picocolors";
import { spawn } from "child_process";

let createProjectClis: any = [
  { platform: "2", cli: "npx create-next-app@latest" },
  { platform: "3", cli: "npx create-nuxt-app" },
  { platform: "4", cli: "npx create-remix@latest" },
  { platform: "5", cli: "npm create svelte@latest" },
  { platform: "6", cli: "npm init vue@latest" },
  { platform: "7", cli: "npm create astro@latest" },
];

function mainMenuOptions() {
  const options = [
    // {
    //   value: "1",
    //   label: "Angular",
    //   hint: "Deliver web apps with confidence",
    // },
    {
      value: "7",
      label: "Astro",
      hint: "Build the web you want",
    },
    {
      value: "2",
      label: "Next.js",
      hint: "The React framework for the web",
    },
    {
      value: "3",
      label: "Nuxt.js",
      hint: "The intuitive Vue framework",
    },
    {
      value: "4",
      label: "Remix",
      hint: "Build better websites. Create modern, resilient user experiences with web fundamentals",
    },
    {
      value: "5",
      label: "SvelteKit",
      hint: "Rapidly developing robust, performant web applications using Svelte",
    },
    {
      value: "6",
      label: "Vue.js",
      hint: "The progressive JavaScript framework",
    },
  ];

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
    message: "What kind of project do you want to create?",
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
    message: "Name of the project?",
    placeholder: "./project-name",
    validate: (value: string) => {
      if (value === "") return "Connection name cannot be empty";
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
  const sshCommand = `${
    createProjectClis.find((cli: any) => cli.platform === data.selectedProject)
      .cli
  } ${data.selectedProjectDir}`;

  spawn(sshCommand, { stdio: "inherit", shell: true });
}

function quit() {
  outro(
    `🙏 Thank you for using ${color.bgCyan(
      color.black(` ${appConfig.APP_NAME} `)
    )}!`
  );
  process.exit(0);
}
