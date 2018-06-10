# FreeChatClient

A chat client paired with a self hosted server solution.

Note: The client depends on the API service, and chat message broker to run.

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/martin-juul/freechat-client
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` that are only used in electron on the backend when the application is built by the packager. Please use `npm` as dependencies manager.

App code is in `src/app`

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.  
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli@1.7.4
```

## To build for development

- **in a terminal window** -> npm start  

The application code is managed by `main.ts`.

## Manage your environment variables

- Using local variables :  `npm start` or `cross-env ENV=local npm start`
- Using development variables :  `cross-env ENV=dev npm start`
- Using production variables  :  `cross-env ENV=prod npm start`

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**
