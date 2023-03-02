// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "Enter a title for this project",
  },
  {
    type: "input",
    name: "Description",
    message: "Enter a description for this project",
  },
  {
    type: "input",
    name: "Installation",
    message: "What command(s) are needed for this project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Describe the usage of this project",
  },
  {
    type: "rawlist",
    name: "license",
    message: "What Git license are you using?",
    choices: ["MIT", "GNU", "Apache"],
  },
  {
    type: "input",
    name: "contribute",
    message: "How can one contribute to this project",
  },
  {
    type: "input",
    name: "questions",
    message:
      "Provide contact information for questions from other developers or users",
  },
  {
    type: "input",
    name: "fullName",
    message: "Provide your full name for your License",
  },
  {
    type: "input",
    name: "githubProfile",
    message: "Enter your github Profile link",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.error(err) : console.log("Success!");
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const result = genrateREADME(answers);
      console.log(result);
      writeToFile("sampleREADME.md", result);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function call to initialize app
init();

//NOTE: on the template we need to make a table of contents with the sections, Installation
function genrateREADME(answers) {
  let license;
  let badge;
  if (answers.license === "Apache") {
    license = `
   Copyright ${new Date().getFullYear()} ${answers.fullName}

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
   http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`;

    badge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
  } else if (answers.license === "MIT") {
    license = `
    Copyright (c) ${new Date().getFullYear()} ${answers.fullName}

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.`;

    badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
  } else if (answers.license === "GNU") {
    license = `
    Copyright (c) ${new Date().getFullYear()} ${answers.fullName}

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.`;

    badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
  }

  return `${badge}
  
# ${answers.title}\n
${answers.Description}\n

## Table of Contents
- [README Generator](#readme-generator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)
  - [Testing](#testing)
  - [Questions](#questions)
  - [License](#license)
 
## Installation
\`\`\`\n ${answers.Installation} \n\`\`\` \n

## Usage \n
${answers.usage}\n

## Contribute
${answers.contribute}

## Testing
We rolled out a Beta version of this README.md application for users to test. For any further information, please contact me with the information below. \n

## Questions
You can reach me at ${answers.questions} for any questions or comments. \n \n
[Link to my GitHub profile](${answers.githubProfile})

## License
${license}



`;
}

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which
//license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
