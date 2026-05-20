# Mongo Modeler VS Code Extension

![Contributors](https://img.shields.io/github/contributors/Lemoncode/mongo-modeler)
![Forks](https://img.shields.io/github/forks/Lemoncode/mongo-modeler)
![Stars](https://img.shields.io/github/stars/Lemoncode/mongo-modeler)
![Licence](https://img.shields.io/github/license/Lemoncode/mongo-modeler)
![Issues](https://img.shields.io/github/issues/Lemoncode/mongo-modeler)

## Project

This is the VS Code extension package for editing Mongo Modeler `.mml` files directly inside VS Code.

It includes:

- Open and edit `.mml` diagrams directly in VS Code.
- Create new diagrams from the editor.
- Keep your modeling workflow inside your regular development environment.

## Installation

### Install from Visual Studio Marketplace

1. Open VS Code.
2. Go to **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **Mongo Modeler** by **Lemoncoders**.
4. Click **Install**.

### Install for development

```sh
git clone https://github.com/Lemoncode/mongo-modeler.git
cd mongo-modeler
npm install
npm run start
```

Then run the extension in VS Code:

1. Open the repository in VS Code.
2. Start **Run and Debug**.
3. Launch the extension host with **F5** (or run it from the **Run and Debug** panel).

Create the `.vsix` artifact:

```bash
npm run package:vscode
```

The packaged extension is generated under `packages/vscode-extension/dist`.

## Contributing

Your feedback and contributions are welcome. If you find issues with `.mml` editor behavior, VS Code integration, or command handling, please open an issue with clear reproduction steps.

## Technologies

The extension is developed using:

- [TypeScript](https://www.typescriptlang.org/)
- [VS Code Extension API](https://code.visualstudio.com/api)
