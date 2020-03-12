<h1 align="center">Welcome to mxdocgen 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/mxdocgen" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/mxdocgen.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A small tool that mimics the documentation generation capabilities offered in Mendix Studio Pro, but with greater flexibility.

It uses the Mendix Model SDK to extract information from a Mendix model, which is then fed into a set of templates to generate the required output, such as an .html document.
Filters can be applied to control which modules and documents should be processed.

The tool can be used as a standalone (node-based) CLI or as a library.

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
  cli.js copy-templates <target>  Copy the default templates to another location
                                  for modification
  cli.js generate                 Generate documentation

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

#### Generate

```
cli.js generate

Generate documentation

Credentials
  --username                                                 [string] [required]
  --apikey                                                   [string] [required]

Filters
  --modules                                             [string] [default: ".*"]
  --ignore                                             [array] [default: ["**"]]

Output
  --outputdir                               [string] [required] [default: "out"]
  --outputfile                       [string] [required] [default: "index.html"]

Project
  --mpk                                                                 [string]
  --projectid                                                           [string]
  --revision                                                            [number]
  --branch                                                              [string]
  --workingcopyid                                                       [string]

Templates
  --templatedir                                                         [string]
  --templateext                                                         [string]
  --maintemplate                                                        [string]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

#### Copy templates

```
cli.js copy-templates <target>

Copy the default templates to another location for modification

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
  --target   Target directory for the templates                         [string]
```


## Author

👤 **Kevin Vlaanderen**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_