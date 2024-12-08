#!/usr/bin/env node

import { exec } from "child_process";
import { program } from "commander";
import process from "process";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs"; 
import path from "path";
import { compileFunction } from "vm";

let poems = [];
try {
  const poemsPath = path.resolve("./poems.json");
  poems = JSON.parse(fs.readFileSync(poemsPath, "utf8"));
} catch (error) {
  console.log(chalk.red("Error loading poems.json. Please ensure the file exists and is valid."));
}


console.log(chalk.magenta("Welcome to Jules' and Moyo's CLI!"));
console.log(chalk.blue("Type 'mycli help' for more commands or 'mycli' for interactive mode"));

function mycliManual() {
  console.log(`
    Welcome to Moyo and Jules' CLI! Below is a brief overview of the commands you can use.
    
    COMMANDS OVERVIEW:
    "command" : "action" - Brief description of what the command does. 
    
    General Commands: 
      help : Displays the help manual
      poetry : Prints our favorite poetry and excerpts from a .json file 
   
    File and Directory Commands:
      ls : Lists contents in the current directory 
      ls --ext <extension> : Lists contents filtered by file extension

      pwd : Prints the current working directory.

    Echo Commands: 
      echo <message> : Prints the provided message to the console. 
      echo -- upper <message> : Prints the message in uppercase. 
      echo -- reverse <message> : Prints the message reversed. 

    CPU and System Commands: 
      CPUusage : Displays the current CPU usage statistics. 
    
    Math Commands: 
      calc <expression> : Performs basic mathematical calculations. 
                          Example: calc "5 + 3 * 2"
    
    Exit Commands: 
      exit : Prompts to confirm and exit the CLI. 
    
    EXAMPLES: 
      1. To launch interactive CLI 
        $ mycli
    
      2. To calculate a mathematic expression: 
        $ mycli calc "5 * (2 + 3)"
      
      3. To display a reversed message: 
        $ mycli echo --reverse Hello 
      
      4. To see the current CPU usage: 
        $ mycli CPUusage 
      
    Note: You can type 'mycli help' anytime for this manual 

    Enjoy! 

    `);
}

//NON INTERACTIVE 
// help command
program
  .command("help")
  .description("Prints CLI Manual")
  .action(() => chalk.bgCyan(mycliManual()));
// echo command
program
  .command("echo <message>")
  .description("Print messages")
  .option("--upper", "Convert the message to uppercase")
  .option("--reverse", "Reverse the message")
  .action((message, options) => {
    if (options.upper) message = message.toUpperCase();
    if (options.reverse) message = message.split("").reverse().join("");
    console.log(message);
  });

// ls
program
  .command("ls")
  .description("Lists contents in directory with filtering options")
  .option("--ext <extension>", "Filter by file extension")
  .action((options) => {
    const command = options.ext ? `ls *.${options.ext}` : "ls";
    exec(command, (err, stdout) => {
      console.log(err ? chalk.red(err) : stdout);
    });
  });

//pwd
program
  .command("pwd")
  .description("Prints the current working directory")
  .action(() => console.log(process.cwd()));

// CPU usage
program
  .command("CPUusage")
  .description("Get CPU usage")
  .action(() => {
    const usage = process.cpuUsage();
    console.log(chalk.greenBright("CPU Usage:"));
    console.log(chalk.blueBright(`User CPU time: ${usage.user / 1000}ms`));
    console.log(chalk.blueBright(`System CPU time: ${usage.system / 1000}ms`));
  });

//Calculate expression
program
  .command("calc <expression>")
  .description("Perform basic math calculations")
  .action((expression) => {
    try {
      const result = eval(expression);
      console.log(chalk.green(`${expression} = ${result}`));
    } catch (error) {
      console.log(chalk.red("Error evaluating expression. Please provide a valid expression."));
    }
  });

// poems and excerpts :) 
  program
  .command("poetry")
  .description("Prints a random poem from Jules' collection")
  .action(() => {
    if (poems.length === 0) {
      console.log(chalk.red("No poems available to display."));
      return;
    }
    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];
    console.log(`
      "${poem.title}" by ${poem.author}

      ${poem.text}
    `);
  });



// INTERACTIVE

function launchInteractive() {
  try {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What do you want to do?",
          choices: [
          "Print our favorite poetry and excerpts",
          "List files", 
          "Print working directory",
          "Get CPU Usage",
          "Change directory", 
          "Calculate expression",
          "Help", 
          "Exit"],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Print working directory":
            try {
                const currentDir = process.cwd(); // Get current working directory
                console.log(chalk.green(`Current working directory:`));
                console.log(chalk.blueBright(currentDir))
            } catch (error) {
                console.log(chalk.red(`Failed to fetch working directory: ${error.message}`));
            }
            
            launchInteractive(); // Relaunch the interactive menu
            break;
            
          case "List files":
            exec("ls", (err, stdout) => {
              if (err) {
                console.error(chalk.red(`Error: ${err.message}`));
              } else {
                console.log(stdout);
              }
              launchInteractive(); // Show menu again
              });
              break;
          case "Change directory":
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "directory",
                  message: "Enter the directory path to navigate to:",
                  default: process.cwd(), // Default to the current working directory
                },
              ])
              .then((response) => {
                const dir = response.directory;
                try {
                  process.chdir(dir); // Change to the new directory
                  console.log(chalk.green(`Successfully changed directory to: ${process.cwd()}`));
                } catch (error) {
                  console.log(chalk.red(`Failed to change directory: ${error.message}`));
                }
                launchInteractive(); // Relaunch the interactive menu
                });
              break;
          // GET CPU USAGE
          case "Get CPU Usage":
            const usage = process.cpuUsage();
            console.log(chalk.greenBright("CPU Usage:"));
            console.log(chalk.blueBright(`User CPU time: ${usage.user / 1000}ms`));
            console.log(chalk.blueBright(`System CPU time: ${usage.system / 1000}ms`));
            launchInteractive();
            break;
          // PRINT POETRY
          case "Print our favorite poetry and excerpts":
            if (poems.length === 0) {
              console.log(chalk.red("No poems available to display."));
            } else {
              const randomIndex = Math.floor(Math.random() * poems.length);
              const poem = poems[randomIndex];
              console.log(chalk.green("\n==================== POEM/EXCERPT ====================\n"));
              console.log(chalk.blueBright(`"${poem.title}"`), chalk.yellow(`by ${poem.author}\n`));
              console.log(chalk.white(poem.text));
              console.log(chalk.green("\n=============================================\n"));
            }
            launchInteractive();
            break; 

          // CALCULATE EXPRESSION 
          case "Calculate expression":
            inquirer
              .prompt([{ type: "input", name: "expression", message: "Enter a math expression to calculate:" }])
              .then((calcAnswers) => {
                const expression = calcAnswers.expression;
                try {
                  const result = eval(expression);
                  console.log(chalk.green(`${expression} = ${result}`));
                } catch (error) {
                  console.log(chalk.red("Error evaluating the expression. Please provide a valid expression."));
                }
                launchInteractive();
              });
            break;
            //HELP
          case "Help": // Display the CLI manual
          mycliManual();
          launchInteractive();
          break;
           
          //EXIT
          case "Exit":
            inquirer
              .prompt([{ type: "confirm", name: "exitCli", message: "Are you sure you want to exit the CLI?", default: false }])
              .then((answers) => {
                if (answers.exitCli) {
                  console.log(chalk.magenta("Exiting CLI..."));
                  process.exit(0);
                } else {
                  console.log(chalk.yellow("Exit canceled."));
                  launchInteractive();
                }
              });
            break;
        }
      });
  } catch (error) {
    console.log(chalk.red("Unexpected error occurred. Relaunching..."));
    launchInteractive();
  }
}

// process commands
program
  .command("interactive")
  .description("Launch an interactive menu for the CLI")
  .action(() => {
    launchInteractive();
  });

if (process.argv.slice(2).length === 0) {
  launchInteractive();
} else {
  program.parse(process.argv);
}
