/**/

import * as Commander from "commander";
import chalk from "chalk";
import * as fs from "fs";
import fetch from "node-fetch";
import * as path from "path";

const dir = "./docs";
const cacheUrl ="https://elm-package-cache-psi.vercel.app"

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Cache = {
  retrieved: { [key: string]: [string] };
};


// ---------------------------------------------------
// PROGRAM 
// ---------------------------------------------------

const program = new Commander.Command();

const helpText = `
Welcome to Elm All Docs.

This will help you download all the docs.json and packages README files from the package website.

Please use this responsibly.

`;

program.version("0.2.0").name("elm-all-docs").addHelpText("before", helpText);

program
  .command("get")
  .description(
    `Retrieve all the docs.json files from the Elm package website.
`
  )
  .option('--dry-run', 'Don\'t do any changes to file system', false)
  .option('-v, --verbose', 'Show progress for cached packages as well', false)
  .action(get);

program
  .command("check")
  .description(
    `Check for integrity of packages and generate skipped.json
`
  )
  .option('--dry-run', 'Don\'t do any changes to file system', false)
  .action(check);

program.showHelpAfterError();
program.parseAsync();

// ---------------------------------------------------
// PACKAGES 
// ---------------------------------------------------

type Package = {
  name: string;
  summary: string;
  version: string;
  license: string;
};

function getSkippedPackages() {
  try {
    if (fs.existsSync('./skipped.json')) {
      return JSON.parse(fs.readFileSync('./skipped.json').toString());
    } else {
      return {}
    }
  }
  catch(e){
    console.log('Error occured while trying to read skipped.json - ', e)
    return {}
  }

} 

// Constructs packages cache from files
function getPackagesCache(): Cache {

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

// Returns a list of projects like:
// {
//     "name": "xdelph/elm-sortable-table",
//     "summary": "Sortable tables for data of any shape.",
//     "license": "BSD-3-Clause",
//     "version": "1.0.2"
// },
//
async function listPackages(): Promise<Package[]> {

  let packages: Package[] = [];

  const searchResp = await fetch(`${cacheUrl}/search.json`);
  const json: any = await searchResp.json();

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

// Gets docs.json for a package from package site
// 
async function getPackage(pkg: Package) {
  const docsResp = await fetch(
    `${cacheUrl}/packages/${pkg.name}/${pkg.version}/docs.json`
  );
  return await docsResp.json();
}

// Generate local file name for the docs.json of the package
// 
function docsFilename (name: string, version: string ): string {
  return path.join(
    `${dir}/${name.replace(/\//g, ".")}:${version}.json`
  );
}

// Clear old revisions of packages from file system
// 
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


// The main routine for handling gathering packages
// 
async function tryToGetPackage (pkg: Package, cache: Cache, progress: string, options: GetOptions){
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
        `${progress} ${pkg.name} - ${pkg.version} - retrieved`
      );

      clearOldRevisions(pkg, cache.retrieved[pkg.name], options.dryRun);
      await sleep(300);
    } catch (e) {
      console.log(`Problem retrieving ${pkg.name}-${pkg.version}: ${e}`);
    }
  }
}

// ---------------------------------------------------
// READMES 
// ---------------------------------------------------

function readmeFilename (name: string, version: string ): string {
  return path.join(
    `${dir}/${name.replace(/\//g, ".")}:${version}.readme.md`
  );
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

async function getReadmeFile(pkg: Package, readmeFileName: string) {
  let readmeResponse = await fetch(
   `https://raw.githubusercontent.com/${pkg.name}/${pkg.version}/${readmeFileName}`
  );

  if(readmeResponse.ok){
    return await readmeResponse.text();
  } else {
    return null
  }
}

async function getReadme(pkg: Package): Promise<string | null> {
  let response = null;
  //
  // try 'README.md'
  response = await getReadmeFile(pkg, 'README.md');

  if (response !== null)
    { return response }

  // try 'readme.md'
  response = await getReadmeFile(pkg, 'readme.md');

  if (response !== null)
    { return response }

  // try 'Readme.md'
  response = await getReadmeFile(pkg, 'Readme.md');

  if (response !== null)
    { return response }

  // try 'README.MD'
  response = await getReadmeFile(pkg, 'README.MD');

  return response 
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

async function tryToGetReadme (pkg: Package, cache: Cache, progress: string, options: GetOptions){
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
        `${progress} ${pkg.name} - ${pkg.version} - readme retrieved`
      );

      clearOldReadmes(pkg, cache.retrieved[pkg.name], options.dryRun);
      await sleep(300);
    } catch (e) {
      console.log(`Problem retrieving README ${pkg.name}-${pkg.version}: ${e}`);
    }
  }
}

// ---------------------------------------------------
// GET PACKAGES
// ---------------------------------------------------
type GetOptions = {
  dryRun : boolean
  verbose : boolean
}

async function get(options: GetOptions) {
  const packages = await listPackages();
  const cache = getPackagesCache();
  const readmeCache = getReadmeCache();
  const skippedPackages = getSkippedPackages();

  const filteredPackages = packages.filter((pkg) => skippedPackages[pkg.name] === undefined );

  const packagesCount = filteredPackages.length;
  let index = 0;

  for (let pkg of filteredPackages) {
    index = index + 1;
    await tryToGetPackage(pkg, cache, `${index}/${packagesCount}`, options);
    await tryToGetReadme(pkg, readmeCache, `${index}/${packagesCount}`, options);
  }
}

// ---------------------------------------------------
// PACKAGES CHECK  
// ---------------------------------------------------
type CheckOptions = {
  dryRun : boolean
}

enum Reason { 
  NotFound = 'not found',
  Moved = 'moved',
  Unknown = 'unknown'
}

type SkipReason = {
  reason: Reason,
  newName?: string | null
  status?: number
}

async function tryToCheckPackages(pkg: Package, progress: string, options: CheckOptions) : Promise<'ok' | SkipReason>{
  console.log(`${progress} ${pkg.name} - checking...`)

  let response = await fetch(
    `https://github.com/${pkg.name}`,
    {redirect: 'manual'}
  );

  await sleep(300);

  switch(response.status){
    case 200: return 'ok';
    case 404: return {
        reason: Reason.NotFound
      };
    case 301: 
      const locationURL = response.headers.get('location');
      return {
        reason: Reason.Moved, 
        newName: locationURL?.substring('https://github.com/'.length)
      };
    default: 
      return {
        reason: Reason.Unknown, 
        status: response.status
      };
  }
}

async function check(options: CheckOptions) {
  const packages = await listPackages();
  const packagesCount = packages.length;
  let skipped:any = {}
  let index = 0;

  for (let pkg of packages) {
    index = index + 1;
    const result = await tryToCheckPackages(pkg, `${index}/${packagesCount}`, options);
    if (result === 'ok') {
      continue;
    } else {
      console.log("  - result", result)
      skipped[pkg.name] = result;
    }
  }

  const skippedFilename = path.join( `./skipped.json`);
  const skippedJson = (JSON.stringify(skipped, null, 4));
  const corruptedPackagesCount = Object.keys(skipped).length;

  console.log(`\nFound ${corruptedPackagesCount} unavailable packages`);

  if(!options.dryRun){
    console.log('Writing results to skipped.json');
    fs.writeFileSync(skippedFilename, skippedJson);
  }
  else {
    console.log(skippedJson);
  }
}
