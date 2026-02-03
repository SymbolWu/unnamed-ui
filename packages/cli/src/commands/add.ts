import { Command } from "commander";
import chalk from "chalk";
import spawn from "cross-spawn";
import { existsSync } from "fs";
import path from "path";

import {
  detectCssEntry,
  detectFramework,
  detectPackageManager,
  ensureAliasConfig,
  ensureComponentsJson,
  ensureCssImports,
  ensureDevDeps,
  ensureLegacyPeerDepsNpmrc,
  ensurePostcssConfig,
  ensureTailwindConfig,
  type PackageJson,
  readJson,
} from "../utils/project-setup";

function runShadcnAdd(cwd: string, target: string) {
  const result = spawn.sync("npx", ["shadcn@latest", "add", target], {
    stdio: "inherit",
    cwd,
  });
  process.exit(result.status ?? 0);
}

export const addCommand = new Command()
  .name("add")
  .description("Install components with auto-init (tailwind + alias)")
  .argument("<registry-url>", "registry json url")
  .action((registryUrl: string) => {
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, "package.json");
    if (!existsSync(pkgPath)) {
      console.error(chalk.red("package.json not found in current directory."));
      process.exit(1);
    }

    const pkg = readJson<PackageJson>(pkgPath) ?? {};
    const framework = detectFramework(pkg);
    const useSrc = existsSync(path.join(cwd, "src"));
    const rawCssPath =
      framework === "next" && existsSync(path.join(cwd, "app"))
        ? "app/globals.css"
        : useSrc
          ? detectCssEntry(cwd)
          : "styles/globals.css";
    const cssPath = rawCssPath.replace(/\\/g, "/");

    console.log(chalk.cyan("🔧 Checking project prerequisites..."));
    ensureTailwindConfig(cwd, framework, useSrc);
    ensurePostcssConfig(cwd);
    ensureCssImports(cwd, cssPath);
    ensureAliasConfig(cwd, useSrc);
    ensureComponentsJson(cwd, cssPath, framework === "next");
    ensureLegacyPeerDepsNpmrc(cwd);

    const packageManager = detectPackageManager(cwd);
    ensureDevDeps(cwd, pkg, packageManager);

    console.log(chalk.cyan("📦 Installing component from registry..."));
    runShadcnAdd(cwd, registryUrl);
  });
