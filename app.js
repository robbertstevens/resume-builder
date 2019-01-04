'use strict';

const handlebars = require('handlebars');
const { ipcRenderer } = require('electron');

let source = document.getElementById('hb-experience-template').innerHTML;
let template = handlebars.compile(source);

ipcRenderer.send('show');

ipcRenderer.on("update", (event, resume) => {

    let content = document.getElementById('cv');
    content.innerHTML = "";
    content.innerHTML = template(resume);

    document.querySelectorAll(".description").forEach(function (element) {
        element.addEventListener("blur", function (e) {
            ipcRenderer.send('experience-edit', {
                'content': this.innerHTML,
                'section': this.dataset.section,
                'experience': this.dataset.experience
            });
        });
    });

    document.querySelectorAll(".remove").forEach(function (element) {
        element.addEventListener("click", function (e) {
            ipcRenderer.send('experience-remove', {
                'section': this.dataset.section,
                'experience': this.dataset.experience
            });
        });
    });

    tinymce.init({
        selector: '.description',
        theme: "inlite",
        inline: true,
        plugins: 'lists',
        selection_toolbar: 'bold italic underline numlist bullist',
        insert_toolbar : false,
    });
});



