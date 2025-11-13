#!/usr/bin/env node

import { Command } from "commander";
import { createCommand } from "./commands/create";
import { initCommand } from "./commands/init";

const program = new Command();

program
  .name("unnamed-cli")
  .description("CLI tool for unnamed-ui")
  .version("0.0.1");

// Register commands
program.addCommand(createCommand);
program.addCommand(initCommand);

// Parse arguments
program.parse();
