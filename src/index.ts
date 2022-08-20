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
      if(!file.endsWith(".json")){
        return;
      }

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

function getReadmeCache(): Cache {
  let retrieved: { [key: string]: [string] } = {};

  if (fs.existsSync(dir)) {
    console.log("Reading README cache");
    fs.readdirSync(dir).forEach((file) => {
      if(!file.endsWith(".readme.md")){
        return;
      }

      const fileWithoutExtension = file.replace(/\.readme.md/, "");
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
async function getReadme(pkg: Package): Promise<string | null> {
  let readmeResponse = await fetch(
    `https://raw.githubusercontent.com/${pkg.name}/${pkg.version}/README.md`
  );

  if(readmeResponse.ok){
    return await readmeResponse.text();
  }
  // try the lowercase readme file (I see you JohnBugner/elm-loop and similar)
  else {
    readmeResponse = await fetch(
      `https://raw.githubusercontent.com/${pkg.name}/${pkg.version}/readme.md`
    );
    if(readmeResponse.ok){
      return await readmeResponse.text();
    }
    else {
      return null;
    }
  }
}

function readmeFilename (name: string, version: string ): string {
  return path.join(
    `${dir}/${name.replace(/\//g, ".")}:${version}.readme.md`
  );
}

function docsFilename (name: string, version: string ): string {
  return path.join(
    `${dir}/${name.replace(/\//g, ".")}:${version}.json`
  );
}

function clearOldRevisions(pkg: Package, revisions: [string], dryRun: boolean){
  if(revisions === undefined){
    return;
  }
  else {
    for(let revision of revisions){
      try {
        let oldFilename = docsFilename(pkg.name, revision);
        console.log(`Removing old docs version - ${oldFilename}`);

        if(!dryRun){
          fs.unlinkSync(oldFilename);
        }
      } catch (e) {
        console.log(`Problem removing ${pkg.name}-${revision}: ${e}`);
      }
    }
  }
}

function clearOldReadmes(pkg: Package, revisions: [string], dryRun: boolean){
  if(revisions === undefined){
    return;
  }
  else {
    for(let revision of revisions){
      try {
        let oldFilename = readmeFilename(pkg.name, revision);
        console.log(`Removing old README version - ${oldFilename}`);

        if(!dryRun){
          fs.unlinkSync(oldFilename);
        }
      } catch (e) {
        console.log(`Problem removing README for ${pkg.name}-${revision}: ${e}`);
      }
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tryToGetPackage (pkg: Package, cache: Cache, progress: string, options: Options){
  if (
    pkg.name in cache.retrieved &&
    cache.retrieved[pkg.name].includes(pkg.version)
  ) {
    
    if(options.verbose){
      console.log(
        `${progress} ${pkg.name} - ${pkg.version} - already cached`
      );
    }

    return;
  } else {
    try {
      const docs = await getPackage(pkg);
      const filename = docsFilename(pkg.name, pkg.version);

      if(!options.dryRun){
        fs.writeFileSync(filename, JSON.stringify(docs, null, 4));
      }

      console.log(
        `${progress} ${pkg.name} - ${pkg.version} - retrieved, pausing`
      );

      clearOldRevisions(pkg, cache.retrieved[pkg.name], options.dryRun);
      await sleep(300);
    } catch (e) {
      console.log(`Problem retrieving ${pkg.name}-${pkg.version}: ${e}`);
    }
  }
}

async function tryToGetReadme (pkg: Package, cache: Cache, progress: string, options: Options){
  if (
    pkg.name in cache.retrieved &&
    cache.retrieved[pkg.name].includes(pkg.version)
  ) {
    
    if(options.verbose){
      console.log(
        `${progress} ${pkg.name} - ${pkg.version} - README already cached`
      );
    }

    return;
  } else {
    try {
      const readme = await getReadme(pkg);
      if(readme === null){
        console.log(
        `    [x] Unable to get README for ${pkg.name} - ${pkg.version} - skipping this file`
        );
        return;
      }
      const filename = readmeFilename(pkg.name, pkg.version);

      if(!options.dryRun){
        fs.writeFileSync(filename, readme);
      }

      console.log(
        `${progress} ${pkg.name} - ${pkg.version} - readme retrieved, pausing`
      );

      clearOldReadmes(pkg, cache.retrieved[pkg.name], options.dryRun);
      await sleep(300);
    } catch (e) {
      console.log(`Problem retrieving README ${pkg.name}-${pkg.version}: ${e}`);
    }
  }
}

async function get(options: Options) {
  const packages = await listPackages();
  const cache = getCache();
  const readmeCache = getReadmeCache();

  const packagesCount = packages.length;
  let index = 0;

  for (let pkg of packages) {
    index = index + 1;
    await tryToGetPackage(pkg, cache, `${index}/${packagesCount}`, options);
    await tryToGetReadme(pkg, readmeCache, `${index}/${packagesCount}`, options);
  }
}

type Options = {
  dryRun : boolean
  verbose : boolean
}

program
  .command("get")
  .description(
    `Retrieve all the docs.json files from the Elm package website.
`
  )
  .option('--dry-run', 'Don\'t do any changes to file system', false)
  .option('-v, --verbose', 'Show detailed logs', false)
  .action(get);

program.showHelpAfterError();
program.parseAsync();
