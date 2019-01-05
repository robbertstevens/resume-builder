'use strict';

const handlebars = require('handlebars');
const { ipcRenderer } = require('electron');

handlebars.registerPartial({
   "experience": document.getElementById("hb-experience-template").innerHTML,
   "section": document.getElementById("hb-section-template").innerHTML,
});

let source = document.getElementById('hb-cv-template').innerHTML;
let template = handlebars.compile(source);

ipcRenderer.send('show');

ipcRenderer.on("update", (event, resume) => {

    let content = document.getElementById('cv');
    content.innerHTML = "";
    content.innerHTML = template(resume);


    let title = document.getElementById("resume-title"),
        description = document.getElementById("resume-description");

    title.addEventListener("blur", function() {
        ipcRenderer.send("resume-title-edit", {
            "content" : this.innerHTML,
        });
    });
    description.addEventListener("blur", function() {
        ipcRenderer.send("resume-description-edit", {
            "content" : this.innerHTML,
        });
    });

    document.querySelectorAll(".experience-description").forEach(function (element) {
        element.addEventListener("blur", function() {
            ipcRenderer.send('experience-description-edit', {
                'content': this.innerHTML,
                'section': this.dataset.section,
                'experience': this.dataset.experience
            });
        });
    });

    document.querySelectorAll(".experience-period").forEach(function (element) {
        element.addEventListener("blur", function() {
            ipcRenderer.send('experience-period-edit', {
                'content': this.innerHTML,
                'section': this.dataset.section,
                'experience': this.dataset.experience
            });
        });
    });


    document.querySelectorAll(".section-title").forEach(function (element) {
        element.addEventListener("blur", function() {
            ipcRenderer.send('section-title-edit', {
                'content': this.innerHTML,
                'section': this.dataset.section,
            });
        });
    });

    document.querySelectorAll(".button-remove-experience").forEach(function (element) {
        element.addEventListener("click", function() {
            ipcRenderer.send('experience-remove', {
                'section': this.dataset.section,
                'experience': this.dataset.experience
            });
        });
    });
    document.querySelectorAll(".button-add-experience").forEach(function (element) {
        element.addEventListener("click", function() {
            ipcRenderer.send('experience-add', {
                'section': this.dataset.section,
            });
        });
    });

    document.querySelectorAll(".button-add-section").forEach(function (element) {
        element.addEventListener("click", function() {
            ipcRenderer.send('section-add');
        });
    });

    document.querySelectorAll(".button-remove-section").forEach(function (element) {
        element.addEventListener("click", function()  {
            ipcRenderer.send('section-remove', {
                'section' : this.dataset.section
            });
        });
    });

    tinymce.init({
        selector: '.experience-description',
        theme: "inlite",
        inline: true,
        plugins: 'lists',
        selection_toolbar: 'bold italic underline numlist bullist',
        insert_toolbar : false,
    });
});



