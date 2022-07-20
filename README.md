<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<p align="center">
  <a href="https://mathlive-chat-poc.nicolasmura.com" target="_blank">
    <img alt="Mathlive chat poc image" src="./apps/public-frontend-angular/src/assets/images/mathlive.png" width="400" />
  </a>
</p>

# Mathlive Chat POC

Fullstack monorepo for a simple chat with visual math equations feature powered by mathlive. With Angular frontend and NestJS backend REST API.

- [Mathlive Chat POC](#mathlive-chat-poc)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Run & test locally with Docker](#run--test-locally-with-docker)
  - [Run & test (& dev!) locally without Docker](#run--test--dev-locally-without-docker)
- [Dockerization](#dockerization)
  - [Frontend and backend images for Prod](#frontend-and-backend-images-for-prod)
- [Deploy in a real-world production environment](#deploy-in-a-real-world-production-environment)
- [Unit tests with Jest](#unit-tests-with-jest)
- [End-to-end (e2e) tests with Cypress](#end-to-end-e2e-tests-with-cypress)
- [Interesting stuffs to do / Nice to have](#interesting-stuffs-to-do--nice-to-have)
- [History](#history)

# Requirements

To contribute to this project and run it locally, you will need:

- [Node JS >= v16.14 & NPM >= 8.5](https://nodejs.org/en)
- [Angular 13](https://angular.io)
- [Typescript >= 4.6.4](https://www.typescriptlang.org)
- [Docker >= 20.10.14](https://www.docker.com)

> :bulb: **_Tip_**
>
> [Microsoft VS Code editor](https://code.visualstudio.com/) is already packaged with Typescript.

# Quick start

## Run & test locally with Docker

@TODO...

## Run & test (& dev!) locally without Docker

Run:

```bash
  git clone git@github.com:NicolasMura/mathlive-chat-poc-v2.git
  cd mathlive-chat-poc-v2
  # create .env file
  cp .env.example .env
  # install dependencies
  yarn install
```

If needed, adjust environment variables in `apps/public-frontend-angular/src/env.js`

Then, start frontend and backend apps:

```bash
  yarn start:public-frontend-angular
  yarn start:public-frontend-react
  yarn start:backend-api
```

Visit `http://localhost:4200` & `http://localhost:4201` to see the result.

# Dockerization

## Frontend and backend images for Prod

Mandatory server-side files and folders:

* <PROJECT_FOLDER>/config/(dev.)<URL_SITE>-le-ssl-host-proxy.conf
* <PROJECT_FOLDER>/ssl/fullchain.pem
* <PROJECT_FOLDER>/ssl/privkey.pem
* /var/log/<URL_SITE>

```bash
  # mkdir -p .docker/apache_vol/log && mkdir .docker/apache_vol/ssl ??
```

Build locally and push new Docker image for:

`public-frontend-angular`:

```bash
  nx build public-frontend-angular --prod
  docker build -t mlchat-poc-public-frontend-angular -f .docker/Dockerfile.public-frontend-angular .
  docker tag mlchat-poc-public-frontend-angular nicolasmura/mlchat-poc-public-frontend-angular
  docker push nicolasmura/mlchat-poc-public-frontend-angular
  docker tag mlchat-poc-public-frontend-angular nicolasmura/mlchat-poc-public-frontend-angular:v1.0
  docker push nicolasmura/mlchat-poc-public-frontend-angular:v1.0
```

`public-frontend-react`:

```bash
  # @TODO
```

`backend-api`:

```bash
  docker build -t mlchat-poc-backend-api -f .docker/Dockerfile.backend-api .
  docker tag mlchat-poc-backend-api nicolasmura/mlchat-poc-backend-api
  docker push nicolasmura/mlchat-poc-backend-api
  docker tag mlchat-poc-backend-api nicolasmura/mlchat-poc-backend-api:v1.0
  docker push nicolasmura/mlchat-poc-backend-api:v1.0
```

Finally, on server side:

```bash
  docker-compose --env-file .env up -d
```

To get latest images:

```bash
  docker pull nicolasmura/mlchat-poc-public-frontend-angular \
    docker pull nicolasmura/mlchat-poc-public-frontend-react \
    docker pull nicolasmura/mlchat-poc-backend-api
```

# Deploy in a real-world production environment

> :warning: **_Important_**
>
> On Linux systems with Apache web server, you must set the Apache log folder ownership as following to make it work:
> ```bash
>   sudo chmod 777 .docker/mongodb_vol/log
> ```
>
> Don't worry about that.

Don't forget also to give correct ownership to Apache log folder:

```bash
  sudo chown -R <you>:www-data /var/log/<URL_SITE>
```

# Unit tests with Jest

To run all unit tests with Jest, run one of these commands:

```bash
  yarn unit-test
  yarn unit-test:coverage
```

To run unit tests just for `public-frontend-angular` Angular project, run:

```bash
  yarn unit-test:public-frontend-angular
```

To run a specific test file, let's say `apps/public-frontend-angular/src/app/app.component.spec.ts`, run:

```bash
  yarn unit-test:public-frontend-angular --test-file apps/public-frontend-angular/src/app/app.component.spec.ts
```

See also https://github.com/molily/angular-form-testing

# End-to-end (e2e) tests with Cypress

To launch E2E tests, you will need Cypress to be installed on your machine, and stop your local server [http://localhost:4200](http://localhost:4200) before launching tests.

To launch E2E tests with Cypress in headless mode (as it is in a CI environment), run:

```bash
  yarn e2e:public-frontend-angular
```

To see what is really happening (ie with Cypress UI opened in watch mode), run instead:

```bash
  yarn e2e:public-frontend-angular:watch
```

You have the exact equivalent commands with React app:

```bash
  yarn e2e:public-frontend-react
  yarn e2e:public-frontend-react:watch
```

Note: to make possible common E2E tests between Angular and React apps (as they are the same in this project), see `apps/public-frontend-react-e2e/cypress.json` adjusments and replace:

```json
  {
    (...)
    "fixturesFolder": "./src/fixtures",
    "integrationFolder": "./src/integration",
    "supportFile": "./src/support/index.ts",
    (...)
  }
```

by:

```json
  {
    (...)
    "fixturesFolder": "../../apps/public-frontend-angular-e2e/src/fixtures",
    "integrationFolder": "../../apps/public-frontend-angular-e2e/src/integration",
    "supportFile": "../../apps/public-frontend-angular-e2e/src/support/index.ts",
    (...)
  }
```

# Interesting stuffs to do / Nice to have

* Signup form (see https://github.com/molily/angular-form-testing)


# History

To see how this project, with its apps, libs, components, services and tailwind configs, were generated, see [history.md].

[history.md]: ./doc/history.md
