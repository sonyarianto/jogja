import { isCancel, log, outro, select, text } from "@clack/prompts";
import { appName, dataPerPage } from "./config";
import color from "picocolors";
import { spawn } from "child_process";
import { paginate } from "./utils";

type ProjectType = {
  value: string;
  name: string;
  hint: string;
  cli: string;
  category: string;
  label: string;
};

type ProjectName = string | symbol;

type Project = {
  type: ProjectType | null | undefined;
  name: ProjectName;
};

let pageMainMenuOptions: number = 1;
let isSearch: boolean = false;

function mainMenuOptions(
  projectTypeOptions: ProjectType[],
  searchTerm?: string
): ProjectType[] {
  // sort options by name

  projectTypeOptions.sort((a: ProjectType, b: ProjectType) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  let data: ProjectType[] = projectTypeOptions;

  if (searchTerm) {
    // filter options by name

    data = data.filter((option: ProjectType) => {
      return option.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (data.length === 0) {
      log.error(`No results found for ${color.cyan(searchTerm as string)}!`);
    }

    isSearch = true;
  }

  data = data.map((option: ProjectType) => {
    return {
      ...option,
      label: `${option.category}: ${option.name}`,
    };
  });

  const paginatedData = paginate(data, dataPerPage, pageMainMenuOptions);

  if (!paginatedData.is_last_page) {
    // add next page option

    paginatedData.data.unshift({
      value: "nextpage",
      label: `👉 NEXT PAGE`,
      hint: "",
      cli: "",
    });
  }

  if (pageMainMenuOptions > 1) {
    // add previous page option

    paginatedData.data.unshift({
      value: "previouspage",
      label: `👈 PREV PAGE`,
      hint: "",
      cli: "",
    });
  }

  // add search by free text option

  paginatedData.data.unshift({
    value: "search",
    label: `🔍 SEARCH`,
    hint: "",
    cli: "",
  });

  if (isSearch) {
    // add reset search option

    paginatedData.data.unshift({
      value: "resetsearch",
      label: `🔙 RESET SEARCH`,
      hint: "",
      cli: "",
    });
  }

  // add quit option

  paginatedData.data.push({
    value: "quit",
    label: `👋 QUIT`,
    hint: "",
    cli: "",
  });

  return paginatedData.data;
}

export async function mainMenu(
  options: ProjectType[],
  searchTerm?: string
): Promise<void> {
  // construct menu options and show menu

  const selectedMenuValue = await select({
    message: "Which framework do you want to use?",
    options: mainMenuOptions(options, searchTerm),
  });

  if (isCancel(selectedMenuValue)) {
    quit();
  }

  if (selectedMenuValue === "quit") {
    quit();
  }

  if (selectedMenuValue === "nextpage") {
    pageMainMenuOptions++;

    mainMenu(options);
    return;
  }

  if (selectedMenuValue === "previouspage") {
    pageMainMenuOptions--;

    mainMenu(options);
    return;
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
    (option: ProjectType) => option.value === selectedMenuValue
  );

  let selectedProjectName: ProjectName = "";

  switch (selectedMenuValue) {
    case "qwik":
    case "nx":
    case "vitepress":
      // for qwik, nx and vitepress, the project name will be handled by the cli itself
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
  log.info(`🚀 Creating ${color.cyan(project.type?.name)} project...\n`);

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

function quit() {
  outro(`🙏 Thank you for using ${color.bgCyan(color.black(` ${appName} `))}!`);
  process.exit(0);
}
