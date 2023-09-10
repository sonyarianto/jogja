import { isCancel, log, outro, select, text } from "@clack/prompts";
import { appName, dataPerPage, projectTypeOptions } from "./config";
import color from "picocolors";
import { spawn } from "child_process";

type ProjectType = {
  value: string;
  hint: string;
  cli: string;
  category?: string;
  label: string;
};

type ProjectName = string | symbol;

type Project = {
  type: ProjectType | null | undefined;
  name: ProjectName;
};

let pageMainMenuOptions: number = 1;
let isSearch: boolean = false;

function sortMenuOptions(projectTypeOptions: ProjectType[]): ProjectType[] {
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

  return projectTypeOptions;
}

function searchMenuOptions(
  projectTypeOptions: ProjectType[],
  searchTerm: string,
): ProjectType[] {
  // filter options by label

  projectTypeOptions = projectTypeOptions.filter((option: ProjectType) => {
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (projectTypeOptions.length === 0) {
    log.error(`No results found for ${color.cyan(searchTerm as string)}!`);
  }

  isSearch = true;
  pageMainMenuOptions = 1;

  return projectTypeOptions;
}

function mainMenuOptions(
  projectTypeOptions: ProjectType[],
  searchTerm?: string,
): ProjectType[] {
  // sort options by label

  projectTypeOptions = sortMenuOptions(projectTypeOptions);

  // handle search

  if (searchTerm) {
    projectTypeOptions = searchMenuOptions(projectTypeOptions, searchTerm);
  }

  return projectTypeOptions;
}

function renderedMainMenuOptions(
  projectTypeOptions: ProjectType[],
): ProjectType[] {
  if (
    !projectTypeOptions.find((option: ProjectType) => option.value === "search")
  ) {
    projectTypeOptions.unshift({
      value: "search",
      label: `🔍 SEARCH`,
      hint: "",
      cli: "",
    });

    projectTypeOptions.push({
      value: "search",
      label: `🔍 SEARCH`,
      hint: "",
      cli: "",
    });

    projectTypeOptions.push({
      value: "quit",
      label: `👋 QUIT`,
      hint: "",
      cli: "",
    });
  }

  if (isSearch) {
    // add reset search option if value resetsearch is not found

    if (
      !projectTypeOptions.find(
        (option: ProjectType) => option.value === "resetsearch",
      )
    ) {
      projectTypeOptions.unshift({
        value: "resetsearch",
        label: `🔙 RESET SEARCH`,
        hint: "",
        cli: "",
      });
    }
  }

  return projectTypeOptions;
}

export async function mainMenu(
  options: ProjectType[],
  searchTerm?: string,
): Promise<void> {
  // construct menu options and show menu

  let projectTypeOptions: ProjectType[] = JSON.parse(
    JSON.stringify(mainMenuOptions(options, searchTerm)),
  );

  projectTypeOptions = renderedMainMenuOptions(projectTypeOptions);

  const selectedMenuValue = await select({
    message: "Which framework do you want to use?",
    options: projectTypeOptions,
    maxItems: dataPerPage,
  });

  if (isCancel(selectedMenuValue)) {
    quit();
  }

  if (selectedMenuValue === "quit") {
    quit();
  }

  if (selectedMenuValue === "search") {
    const searchTerm = await text({
      message: "Search by framework name",
      placeholder:
        "e.g. react or redux or vue or svelte or any other framework name",
      validate: (value: string) => {
        if (value.trim() === "") return "Please enter a valid search term";
      },
    });

    if (isCancel(searchTerm)) {
      quit();
    }

    // handle search

    if (searchTerm) {
      mainMenu(options, searchTerm as string);
      return;
    }
  }

  if (selectedMenuValue === "resetsearch") {
    isSearch = false;
    pageMainMenuOptions = 1;

    mainMenu(options);
    return;
  }

  let selectedProjectType: ProjectType | null | undefined = null;

  selectedProjectType = options.find(
    (option: ProjectType) => option.value === selectedMenuValue,
  );

  let selectedProjectName: ProjectName = "";

  switch (selectedMenuValue) {
    case "qwik":
    case "medusa":
    case "nx":
    case "vitepress":
    case "vuetify":
    case "openwebcomponents":
    case "stencil":
    case "quasar":
      // for Qwik, Medusa, Nx, Quasar, Stencil, VitePress, Vuetify and Open Web Components, the project name will be handled by the cli itself
      break;
    case "solidjs":
      // show options js or ts

      const selectedSolidJsLangType = await select({
        message: "Which language type?",
        options: [
          { value: "js", label: "JavaScript", hint: "" },
          { value: "ts", label: "TypeScript", hint: "" },
        ],
      });

      if (isCancel(selectedSolidJsLangType)) {
        quit();
      }

      if (selectedProjectType) {
        switch (selectedSolidJsLangType) {
          case "js":
            selectedProjectType.cli = `npx degit solidjs/templates/js`;
            break;
          case "ts":
            selectedProjectType.cli = `npx degit solidjs/templates/ts`;
            break;
        }
      }
    case "reactredux":
      // show options js or ts

      const selectedReactReduxLangType = await select({
        message: "Which language type?",
        options: [
          { value: "js", label: "JavaScript", hint: "" },
          { value: "ts", label: "TypeScript", hint: "" },
        ],
      });

      if (isCancel(selectedReactReduxLangType)) {
        quit();
      }

      if (selectedProjectType) {
        switch (selectedReactReduxLangType) {
          case "js":
            selectedProjectType.cli = `npx create-react-app --template redux`;
            break;
          case "ts":
            selectedProjectType.cli = `npx create-react-app --template redux-typescript`;
            break;
        }
      }
    default:
      selectedProjectName = await text({
        message: "Project name?",
        placeholder: "./project-name",
        validate: (value: string) => {
          if (value.trim() === "") return "Project name cannot be empty";
          if (value.includes(" ")) return "Spaces are not allowed";
          if (/[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(value)) {
            return "Special characters are not allowed";
          }
        },
      });

      if (isCancel(selectedProjectName)) {
        quit();
      }
      break;
  }

  // create project

  createProject({
    type: selectedProjectType,
    name: selectedProjectName,
  });
}

function createProject(project: Project) {
  log.info(`🚀 Creating ${color.cyan(project.type?.label)} project...\n`);

  const child = spawn(`${project.type?.cli} ${project.name as string}`, {
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", () => {
    switch (project.type?.value) {
      case "solidjs":
        solidJsOnFinished(project);
      case "inferno":
        infernoOnFinished(project);
      case "nitro":
        nitroOnFinished(project);
      default:
        quit();
        break;
    }
  });
}

function solidJsOnFinished(project: Project) {
  console.log(`\nWhat to do next?`);
  console.log(`1. cd ${project.name as string}`);
  console.log(`2. npm install`);
  console.log(`3. npm run dev\n`);
}

function infernoOnFinished(project: Project) {
  console.log(`\nWhat to do next?`);
  console.log(`1. cd ${project.name as string}`);
  console.log(`2. npm install`);
  console.log(`3. npm run start\n`);
}

function nitroOnFinished(project: Project) {
  console.log(`\nWhat to do next?`);
  console.log(`1. cd ${project.name as string}`);
  console.log(`2. npm install`);
  console.log(`3. npm run dev\n`);
}

function quit() {
  log.info(
    `Go to https://github.com/sonyarianto/jogja to submit an issue or contribute.`,
  );
  outro(`🙏 Thank you for using ${color.bgCyan(color.black(` ${appName} `))}!`);
  process.exit(0);
}
