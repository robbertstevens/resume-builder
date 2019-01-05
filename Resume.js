'use strict';

const Store = require('electron-store');

class Resume extends Store {
    constructor(settings) {
       super(settings);

       if (!this.has('resume')) {
           this.set('resume', {});
       }
    }

    getResume() {
        return this.get('resume');
    }

    setTitle(title) {
        let resume = this.getResume();
        resume.title = title;

        this.set('resume', resume);

        return this;
    }

    setDescription(description) {
        let resume = this.getResume();
        resume.description = description;

        this.set('resume', resume);

        return this;
    }

    addExperience(section) {
        let resume = this.getResume();
        let experiences = resume.cv[section].experiences || [];

        experiences.push({
            "period": "fill in",
            "description": "fill in"
        });

        resume.cv[section].experiences = experiences;
        this.set('resume', resume);

        return this;
    }

    removeExperience(section, experience) {
        let resume = this.getResume();

        resume.cv[section].experiences.splice(experience, 1);

        this.set('resume', resume);

        return this;
    }

    updateExperienceDescription(section, experience, content) {
        let resume = this.getResume();

        resume.cv[section].experiences[experience].description = content;

        this.set('resume', resume);

        return this;
    }

    updateExperiencePeriod(section, experience, content) {
        let resume = this.getResume();

        resume.cv[section].experiences[experience].period = content;

        this.set('resume', resume);

        return this;
    }
    addSection() {
        let resume = this.getResume();

        let cv = resume.cv || [];
        cv.push({
            'title': "FILL IN",
            'experiences': []
        });

        resume.cv = cv;
        this.set('resume', resume);

        return this;
    }

    updateSectionTitle(section, content) {
        let resume = this.getResume();

        resume.cv[section].title = content;

        this.set('resume', resume);

        return this;
    }

    removeSection(section) {
        let resume = this.getResume();

        resume.cv.splice(section, 1);

        this.set('resume', resume);

        return this;
    }
}

module.exports = Resume;