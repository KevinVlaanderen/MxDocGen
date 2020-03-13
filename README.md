<h1 align="center">Welcome to mxdocgen 👋</h1>

<p>
<a href="https://www.npmjs.com/package/mxdocgen" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/mxdocgen.svg">
</a>



<a href="https://github.com/KevinVlaanderen/MxDocGen#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"/>
</a>

<a href="https://github.com/KevinVlaanderen/MxDocGen/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"/>
</a>

<a href="https://github.com/KevinVlaanderen/MxDocGen/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC"
         src="https://img.shields.io/github/license/KevinVlaanderen/mxdocgen"/>
</a>

</p>

> A small tool that mimics the documentation generation capabilities offered in Mendix Studio Pro, but with greater flexibility.

It uses the Mendix Model SDK to extract information from a Mendix model, which is then fed into a set of templates to generate the required output, such as an .html document.
Filters can be applied to control which modules and documents should be processed.

The tool can be used as a standalone (node-based) CLI or as a library.

### 🏠 [Homepage](https://github.com/KevinVlaanderen/MxDocGen#readme)

### ✨ [Demo](https://github.com/KevinVlaanderen/MxDocGen/tree/master/demo)


## Install

```sh
npm install
```

## Usage

### Library

[API docs](https://kevinvlaanderen.github.io/MxDocGen/)

### CLI

```sh
npx mxdocgen
```

or, during development

```sh
npm run start
```

#### Command line parameters

##### Without a command

```
mxdocgen <command>

Commands:
  mxdocgen copy-templates <target>  Copy the default templates to another location
                                  for modification
  mxdocgen generate                 Generate documentation

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

##### Generate

```
mxdocgen generate

Generate documentation

Credentials:
  --username                                                 [string] [required]
  --apikey                                                   [string] [required]

Filters:
  --modules                                             [string] [default: ".*"]
  --ignore                                             [array] [default: ["**"]]

Output:
  --outputdir                            [string] [required] [default: "output"]
  --outputfile                       [string] [required] [default: "index.html"]

Project:
  --mpk                                                                 [string]
  --projectid                                                           [string]
  --revision                                                            [number]
  --branch                                                              [string]
  --workingcopyid                                                       [string]

Templates:
  --templatedir                                                         [string]
  --templateext                                                         [string]
  --maintemplate                                                        [string]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
```

##### Copy templates

```
mxdocgen copy-templates <target>

Copy the default templates to another location for modification

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --config   Path to JSON config file
  --target   Target directory for the templates                         [string]
```


## Author


👤 **Kevin Vlaanderen**




* Github: [@KevinVlaanderen](https://github.com/KevinVlaanderen)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!
<br/>Feel free to check [issues page](https://github.com/KevinVlaanderen/MxDocGen/issues).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2020 [Kevin Vlaanderen](https://github.com/KevinVlaanderen).<br/>

This project is [ISC](https://github.com/KevinVlaanderen/MxDocGen/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
