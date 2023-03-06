// team information files access
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//node modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
//team array
let teamProfiles = [];
//datas for manager profile
function profilemanager(){

inquirer.prompt([
    {
        type: "input",
        message: "What is manager's Name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the manager's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is manager's Email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the manager's Office Number:",
        name: "officeNumber"
    },
    {
        type:"list",
        message:"Do you want to create an engineer/intern?",
        name:"role",
        choices:['engineer',
                 'intern',
                 'done',]
    },
])
.then((res)=>{
     const currentManager = new Manager(res.name, res.id, res.email, res.officeNumber)
     teamProfiles.push(currentManager);
    console.log(res);
    if (res.role === 'engineer'){
        profileengineer();
    }
    if(res.role === 'intern') {
        profileintern();
    }
    if (res.role === 'done'){
        createTeam();
    }
})
}

//write file if all informations get success
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
err ? console.error(err) : console.log('Success!')
 );
}
// datas for engineer profile
function profileengineer(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is engineer Name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is engineer's Email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's github:",
            name: "github"
        },
        {
            type:"list",
            message:"Do you want to create an engineer/intern?",
            name:"role",
            choices:['engineer',
                     'intern',
                    'done',]
        },
    ])
    .then((res)=>{
        const currentEngineer = new Engineer(res.name, res.id, res.email, res.github)
     teamProfiles.push(currentEngineer);
        console.log(res);
        if (res.role === 'engineer'){
            profileengineer();
        }
        if(res.role === 'intern') {
            profileintern();
        }
        if (res.role === 'done'){
            createTeam();
        }
    })
}

// datas for intern profile
function profileintern(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is intern's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is intern's Email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the intern's school?",
            name: "school"
        },
        {
            type:"list",
            message:"Do you want to create an engineer/intern?",
            name:"role",
            choices:['engineer',
                     'intern',
                    'done',]
        },
        
    ])

    .then((res)=>{
        const currentIntern = new Intern(res.name, res.id, res.email, res.school)
     teamProfiles.push(currentIntern);
        console.log(res);
        if (res.role === 'engineer'){
            profileengineer();
        }
        if(res.role === 'intern') {
            profileintern();
        }
        if (res.role === 'done'){
            createTeam();
        }
    })
}
// render HTML file
function createTeam() {
    const createIndex = render(teamProfiles)
    writeToFile(outputPath, createIndex)
}

profilemanager();

