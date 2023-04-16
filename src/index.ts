#! /usr/bin/env node

import { intro, log } from "@clack/prompts";
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
  log.info(
    `Project generator for web frameworks. Still for busy and lazy people.\nUse arrow keys to navigate and press enter to select. Ctrl+C to exit at any time.`
  );

  mainMenu(projectTypeOptions);
}

main();
