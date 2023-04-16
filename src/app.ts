import { isCancel, log, outro, select, text } from "@clack/prompts";
import { appName } from "./config";
import color from "picocolors";
import { spawn } from "child_process";
import { paginate } from "./utils";

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

let page: number = 1;

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

  const data = paginate(projectTypeOptions, 8, page);

  projectTypeOptions = data.data;

  if (page > 1) {
    // add previous page option

    projectTypeOptions.unshift({
      value: "previouspage",
      label: `👈 PREV PAGE`,
      hint: "",
      cli: "",
    });
  }

  if (!data.is_last_page) {
    // add next page option

    projectTypeOptions.push({
      value: "nextpage",
      label: `👉 NEXT PAGE`,
      hint: "",
      cli: "",
    });
  }

  // add search by free text option

  projectTypeOptions.unshift({
    value: "search",
    label: `🔍 SEARCH`,
    hint: "",
    cli: "",
  });

  // add quit option

  projectTypeOptions.push({
    value: "quit",
    label: `👋 QUIT`,
    hint: "",
    cli: "",
  });

  return projectTypeOptions;
}

export async function mainMenu(options: ProjectType[]): Promise<void> {
  // construct menu options and show menu

  const selectedMenuValue = await select({
    message: "Which framework do you want to use?",
    options: mainMenuOptions(options),
  });

  if (isCancel(selectedMenuValue)) {
    quit();
  }

  if (selectedMenuValue === "quit") {
    quit();
  }

  if (selectedMenuValue === "nextpage") {
    page++;

    mainMenu(options);
    return;
  }

  if (selectedMenuValue === "previouspage") {
    page--;

    mainMenu(options);
    return;
  }

  if (selectedMenuValue === "search") {
    const searchValue = await text({
      message: "Search by free text?",
      placeholder:
        "e.g. react or redux or vue or svelte or any other framework name",
      validate: (value: string) => {
        if (value.trim() === "") return "Please enter a valid search term";
      },
    });

    if (isCancel(searchValue)) {
      quit();
    }

    if (searchValue) {
      options = options.filter((option: ProjectType) =>
        option.label
          .toLowerCase()
          .includes((searchValue as string).toLowerCase())
      );

      if (options.length === 0) {
        log.info(`No results found for ${searchValue as string}`);
      }
    }

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
      // for qwik and nx, the project name will be handled by the cli itself
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
    case "react_redux":
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
  log.info(`🚀 Creating ${project.type?.label} project...\n`);

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
