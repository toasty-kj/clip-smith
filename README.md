# ClipSmith

A clipboard history manager built with Tauri, React, and TypeScript.

## Description

ClipSmith is a lightweight clipboard manager that allows you to:

- View your clipboard history
- Quick paste previous clipboard items
- Search through your clipboard history
- Trigger the app with global shortcut (Ctrl+Shift+V)

**Note:** Currently only supports Windows OS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Rust](https://www.rust-lang.org/tools/install)
- Windows OS

## Development Setup

1. Install recommended IDE and extensions:

   - [VS Code](https://code.visualstudio.com/)
   - [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
   - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run tauri dev
   ```

## Building

To create a production build:

```bash
npm run tauri build
```

## Features

- Clipboard history tracking
- Global shortcut support (Ctrl+Shift+V)
- Text content support
- Dark mode support
- Instant paste functionality

## Tech Stack

- Frontend: React + TypeScript
- Backend: Rust + Tauri
- Database: Sled (embedded database)
- Styling: TailwindCSS

## License

MIT
