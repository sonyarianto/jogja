import { isCancel, log, outro, select, text } from "@clack/prompts";
import * as appConfig from "./config";
import color from "picocolors";
import { spawn } from "child_process";

const options = [
  {
    value: "angular",
    label: "Angular",
    hint: "Deliver web apps with confidence",
    cli: "npm init @angular",
    start_space: true,
    end_space: false,
  },
  {
    value: "nextjs",
    label: "Next.js",
    hint: "The React framework for the web",
    cli: "npx create-next-app@latest",
    start_space: true,
    end_space: false,
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
    hint: "The intuitive Vue framework",
    cli: "npx create-nuxt-app",
    start_space: true,
    end_space: false,
  },
  {
    value: "remix",
    label: "Remix",
    hint: "Build better websites. Create modern, resilient user experiences with web fundamentals",
    cli: "npx create-remix@latest",
    start_space: true,
    end_space: false,
  },
  {
    value: "svelte",
    label: "SvelteKit",
    hint: "Rapidly developing robust, performant web applications using Svelte",
    cli: "npm create svelte@latest",
    start_space: false,
    end_space: false,
  },
  {
    value: "vuejs",
    label: "Vue.js",
    hint: "The progressive JavaScript framework",
    cli: "npm init vue@latest",
    start_space: false,
    end_space: false,
  },
  {
    value: "astro",
    label: "Astro",
    hint: "Build the web you want",
    cli: "npm create astro@latest",
    start_space: false,
    end_space: false,
  },
  {
    value: "nestjs",
    label: "NestJS",
    hint: "A progressive Node.js framework",
    cli: "npx nest new",
    start_space: true,
    end_space: false,
  },
  {
    value: "emberjs",
    label: "Ember.js",
    hint: "A framework for ambitious web developers",
    cli: "npx ember new",
    start_space: true,
    end_space: false,
  },
  {
    value: "gatsby",
    label: "Gatsby",
    hint: "The fastest frontend for the headless web",
    cli: "npx gatsby new",
    start_space: true,
    end_space: false,
  },
  {
    value: "qwik",
    label: "Qwik",
    hint: "Framework reimagined for the edge!",
    cli: "npm create qwik@latest",
    start_space: false,
    end_space: false,
  },
  {
    value: "sails",
    label: "Sails",
    hint: "Realtime MVC framework for Node.js",
    cli: "npx sails new",
    start_space: true,
    end_space: false,
  },
  {
    value: "vite",
    label: "Vite",
    hint: "Next Generation Frontend Tooling",
    cli: "npm create vite@latest",
    start_space: true,
    end_space: false,
  },
];

let selectedProject: any = null;

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
    cli: "",
    start_space: false,
    end_space: false,
  });

  return options;
}

export async function mainMenu(data: any) {
  let selectedProjectDir: any = "";

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

  if (selectedMenu !== "qwik") {
    selectedProjectDir = await text({
      message: "Project name?",
      placeholder: "./project-name",
      validate: (value: string) => {
        if (value === "") return "Project name cannot be empty";
        if (value.includes(" ")) return "Spaces are not allowed";
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
          return "Special characters are not allowed";
        }
      },
    });

    if (isCancel(selectedProjectDir)) {
      quit();
    }
  }

  selectedProject = options.find(
    (option: any) => option.value === selectedMenu
  );

  // handle menu selection

  createProject({
    selectedProject: selectedProject,
    selectedProjectDir: selectedProjectDir,
  });
}

function createProject(data: any) {
  log.info(`🚀 Creating ${data.selectedProject.label} project...`);

  if (data.selectedProject.start_space) {
    console.log("\n");
  }

  let selectedProjectDir: any = "";

  if (data.selectedProjectDir !== "") {
    selectedProjectDir = ` ${data.selectedProjectDir}`;
  }

  const child = spawn(
    `${
      options.find((option: any) => option.value === data.selectedProject.value)
        ?.cli
    } ${selectedProjectDir}`,
    { stdio: "inherit", shell: true }
  );
  child.on("exit", () => {
    quit();
  });
}

function quit() {
  if (selectedProject && selectedProject.end_space) {
    console.log("\n");
  }

  outro(
    `🙏 Thank you for using ${color.bgCyan(
      color.black(` ${appConfig.APP_NAME} `)
    )}!`
  );
  process.exit(0);
}
