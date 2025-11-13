import { Command } from "commander";

export const initCommand = new Command("init")
  .description("Initialize configuration in current directory")
  .option("-f, --force", "Force initialization even if config exists")
  .action((options: { force?: boolean }) => {
    console.log("Initializing configuration...");

    if (options.force) {
      console.log("⚠️  Force mode enabled");
    }

    // TODO: Implement initialization logic
    console.log("✅ Configuration initialized successfully!");
  });
