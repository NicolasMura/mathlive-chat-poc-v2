# Tailwind CSS

To add the Tailwind CSS configuration files for a given Angular project and install, if needed, the packages required for Tailwind CSS to work, run:

```bash
  nx generate setup-tailwind --project=public-frontend-angular
```

For a React app, it's a bit longer:

```bash
  cd apps/public-frontend-react`
```

...pointing PostCSS to Tailwind Config => adjust the postcss.config.js as follows:

```javascript
  const { join } = require('path');

  module.exports = {
    plugins: {
      tailwindcss: {
        config: join(__dirname, 'tailwind.config.js'),
      },
      autoprefixer: {},
    },
  };
```

...then update `apps/public-frontend-react/tailwind.config.js` file:

```javascript
  const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
  const { join } = require('path');

  module.exports = {
    content: [
      join(
        __dirname,
        '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
      ),
      ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
```

...finally update `apps/public-frontend-react/project.json` file adding `stylePreprocessorOptions` entry:

```json
  (...)
  "styles": ["apps/public-frontend-react/src/styles.scss"],
  "stylePreprocessorOptions": {
    "includePaths": [ "libs/frontend-tools/src/lib/styles" ]
  },
  "scripts": [],
  (...)
```

Useful link: https://blog.nrwl.io/set-up-tailwind-css-with-angular-in-an-nx-workspace-6f039a0f4479

# A few words about Nx

🔎 **Powerful, Extensible Dev Tools**

This project was generated using [Nx](https://nx.dev) and below commands:

Create NX workspace:

```bash
  npx create-nx-workspace@latest --preset=empty --package-manager=yarn
  (OR npx create-nx-workspace@"<15.0.0" --preset=empty --package-manager=yarn)
```

This resulted in following output:

```bash
  nmura@Nico-MBA-M1 dev $ npx create-nx-workspace@latest --preset=empty --package-manager=yarn
  ✔ Workspace name (e.g., org name)     · mathlive-chat-poc
  ✔ Use Nx Cloud? (It's free and doesn't require registration.) · No

  >  NX   Nx is creating your v14.1.9 workspace.

    To make sure the command works reliably in all environments, and that the preset is applied correctly,
    Nx will run "yarn install" several times. Please wait.

  ✔ Installing dependencies with yarn
  ✔ Nx has successfully created the workspace.
```

Add @nrwl/workspace:

```bash
  yarn add -D @nrwl/workspace
```

Create Angular application:

```bash
  yarn add -D @nrwl/angular
  nx g @nrwl/angular:app public-frontend-angular
```

Add Angular Material Library:

```bash
  yarn add @angular/material
  nx g @angular/material:ng-add
```

This resulted in following output:

```bash
  nmura@Nico-MBA-M1 mathlive-chat-poc (main) $ nx g @angular/material:ng-add
  ✔ Choose a prebuilt theme name, or "custom" for a custom theme: · pink-bluegrey
  ✔ Set up global Angular Material typography styles? (y/N) · true
  ✔ Set up browser animations for Angular Material? (Y/n) · true
  ✔ Packages installed successfully.
  [NX] Angular devkit called `writeWorkspace`, this may have had unintended consequences in workspace.json
  [NX] Double check workspace.json before proceeding
      Your project is not using the default builders for "test". This means that we cannot add the configured theme to the "test" target.
  UPDATE package.json
  UPDATE apps/public-frontend-angular/src/app/app.module.ts
  UPDATE workspace.json
  UPDATE apps/public-frontend-angular/src/index.html
  UPDATE apps/public-frontend-angular/src/styles.scss
```

Create NestJS application:

```bash
  yarn add -D @nrwl/nest
  nx g @nrwl/nest:app api

  yarn add @nestjs/config
```

Create React application:

```bash
  yarn add -D @nrwl/react
  nx g @nrwl/react:app public-frontend-react
```

## CheatSheet

<!-- Create `auth` module running the 'module' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:module auth --project backend-api --directory app
```

Create `auth` controller running the 'controller' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:controller auth --project backend-api --directory app/auth  --flat
```

Create `auth` service inside `auth` module running the 'service' NestJs generator with Nx project support:

```bash
  nx g @nrwl/nest:service auth --project backend-api --directory app/auth --flat
```

Create auth service inside `frontend-tools` Angular library running the 'service' Angular generator with Nx project support:

```bash
  nx g @nrwl/angular:service services/auth --project frontend-tools --flat
``` -->

Create `models` global shared lib:

```bash
  nx g @nrwl/workspace:lib models
```

Create Angular `frontend-tools` and `vendors` libraries:

```bash
  nx g @nrwl/angular:lib frontend-tools
  nx g @nrwl/angular:lib vendors
```

Add some directives, components, guards & services to `frontend-tools` library:

```bash
  nx g directive directives/autofocus --project=frontend-tools --export
  nx g component components/something-is-broken --project=frontend-tools --export
  nx g guard guards/user-logged --project=frontend-tools --export
  nx g service services/utilities --project=frontend-tools --export
  (...)
```

Create React `frontend-tools-react` library:

```bash
  nx g @nrwl/react:lib frontend-tools-react
```

Add some components to `frontend-tools-react` library:

```bash
  nx g @nrwl/react:component todos --project=frontend-tools-react --export
  (...)
```

Note: to make auto-import from the generic `models` library available to public-frontend-react in VS Code, you will have to install [Nx Console Plugin](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console).