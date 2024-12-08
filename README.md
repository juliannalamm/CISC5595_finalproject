# MyCLI Project

Welcome to **Jules and Moyo's MyCLI**, a command-line interface tool for performing various tasks interactively or through direct commands.

---

## Features

- Print our favorite poetry and essay excerpts.
- Perform basic mathematical calculations.
- Display CPU usage.
- List files in directories.
- Display current working directory.
- Echo messages with transformations (uppercase, reversed, etc.).
- Interactive menu for easy navigation.
- Comprehensive help manual.

---

## Installation

1. Prerequisites: Ensure that node.js and npm are installed either using homebrew or from the Node.js website 

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
7. After running the CLI, you will be greeted with an interactive menu, select help for a full list of commands and CLI functionalities


## File Structure
final_project/
├── bin/
│   └── index.js
├── node_modules/
├── package.json
├── package-lock.json
├── poems.json
└── README.md