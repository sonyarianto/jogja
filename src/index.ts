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
  log.message(
    `Project generator for web frameworks. Use ${color.cyan(
      `arrow keys`,
    )} to navigate and press enter to select. ${color.cyan(
      `Ctrl+C`,
    )} to exit at any time.`,
  );

  mainMenu(projectTypeOptions);
}

main();
