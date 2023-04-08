import { isCancel, log, outro, select, text } from "@clack/prompts";
import { appName } from "./config";
import color from "picocolors";
import { spawn } from "child_process";

type ProjectType = {
  value: string;
  label: string;
  hint: string;
  cli: string;
};

type ProjectName = string | symbol;

type Project = {
  type: ProjectType | null | undefined;
  name: ProjectName;
};

const projectTypeOptions = [
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
];

function mainMenuOptions(projectTypeOptions: ProjectType[]): ProjectType[] {
  // sort options by label

  projectTypeOptions.sort((a: ProjectType, b: ProjectType) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  // add quit option

  projectTypeOptions.push({
    value: "quit",
    label: "Quit",
    hint: "",
    cli: "",
  });

  return projectTypeOptions;
}

export async function mainMenu(): Promise<void> {
  // construct menu options and show menu

  const selectedMenuValue = await select({
    message: "Which framework do you want to use?",
    options: mainMenuOptions(projectTypeOptions),
  });

  if (isCancel(selectedMenuValue)) {
    quit();
  }

  if (selectedMenuValue === "quit") {
    quit();
  }

  let selectedProjectType: ProjectType | null | undefined = null;

  selectedProjectType = projectTypeOptions.find(
    (option: ProjectType) => option.value === selectedMenuValue
  );

  let selectedProjectName: ProjectName = "";

  if (selectedMenuValue !== "qwik") {
    selectedProjectName = await text({
      message: "Project name?",
      placeholder: "./project-name",
      validate: (value: string) => {
        if (value === "") return "Project name cannot be empty";
        if (value.includes(" ")) return "Spaces are not allowed";
        if (/[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
          return "Special characters are not allowed";
        }
      },
    });

    if (isCancel(selectedProjectName)) {
      quit();
    }
  }

  // create project

  createProject({
    type: selectedProjectType,
    name: selectedProjectName,
  });
}

function createProject(project: Project) {
  log.info(`🚀 Creating ${project.type?.label} project...\n`);

  const child = spawn(`${project.type?.cli} ${project.name as string}`, {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", () => {
    quit();
  });
}

function quit() {
  outro(`🙏 Thank you for using ${color.bgCyan(color.black(` ${appName} `))}!`);
  process.exit(0);
}
