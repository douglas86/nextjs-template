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
- pnpm store prune: this will remove all node modules that are not attached to any projects if you delete node_modules and pnpm lock file runs this command after wards
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
- I have also setup custom hooks: [useFetch](#how-to-use-usefetch), [useScroll](#how-to-use-usescroll), [useAppContext](#how-to-use-useappcontext)

### How to use useFetch

Introduction: This hook is going to be used to fetch data from the server

- When fetching data from the server, pass the endpoint of the server that you are wanting data from
- For example, you can pass it the endpoint api/user
- this will fetch data from that endpoint
- but you don't need to say api in front of it
- call the endpoint user
- look at the image down below for a better example

![fetch.png](public/docs/features/fetch.png)

### How to use useScroll

### How to use useAppContext

---

## [Credits](#table-of-content)

- [YouTube tutorial](https://www.youtube.com/watch?v=31ieHmcTUOk&list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7) on setting up docker desktop if you still need assistance
- For an interactive tutorial for [Next.js](https://nextjs.org/learn)
- You are wanting to see [Next.js documentation](https://nextjs.org/docs)
- This [article](https://www.tatvasoft.com/outsourcing/2024/01/nodejs-cryptography.html) helps me with encrypting and decrypting data

---
