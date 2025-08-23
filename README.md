# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and oxlint for fast linting.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Linting with Oxlint

This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for fast, efficient linting. Oxlint is 50-100x faster than ESLint and supports TypeScript, React, and many popular ESLint rules out of the box.

### Configuration

Linting is configured in `.oxlintrc.json`. The configuration includes:

- **Categories**: `correctness` (errors), `suspicious` (warnings), and `pedantic` (warnings)
- **Plugins**: React, TypeScript, Unicorn, and OXC built-in rules
- **Environment**: Browser and ES2020 globals
- **Ignore patterns**: `dist` and `node_modules` directories

### Running the linter

```bash
# Lint all files
pnpm lint

# Lint with auto-fixing (where available)
oxlint --fix

# Lint specific files
oxlint src/
```

### Additional Oxlint features

- **Fast performance**: 50-100x faster than ESLint
- **Built-in TypeScript support**: No additional configuration needed
- **React support**: Includes React Hooks and React Refresh rules
- **Auto-fixing**: Many rules support automatic fixes
- **VS Code extension**: Install the [Oxc VS Code extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) for real-time linting

For more information, see the [Oxlint documentation](https://oxc.rs/docs/guide/usage/linter).

### References:

- https://codesandbox.io/p/sandbox/b07dmz?file=%2Fsrc%2FApp.tsx
- https://www.react-spring.dev/docs
- https://r3f.docs.pmnd.rs/tutorials/events-and-interaction
- https://r3f.docs.pmnd.rs/tutorials/using-with-react-spring
