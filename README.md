## Github client

Application for viewing organization repositories and searching for github users

[Deploy](https://wunlei.github.io/github-client)

### Tech Stack

- TypeScript
- React
- MobX
- Sass

---

## Local setup

### Prerequisites

Before running the app, ensure you have the following installed on your system:

- [node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and navigate to the project directory:

```sh
git clone https://github.com/wunlei/github-client.git
cd github-client
```

Install dependencies:

```sh
yarn
```

### Running app locally

(Optional) Create `.env` file and paste your github token:

```sh
VITE_AUTH_TOKEN=your_token
```

### Start development server

To start dev server, run:

```sh
yarn run dev
```

### Build for Production

To create a production-ready build, run:

```sh
yarn run build
```
