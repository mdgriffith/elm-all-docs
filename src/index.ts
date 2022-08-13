/**/

import * as Commander from "commander";
import chalk from "chalk";
import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";

const program = new Commander.Command();

const helpText = `
Welcome to Elm All Docs.

This will help you download all the docs.json files from the package website.

Please use this responsibly.

`;

program.version("0.1.0").name("elm-all-docs").addHelpText("before", helpText);

const dir = "./docs";

async function listPackages(): Promise<Package[]> {
  // Returns a list of projects like:
  // {
  //     "name": "xdelph/elm-sortable-table",
  //     "summary": "Sortable tables for data of any shape.",
  //     "license": "BSD-3-Clause",
  //     "version": "1.0.2"
  //   },

  let packages: Package[] = [];

  const searchResp = await fetch(
    "https://elm-package-cache-psi.vercel.app/search.json"
  );
  const json: any = await searchResp.json();
  //   console.log(json);
  try {
    for (const i in json) {
      const pkg = json[i];
      packages.push({
        name: pkg.name,
        version: pkg.version,
        license: pkg.license,
        summary: pkg.summary,
      });
    }
  } catch (e) {
    console.log(`Unexpected package result!`);
  }

  return packages;
}

type Package = {
  name: string;
  summary: string;
  version: string;
  license: string;
};

async function getPackage(pkg: Package) {
  const docsResp = await fetch(
    `https://elm-package-cache-psi.vercel.app/packages/${pkg.name}/${pkg.version}/docs.json`
  );
  return await docsResp.json();
}

type Cache = {
  retrieved: { [key: string]: [string] };
};

function getCache(): Cache {
  let retrieved: { [key: string]: [string] } = {};

  if (fs.existsSync(dir)) {
    console.log("Reading cache");
    fs.readdirSync(dir).forEach((file) => {
      const fileWithoutExtension = file.replace(/\.json$/, "");
      let pieces = fileWithoutExtension.split(":");

      const version = pieces[1];
      const packageName = pieces[0].replace(/\./, "/");
      if (packageName in retrieved) {
        retrieved[packageName].push(version);
      } else {
        retrieved[packageName] = [version];
      }
    });
  } else {
    fs.mkdirSync(dir);
  }

  return { retrieved: retrieved };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get() {
  //   console.log("pls");
  const packages = await listPackages();
  const cache = getCache();

  for (let pkg of packages) {
    if (
      pkg.name in cache.retrieved &&
      cache.retrieved[pkg.name].includes(pkg.version)
    ) {
      console.log(`${pkg.name} - ${pkg.version} - already cached`);
      continue;
    } else {
      try {
        const docs = await getPackage(pkg);
        const filename = path.join(
          `${dir}/${pkg.name.replace(/\//g, ".")}:${pkg.version}.json`
        );

        fs.writeFileSync(filename, JSON.stringify(docs, null, 4));
        console.log(`${pkg.name} - ${pkg.version} - retrieved, pausing`);
        await sleep(300);
      } catch (e) {
        console.log(`Problem retrieving ${pkg.name}-${pkg.version}: ${e}`);
      }
    }
  }
}

program
  .command("get")
  .description(
    `Retrieve all the docs.json files from the Elm package website.
`
  )
  .action(get);

program.showHelpAfterError();
program.parseAsync();
