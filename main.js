'use strict';
const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let resume = {
    "title": "Chuojia Mo",
    "description": "Hello, I am Jiajia",
    "cv": [{
        "id": 1,
        "title": "Education",
        "experiences": [
            {
                "id": 0,
                "period": "sept. 2017 - present",
                "description": "Education 1."
            },
            {

                "id": 0,
                "period": "aug. 1800 - sept. 2017",
                "description": "Education 2."
            }
        ]
    }, {
        "id": 2,
        "title": "Experience",
        "experiences": [
            {
                "id": 1,
                "period": "sept. 2017 - present",

                "description": "Experience 1." },
            {
                "id": 2,
                "period": "aug. 800 - sept. 2017",

                "description": "Experience 2."}
        ]
    }]
};

function main() {
    win = new BrowserWindow({width: 800, height: 600});

    ipcMain.on("show", (event) => {
        event.sender.send('update', resume);
    });

    ipcMain.on('experience-remove', (event, args) => {
        let section = args.section,
            experience = args.experience;

        resume.cv[section].experiences.splice(experience, 1);
        console.log(resume.cv[section].experiences);
        win.webContents.send('update', resume);
    });

    ipcMain.on('experience-edit', (event, args) => {
        // resume[args.section].experiences[args.experience] = args.content;
        // event.sender.send('update', resume);
    });

    ipcMain.on('experience-add', (event, args) => {
        // resume[args.section][args.experience] = args.content;
        // event.sender.send('update', resume);
    });


    win.on('closed', () => {
        win = null
    });
    win.loadFile('index.html');


}

app.on('ready', main);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        main()
    }
});



