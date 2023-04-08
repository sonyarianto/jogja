#! /usr/bin/env node

import { intro } from "@clack/prompts";
import color from "picocolors";
import { _ as appConfig } from "./config";
import { mainMenu } from "./app";
import { cli } from "cleye";

async function main() {
  const _ = cli({
    name: appConfig.name,
    version: appConfig.version,
  });

  intro(`${color.bgCyan(color.black(` ${appConfig.name} `))}`);

  mainMenu();
}

main();
