'use strict';

const handlebars = require('handlebars');
const Store = require('electron-store');

let sections = [{
    "title": "Education",
    "experiences": [
        {
            "period": "sept. 2017 - present",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, amet cupiditate deserunt distinctio illo maxime nulla perferendis quisquam repellat repellendus? Dolorem, laborum, nulla. Dicta eveniet laborum nostrum, placeat qui vel."
        },
        {
            "period": "aug. 800 - sept. 2017",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, amet cupiditate deserunt distinctio illo maxime nulla perferendis quisquam repellat repellendus? Dolorem, laborum, nulla. Dicta eveniet laborum nostrum, placeat qui vel."
        }
    ]
},{
    "title": "Experience",
    "experiences": [
        {
            "period": "sept. 2017 - present",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, amet cupiditate deserunt distinctio illo maxime nulla perferendis quisquam repellat repellendus? Dolorem, laborum, nulla. Dicta eveniet laborum nostrum, placeat qui vel."
        },
        {
            "period": "aug. 800 - sept. 2017",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, amet cupiditate deserunt distinctio illo maxime nulla perferendis quisquam repellat repellendus? Dolorem, laborum, nulla. Dicta eveniet laborum nostrum, placeat qui vel."
        }
    ]
}];

let source = document.getElementById('hb-experience-template').innerHTML;
let template = handlebars.compile(source);
let result = "";

sections.forEach(function(context){
    result = result + template(context);
});

let content = document.getElementById('cv');

content.innerHTML = content.innerHTML + result;

tinymce.init({
    selector: '.description',
    theme: "inlite",
    inline: true,
    plugins: 'lists',
    selection_toolbar: 'bold italic underline numlist bullist',
    insert_toolbar : false
});