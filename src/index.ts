#! /usr/bin/env node

import { intro } from "@clack/prompts";
import color from "picocolors";
import { appName, appVersion, projectTypeOptions } from "./config";
import { mainMenu } from "./app";
import { cli } from "cleye";

async function main() {
  const _ = cli({
    name: appName,
    version: appVersion,
  });

  intro(`${color.bgCyan(color.black(` ${appName} `))}`);

  mainMenu(projectTypeOptions);
}

main();
