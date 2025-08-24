# Dev Portfolio

This repository contains the source code for my personal portfolio website. It showcases my projects, skills, and experience, built with modern web development tools and technologies.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Ant Design**: A React UI library for building elegant and responsive interfaces.
- **React Router**: For client-side routing in the single-page application.
- **Oxlint**: A fast and efficient linter for TypeScript and React.
- **Prettier**: A code formatter to ensure consistent code style.
- **Commit-lint**: Enforces consistent commit message conventions.
- **Lint-staged**: Runs linters on staged files before committing.
- **Husky**: Manages Git hooks to automate linting and commit message validation.

## Linting with Oxlint

This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for fast, efficient linting. Oxlint is 50-100x faster than ESLint and supports TypeScript, React, and many popular ESLint rules out of the box.

### Oxlint Configuration

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

## Commit-lint

This project uses [commitlint](https://commitlint.js.org/) to enforce consistent commit message conventions. The configuration is defined in `commitlint.config.js` and ensures that all commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.

### Commit-lint Configuration

Commit-lint is automatically triggered during the commit process via Husky. If a commit message does not meet the required format, the commit will be rejected.

## Lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) is used to run linters on staged files before committing. This ensures that only properly formatted and linted code is committed to the repository.

### Lint-staged Configuration

The `lint-staged` configuration is defined in `package.json` and includes:

- Running Oxlint on staged TypeScript and JavaScript files.
- Formatting staged files with Prettier.

### Running Lint-staged

Lint-staged is automatically triggered during the commit process via Husky.

## Husky

[Husky](https://typicode.github.io/husky/) is used to manage Git hooks in this project. It is configured to run pre-commit and commit-msg hooks to ensure code quality and commit message consistency.

### Husky Configuration

Husky hooks are defined in the `.husky` directory and include:

- **pre-commit**: Runs `lint-staged` to lint and format staged files.
- **commit-msg**: Runs `commitlint` to validate commit messages.

### Setting up Husky

Husky is automatically set up when dependencies are installed. If you need to manually set it up, run:

```bash
pnpm husky install
```

## Configuring Prettier

[Prettier](https://prettier.io/) is used in this project to ensure consistent code formatting. The configuration is defined in `.prettierrc` and includes rules for formatting code, such as line width, tab width, and single/double quotes.

### Running Prettier

You can run Prettier manually or as part of the lint-staged process:

```bash
# Format all files
pnpm prettier --write .

# Check for formatting issues without making changes
pnpm prettier --check .
```

## References

- [CodeSandbox Example](https://codesandbox.io/p/sandbox/b07dmz?file=%2Fsrc%2FApp.tsx)
- [React Spring Documentation](https://www.react-spring.dev/docs)
- [React Three Fiber Events and Interaction](https://r3f.docs.pmnd.rs/tutorials/events-and-interaction)
- [React Three Fiber with React Spring](https://r3f.docs.pmnd.rs/tutorials/using-with-react-spring)
