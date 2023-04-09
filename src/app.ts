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

  let selectedProjectType: ProjectType | null | undefined = null;

  selectedProjectType = options.find(
    (option: ProjectType) => option.value === selectedMenuValue
  );

  let selectedProjectName: ProjectName = "";

  switch (selectedMenuValue) {
    case "qwik":
      // can't use project name since qwik not support it on the cli parameter yet
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
    default:
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
        console.log(`\nWhat to do next?`);
        console.log(`1. cd ${project.name as string}`);
        console.log(`2. npm install`);
        console.log(`3. npm run dev\n`);
      default:
        quit();
        break;
    }
  });
}

function quit() {
  outro(`🙏 Thank you for using ${color.bgCyan(color.black(` ${appName} `))}!`);
  process.exit(0);
}
