<h1 align="center">Welcome to mendixmoduledocs 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> MendixModuleDocs is a small tool that mimics the documentation generation capabilities offered in Mendix Studio Pro, but with greater flexibility.

It uses the Mendix Model SDK to extract information from a Mendix model, which is then fed into a set of templates to generate the required output, such as an .html document.
Filters can be applied to control which modules and documents should be processed.

MendixModuleDocs can be used as a standalone (node-based) CLI or as a library.

## Install

```sh
npm install
```

## Usage

```sh
npx mendixmoduledocs
```

### During development
```sh
npm run start
```

### Command line parameters

#### Without a command

```
cli.js <command>

Commands:
  cli.js generate                 Generate documentation
  cli.js copy-templates <target>  Copy the default templates to another location
                                  for modification

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

#### Generate

```
Credentials:
  --username                                                 [string] [required]
  --apikey                                                   [string] [required]

Project:
  --mpk                                                                 [string]
  --projectid                                                           [string]
  --revision                                                            [number]
  --branch                                                              [string]
  --workingcopyid                                                       [string]

Filters:
  --modules                                             [string] [default: ".*"]
  --ignore                                             [array] [default: ["**"]]
  --types                 [array] [choices: "microflow", "javaaction"] [default:
                                                     ["microflow","javaaction"]]

Templates:
  --templatedir                                                         [string]
  --templateext                                                         [string]
  --templatemain                                                        [string]

Output:
  --outputDirectory                                          [string] [required]
  --outputFilename                   [string] [required] [default: "index.html"]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

#### Copy templates

```
Positionals:
  target  Target directory for the templates                 [string] [required]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```


## Author

👤 **Kevin Vlaanderen**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_