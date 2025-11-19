# Variable Suggest (var-suggest)

A simple Acode plugin that adds autocomplete suggestions for variable names
declared with `const`, `let`, or `var` in the current file.

## Features

- Scans the current file for patterns like:
  - `const name = ...`
  - `let name = ...`
  - `var name = ...`
- Provides those names as suggestions when you type in the editor.
- Works well for quick scripts and small projects.

## How it works

1. On load, the plugin attaches to Acode's editor via `editorManager`.
2. It adds a custom Ace completer (`editor.completers.push(...)`).
3. The completer:
   - Reads the entire file content
   - Extracts variable names with a regex
   - Returns them as autocomplete candidates

## Installation

1. Put all files into a folder called `var-suggest`:
   - `plugin.json`
   - `main.js`
   - `readme.md`
   - `changelogs.md`
2. Zip the `var-suggest` folder.
3. Load/install the zip in Acode as a plugin.
4. Open a JavaScript file and start typing to see suggestions.

## Limitations

- Only looks for `const`, `let`, `var` patterns.
- Does not understand imports, scopes, or other languages.
- Meant as a lightweight helper, not a full IntelliSense engine.
