# Introduction—Next.js Template

---

# Table of content

- [Getting Started](#getting-started)
  - [Setting up Locally](#setting-up-locally)
  - [Instructions for Linux](#instructions-for-linux)
  - [Instructions for Windows](#instructions-for-windows)
  - [Instructions for Mac](#instructions-for-mac)
  - [Node Version Manager](#node-version-manager)
  - [pnpm Package Manager](#pnpm-package-manager)
- [Features](#features)
  - [Scripts](#scripts)
  - [How to use useFetch hook](#how-to-use-usefetch-hook)
  - [How to use useScroll hook](#how-to-use-usescroll-hook)
  - [How to use useAppContext hook](#how-to-use-useappcontext-hook)
    - [What is declared in the state store?](#what-is-declared-in-the-state-store)
    - [How do you use the State store?](#how-do-you-use-the-state-store)
  - [Swagger UI](#swagger-ui)
- [Credits](#credits)

---

## [Getting Started](#table-of-content)

What is necessary before cloning this repository?

- Make sure to install [Docker Desktop](https://www.docker.com/)
- [Node Version Manager](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) needs to be installed
- This project also works with [pnpm package manager](https://pnpm.io/)

Note: to install the above information, please see the Instructions on your preferred Operating system

### [Setting up Locally](#getting-started)

- Once you have installed what is required for your operating system, come back to this space
- using either http or ssh to clone your repo
- git clone https://github.com/douglas86/nextjs-template.git
- git clone git@github.com:douglas86/nextjs-template.git
- This project uses node version 22
- Which can be seen in the package.json under the engines object

![engines_object.png](public/docs/setup/engines_object.png)

- Please make sure that [nvm](#node-version-manager) is installed and using node version 22
- To see if you have the correct node version, run $ node --version
- If it does not say 22
- Then using nvm run the following commands:
  - $ nvm install 22
  - $ nvm use 22
  - $ nvm default 22: this command will make 22 the new default node version
- Once that is done, make sure that it is the correct node version run: $ node --version
- The next step would be to set up all environment variables
- create a file .env in the root directory of your project
- on the same level as docker-compose.yaml

![env_variables.png](public/docs/setup/env_variables.png)

DATABASE_URL environment variable

- To get the DATABASE_URL follow the following pattern
- postgresql://username:password@localhost:5432/database?schema=public
- to get this information, look at the docker-compose.yaml file
- under the database service
- POSTGRES_USER: username
- POSTGRES_PASSWORD: password
- POSTGRES_DB: database
- this is for local development

NEXT_APP_GOOGLE_CLIENT_ID and NEXT_APP_GOOGLE_SECRET_KEY environment variable

- Set up [Google Authentication](https://analytify.io/get-google-client-id-and-client-secret/)
- This needs to be set up in the Google developer console
- Call this new Project based on the project that you are creating
- NEXT_APP_GOOGLE_CLIENT_ID: client id
- NEXT_APP_GOOGLE_SECRET_KEY: secret key
- copy and paste it in the environment variable

JWT_SECRET, DATA_ENCRYPTION_SECRET, NEXTAUTH_SECRET_IV environment variable

- These secret keys need to be generated
- Use the following command $ openssl rand -base64 32
- that should then give you a string that is necessary for .env file
- if you are using windows, make sure to use wsl
- once generated, place it in your environment variable file
- you can use the same generated key for all the environment variable
- during local development
- But if this is going to production, please create different keys for each one
- it will help improve security

NEXTAUTH_ALGORITHM environment variable

- The project uses an algorithm for decrypting and encrypting data
- use an algorithm of aes-256-cbc
- NEXTAUTH_ALGORITHM: algorithm key

NEXTAUTH_URL environment variable

- this is the url that you are using for this project
- NEXTAUTH_URL: http://localhost:3000

Note: make sure that all environment variables are in quotes

- Once nvm has been setup for node version 22
- install pnpm globally; this is the package manager that I am using for this project
- $ npm install -g pnpm: this is the command to install pnpm globally
- To start this project, make sure that Docker Desktop is up and running
- and run the following command: $ pnpm dev
- this will install and run the project, 
- at the same time, it will also run the migrations for the databases
- once that running process has finished, open up a browser
- go to localhost:3000

Note: "$" symbol in front is not part of the command it is to show that it is a command meant for the terminal

### [Instructions for Linux](#getting-started)

- Install docker desktop from the following [link](https://docs.docker.com/desktop/install/linux-install/)
- If you are needing additional assistance, go to the [credits section](#credits) for additional information
- Once docker desktop has been installed then install [nvm](#node-version-manager) see instructions below
- This Project uses pnpm as its package manager
- To install pnpm globally, run the following command: $ npm install -g pnpm

Note: "$" symbol in front is not part of the command it is to show that it is a command meant for the terminal

### [Instructions for Windows](#getting-started)

- Install docker desktop from the following [link](https://docs.docker.com/desktop/install/windows-install/)
- Install [wsl](https://techcommunity.microsoft.com/t5/windows-11/how-to-install-the-linux-windows-subsystem-in-windows-11/m-p/2701207) this will help with giving you Linux Superpowers on a Windows Machine
- Once wsl has been installed, see instructions on installing [nvm](#node-version-manager)

### [Instructions for Mac](#getting-started)

- Install docker desktop from the following [link](https://docs.docker.com/desktop/install/mac-install/)

I haven't been able to test on a MacBook Yet
But, strictly speaking, the setup process should be the same as Linux

### [Node Version Manager](#getting-started)

- To install node version manager with curl, run the following command
- $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
- then restart the terminal
- to verify that it worked, run the following command
- $ nvm --version
- Once you have installed nvm, go back to the installing instructions for your Operating System

Note: "$" symbol in front is not part of the command it is to show that it is a command meant for the terminal

Commands that can be used with NVM:

- nvm --version: show the version of nvm
- nvm install 22: install node version 22
- nvm use 22: use node version 22—when you run this command it is only available for the current session
- nvm default 22: sets node version 22 as the default version
- nvm list: will show you all node versions that you have on your system

Note: To get the latest nvm script click [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

### [pnpm Package Manager](#getting-started)

To install pnpm run the following command: $ npm install -g pnpm

Commands that can be used with PNPM:

- pnpm script: this will run the script that is defined in package.json, a script is the name of the script
- pnpm store prune: this will remove all node modules that are not attached to any projects if you delete node_modules and pnpm lock file run this command after wards
- pnpm install: install all packages from package.json
- pnpm add package: adds the package that you want to install
- pnpm exec prisma generate: this will generate the data in your prisma schema
- pnpm exec prisma migrate dev: this will migrate the database

Note: pnpm uses symlinks for all node packages,
which in theory is supposed to make it faster for execution and storage space

Note:
If you are using windows, please use PowerShell to run pnpm as for some reason wsl didn't want to work in this regard

---

## [Features](#table-of-content)

This project has the following features

- cypress for testing
- prisma orm for database management
- tailwind for styling all of my components
- [swagger ui](#swagger-ui) for documenting all endpoints
- I have also setup custom hooks: [useFetch](#how-to-use-usefetch-hook), [useScroll](#how-to-use-usescroll-hook), [useAppContext](#how-to-use-useappcontext-hook)
- I have also setup [scripts](#scripts) to make it easier to run certain commands

### Scripts

Docker
- To run the docker script type $ pnpm docker
- Please make sure that Docker desktop is up and running before running this script
- This will run three commands:
  - $ pnpm store prune
  - $ pnpm install
  - $ docker-compose up
- it will first remove all dead packages from pnpm store
- It will then install all packages to pnpm store
- it will then start the docker daemon tool

Prisma
- To run prisma script type $ pnpm prisma 
- This will run prisma studio
- Prisma Studio to a GUI for Prisma ORM
- It is used to visualize your data in the database
- It opens in a new browser tab

Cypress
- To run cypress script type $ pnpm cypress
- Cypress is a test framework for automatically testing the UI/UX of your website

### How to use useFetch hook

Introduction: This hook is going to be used to fetch data from the server

- When fetching data from the server, pass the endpoint of the server that you are wanting data from
- For example, you can pass it the endpoint api/user
- this will fetch data from that endpoint
- but you don't need to say api in front of it
- call the endpoint user
- look at the image down below for a better example

![fetch.png](public/docs/features/fetch.png)

### How to use useScroll hook

Introduction:
This hook uses [infinite scroll](https://www.google.com/search?q=what+is+infinite+scroll&oq=what+is+infinite+scroll&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIICAUQABgWGB4yCggGEAAYDxgWGB4yCggHEAAYDxgWGB4yCAgIEAAYFhgeMggICRAAGBYYHtIBCDU1MjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8)
to fetch data from the server

- I have created a custom hook called useScroll
- import it at the top of your file
- destructure: issues, loadMoreRef, isLoadingMore, isReachingEnd from custom hook
- There is one required value and an optional value to pass into the hook
- The required parameter is the url that you want to get from
- The optional parameter is how many documents you want to fetch at a time
- This optional parameter is defaulted to 10 documents

![scroll.png](public/docs/features/scroll.png)

- The data can then be mapped
- A div needs to be created as a placeholder for the ref (shown on line 31)
- The next one is isLoadingMore which is used to see if more data is to come
- The next one is isReachingEnd for telling you when the end is near

### How to use useAppContext hook

Introduction:
This hook is used to fetch
and post data to the [state store](https://www.google.com/search?q=what+is+a+state+store+used+for+in+react&sca_esv=02c44965d6d4b280&sca_upv=1&sxsrf=ADLYWIJlOh7mB10xne6S8P-eyQKUvfXPwQ%3A1727277711166&ei=jyr0ZtTzCa-qhbIPqLSFyQ8&ved=0ahUKEwiU95vzst6IAxUvVUEAHShaIfkQ4dUDCBA&uact=5&oq=what+is+a+state+store+used+for+in+react&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ3doYXQgaXMgYSBzdGF0ZSBzdG9yZSB1c2VkIGZvciBpbiByZWFjdDIFECEYoAEyBRAhGKABMgUQIRifBTIFECEYnwUyBRAhGJ8FMgUQIRifBTIFECEYnwVI1xlQmwhYkRhwAXgBkAEAmAHrAaAB-guqAQUwLjcuMrgBA8gBAPgBAZgCCqACpQzCAgoQABiwAxjWBBhHwgIHECEYoAEYCsICBBAhGBWYAwCIBgGQBgWSBwUxLjcuMqAH-kk&sclient=gws-wiz-serp)

#### What is declared in the state store?

- There are five objects that are declared for the state store 
- state, dispatch, user, data, forms
- state—this is everything that is stored in your state store
- dispatch - this is when you want to post something to the state store
- user, data, forms—these are reduced functions that were defined in the context directory

![state-store.png](public/docs/features/state-store.png)

#### How do you use the State store?

Fetching data from state store?
- When the app loads, I fetch data for the current logged-in user
- To use this data, you only need to structure it

![destructure.png](public/docs/features/destructure.png)

- Once data has been fetched, you can display it with ease

![display-data.png](public/docs/features/display-data.png)

- The same thing goes for the other reduced functions
- The data reduced function is for all other data that you want to fetch and use
- The forms reduced function are to handle all form data
- Only form data that you want to post to your endpoint

Posting data to your endpoint?
- To post data to your endpoints destructure dispatch from state

![dispatch.png](public/docs/features/dispatch.png)

- When posting data to state store pass a maximum of two objects to dispatch
- type and payload
- type is what case inside the switch statement you want to use
- payload is the data that you are wanting to post

![dispatch-function.png](public/docs/features/dispatch-function.png)

- You can see the type if you look at the user reducer function

![userReducer.png](public/docs/features/userReducer.png)

### Swagger UI

- To use swagger UI type /swagger into the address bar
- Wait about two to three seconds for Next.js to cache the data

![swagger.png](public/docs/features/swagger.png)

- All data for swagger is stored in swagger.yaml file
- under public directory

---

## [Credits](#table-of-content)

- [YouTube tutorial](https://www.youtube.com/watch?v=31ieHmcTUOk&list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7) on setting up docker desktop if you still need assistance
- For an interactive tutorial for [Next.js](https://nextjs.org/learn)
- You are wanting to see [Next.js documentation](https://nextjs.org/docs)
- This [article](https://www.tatvasoft.com/outsourcing/2024/01/nodejs-cryptography.html) helps me with encrypting and decrypting data

---
