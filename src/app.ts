import { confirm, isCancel, log, outro, select, text } from "@clack/prompts";
import * as appConfig from "./config";
import color from "picocolors";
import { spawn } from "child_process";

let appData: any;
let createProjectClis: any = [
  { platform: "nextjs", cli: "npx create-next-app@latest" },
  { platform: "vuejs", cli: "npm init vue@latest" },
  { platform: "sveltekit", cli: "npm create svelte@latest" },
  { platform: "nuxtjs", cli: "npx create-nuxt-app" },
];

export async function mainMenu(data: any) {
  appData = data;

  // construct menu options and show menu

  const selectedMenu = await select({
    message: "What kind of project do you want to create?",
    initialValue: data.selectedMainMenuValue,
    options: [
      {
        value: "nextjs",
        label: "Next.js",
        hint: "The React framework for the web",
      },
      {
        value: "nuxtjs",
        label: "Nuxt.js",
        hint: "The intuitive Vue framework",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
        hint: "Rapidly developing robust, performant web applications using Svelte",
      },
      {
        value: "vuejs",
        label: "Vue.js",
        hint: "The progressive JavaScript framework",
      },
      { value: "quit", label: "Quit" },
    ],
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
