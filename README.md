# Hyperspace Frontend Take Home Test

Hello Hyperspace cadet!

This is the take home test that we use to let you showcase your frontend skills. This README will provide some helpful links for you to use as you build out your solution as well as general guidance on what we are looking for.

## Running the frontend

```bash
yarn install
yarn start (app should come up on localhost:3000)
```

## Getting started

1. Make sure that you are on your own branch of this repo. Your branch name should be named `[your-name]-candidate`. You should **NOT** be commiting/pushing code directly to the `main` branch. So, double check that before pushing any changes.
2. You will be utilizing the Hyperspace SDK/API to build out your solution. The docs can be found [here](https://docs.hyperspace.xyz/hype/developer-guide/overview). The main APIs you will be using will be found in this [section](https://docs.hyperspace.xyz/hype/developer-guide/api-calls)

## The codebase

As you will notice, the codebase is pretty bare bones. It is a NextJS + Typescript repo, utilizing ChakraUI as the component and themeing library.

[ChakraUI Docs](https://chakra-ui.com/docs/components)
[NextJS Docs](https://nextjs.org/docs/getting-started)

There is only one page that the react application is rendering right now and it is the root path `/` found here `src/pages/index.tsx`.

You will see the Hyperspace client being initialized here and some other building blocks that we set in place like our logo in the top left and the dark/light mode toggle. Other than that it is empty.

There is a `theme.tsx` file in the repo that is part of the chakraUI themeing system. It is what you should use to add new colors and other CSS properties to your theme. This is also where you go to make sure you have support for both dark and light modes if you choose to support both ;).

## Your Task

Your goal for this take home test is to utilize the data available to you via our Hyperspace API to build out a frontend experience for us to review together. What that experience is, is up to you.

We have intentionally left this application as empty as possible because we don't want to influence what you end up building.

Some things we will be looking for/evaluating when we read your final code submittion are as follows (this list is not exhaustive)

- Code organization/structure
- Code modularity
- Frontend styling
- Overall UX of solution

Extra points/nice to haves

- Support for both dark/light mode: If you want to just build for one color mode that is fine.
- Animations
- High fidelity styling of frontend: This is a frontend take home after all. You don't have to be a master designer but having a good design sense of what looks good and what doesn't as your building is important for every FE Engineer

To get some inspiration of what to build just visit [Hyperspace](https://hyperspace.xyz). Our API can be used to build everything on our landing page although we ideally don't want you to just rebuild what we have on Hyperspace. Be creative. You can draw inspiration from Hyperspace but try to be unique with how you use our data to present your solution.

## How to Submit

1. Throughout your exercise you should be commiting and pushing code often to your branch. This makes it easier for us to review how you break up your building.
2. Once you have your frontend finalized and are happy with your solution. Open up a Pull Request for your branch into `main` and tag the following people as reviewers `0xAlwaysDumpling`, `cieltan`, and `dre-draws`
3. Sit back and relax. We will review your submition and will follow up with you to set up a time for us to go through your solution together!

If you have any questions during your take home or are blocked from making progress for any reason please reach out to `adriano@hyperspace.xyz`.
