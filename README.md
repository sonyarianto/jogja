<a href="https://paypal.me/sonyarianto" target="_blank">
 <img alt="Sponsor" src="https://img.shields.io/badge/donate-Paypal-fd8200.svg" />
</a>
<a href="https://github.com/sponsors/sonyarianto" target="_blank">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/sonyarianto">
</a>
<a href="https://discord.gg/5Xj7HRMC34" target="_blank">
  <img alt="Discord" src="https://img.shields.io/discord/1089563520988893306">
</a>
<a href="https://www.npmjs.com/package/jogja" target="_blank">
 <img alt="npm" src="https://img.shields.io/npm/dt/jogja">
</a>
<a href="https://www.npmjs.com/package/jogja" target="_blank">
 <img alt="npm" src="https://img.shields.io/npm/v/jogja">
</a>

# jogja

Project generator for web frameworks. It provides scaffolding for your apps. Still for busy and lazy people.

## Overview

I know there are so many web frameworks outhere. How about we have centralized tools to trigger create project for those frameworks? That's why I created `jogja`.

## How it works?

Every web framework has their own cli to create project. Jogja will trigger the cli to create project for you. So you don't need to install every cli for every framework. After you choose specific framework, `jogja` will trigger the cli to create project for you along with more options.

## Features

- Trigger create project for AdonisJS, Alpine.js, Analog, Angular, Astro, Aurelia, Docusaurus, Ember.js, Expo, Express.js, Fastify, Gatsby, Gridsome, Hexo, Hono, Inferno, Medusa, NestJS, Next.js, Nitro, Nuxt.js, Nx, Preact, Qwik, React (creact-react-app/CRA), React Redux, RedwoodJS, Remix, Sails, SolidJS, SolidStart, Stencil, SvelteKit, Vite, VitePress, Vue.js, VuePress, Vuetify.
- Navigate using keyboard (up and down key).

## Installation

Install it globally.

```
npm i -g jogja
```

Now you can call it by type `jogja` on your computer. Use keyboard (up, down and enter key) to select options.

## Screenshot

![Jogja](https://github.com/sonyarianto/jogja/blob/main/jogja.png?raw=true&assets_version=202309101654)

## FAQs

- **How to update?** Just run `npm i -g jogja` again. It will update the package to the latest version.
- **How to add new framework?** You can create PR to add new framework. Or you can create issue to request new framework.
- **I want to install non-JavaScript framework. Can I?** You can't at the moment. Support for other languages/frameworks will be added in the future.
- **Why the name is `jogja`?** Jogja a.k.a Yogyakarta is the name of city in Indonesia. I want to make this project as a tribute to the city.

## Contributing

Contributions are welcome! Open a pull request to fix a bug, or open an issue to discuss new feature or changes.

## How to look into the code?

File `src/index.ts` is the entry point of this software. So usually to run locally I am doing this.

```bash
npx jiti ./src/index.ts
// or npm run start
```

`jiti` is runtime TypeScript and ESM support for Node.js. I use that and I love it.

## License

MIT

Copyright &copy; 2023 Sony Arianto Kurniawan <<sony@sony-ak.com>> and contributors.
