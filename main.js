'use strict';
const {app, BrowserWindow, ipcMain } = require('electron');

const Resume = require('./Resume');

let win;
let resume = new Resume();


function main() {
    win = new BrowserWindow({width: 800, height: 600});

    ipcMain.on("show", (event) => {
        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('experience-remove', (event, args) => {
        let section = args.section,
            experience = args.experience;

        resume.removeExperience(section, experience);
        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('experience-description-edit', (event, args) => {
        let section = args.section,
            experience = args.experience;

        resume.updateExperienceDescription(section, experience, args.content);

        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('experience-period-edit', (event, args) => {
        let section = args.section,
            experience = args.experience;

        resume.updateExperiencePeriod(section, experience, args.content);

        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('section-title-edit', (event, args) => {
        let section = args.section;

        resume.updateSectionTitle(section, args.content);

        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('experience-add', (event, args) => {
        let section = args.section;
        resume.addExperience(section);

        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('section-add', (event) => {
        resume.addSection();
        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('section-remove', (event, args) => {
        resume.removeSection(args.section);
        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('resume-title-edit', (event, args) => {
        resume.updateTitle(args.content);
        event.sender.send('update', resume.getResume());
    });

    ipcMain.on('resume-description-edit', (event, args) => {
        resume.updateDescription(args.content);
        event.sender.send('update', resume.getResume());
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




