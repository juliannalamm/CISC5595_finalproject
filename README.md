# MyCLI Project

Welcome to **Julianna and Moyo's MyCLI**, a command-line interface tool for performing various tasks interactively or through direct commands.

---

## Features

- Read poetry and essay excerpts from our personal .json repository.
- Perform basic mathematical calculations.
- Display CPU usage.
- Change directories.
- List files in directories.
- Display current working directory.
- Echo messages with transformations (uppercase, reversed, etc.). (non-interactive mode only)
- Interactive menu for easy navigation.
- Comprehensive help manual.

---

## Installation

1. Prerequisites: Ensure that node.js and npm are installed either using homebrew or from the Node.js website 
   ```bash
   - [Homebrew](https://brew.sh/): `brew install node`
   - [Node.js website](https://nodejs.org/): Download and install the latest stable version.


2. Clone the repository:
   ```bash
   git clone https://github.com/juliannalamm/CISC5595_finalproject.git

3. Navigate to the project directory 
   ```bash
   cd CISC5595_finalproject

4. Install dependencies
   ```bash
   npm install

5. Link the cli command globally 
   ```bash
      npm link
6. Run the CLI by typing 
   ```bash 
      mycli 
7. After running the CLI, you will be greeted with an interactive menu, select help for a full list of commands and CLI functionalities. If you would like to test the CLI without interactive mode, select exit from the menu and simply type
   ```bash 
      mycli <command>

      Example: 
      mycli pwd


## File Structure
final_project/
├── bin/
│   └── index.js
├── node_modules/
├── package.json
├── package-lock.json
├── poems.json
└── README.md
