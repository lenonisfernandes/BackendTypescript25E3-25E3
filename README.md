# TSBackend

A simple TypeScript backend project demonstrating basic CRUD operations and user management.

## Project Structure

```
.
├── src/
│   ├── main.ts         # Entry point of the application
│   └── usuario.ts      # User type and mock user data
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── .gitignore          # Files and folders to ignore in git
└── .vscode/            # VSCode launch configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install Dependencies

```sh
npm install
```

### Run the Project

```sh
npm start
```

### Build the Project

```sh
npm run build
```

## Scripts

- `npm start` — Runs the project using ts-node.
- `npm run build` — Compiles TypeScript to JavaScript in the `dist` folder.

## Project Files

- [`src/main.ts`](src/main.ts): Main application logic and example usage.
- [`src/usuario.ts`](src/usuario.ts): User type definition and mock