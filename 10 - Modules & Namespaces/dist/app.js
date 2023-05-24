"use strict";
/// <reference path="drag-drop-interfaces.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DOInterfaces;
(function (DOInterfaces) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    class ListenerState {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends ListenerState {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (ProjectState.instance) {
                return ProjectState.instance;
            }
            else {
                ProjectState.instance = new ProjectState();
                return ProjectState.instance;
            }
        }
        addProject(title, description, people) {
            let newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            let project = this.projects.find(el => el.id === projectId);
            if (project) {
                if (project.status !== newStatus) {
                    project.status = newStatus;
                    this.updateListeners();
                }
            }
        }
        updateListeners() {
            for (let listenerFn of this.listeners) {
                listenerFn(this.projects.slice()); // copy of projects
            }
        }
    }
    const projectState = ProjectState.getInstance();
    function validate(input) {
        let isValid = true;
        if (input.required) {
            if (typeof input.value === "string") {
                isValid = isValid && input.value.trim().length !== 0;
            }
            else {
                isValid = isValid && input.value !== 0;
            }
        }
        if (input.minLength != null && typeof input.value === "string") {
            isValid = isValid && input.value.length > input.minLength;
        }
        if (input.maxLength != null && typeof input.value === "string") {
            isValid = isValid && input.value.length < input.maxLength;
        }
        if (input.min != null && typeof input.value === "number") {
            isValid = isValid && input.value > input.min;
        }
        if (input.max != null && typeof input.value === "number") {
            isValid = isValid && input.value < input.max;
        }
        return isValid;
    }
    function Autobind(target, methodName, descriptor) {
        let originalMethod = descriptor.value;
        let adjDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                return originalMethod.bind(this);
            }
        };
        return adjDescriptor;
    }
    class BaseProjectTemplate {
        constructor(templateId, elementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.appElement = document.getElementById(elementId);
            let importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.appElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    class ProjectInput extends BaseProjectTemplate {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.rendererContent();
            this.configure();
            this.title = this.element.querySelector("#title");
            this.description = this.element.querySelector("#description");
            this.people = this.element.querySelector("#people");
        }
        configure() {
            this.startListeningFormSubmit();
        }
        rendererContent() { }
        processFormResult() {
            let title = this.title.value;
            let description = this.description.value;
            let people = +this.people.value;
            let minLength = 5;
            if (!validate({ value: title, required: true, minLength: minLength })) {
                alert(`Title should have at least ${minLength + 1} letters!`);
            }
            else if (!validate({ value: description, required: true, minLength: minLength, maxLength: 100 })) {
                alert(`Description should have at least ${minLength + 1} and at most 99 letters!`);
            }
            else if (!validate({ value: people, required: true, min: 0, max: 8 })) {
                alert(`Should be at least 1 and at most 7 people`);
            }
            else
                return [title, description, people];
        }
        clearFormElements() {
            this.title.value = "";
            this.description.value = "";
            this.people.value = "";
        }
        getFormValues(event) {
            event.preventDefault();
            let formResult = this.processFormResult();
            if (Array.isArray(formResult)) {
                let [title, desc, people] = formResult;
                projectState.addProject(title, desc, people);
                this.clearFormElements();
            }
        }
        startListeningFormSubmit() {
            this.appElement.addEventListener("submit", this.getFormValues);
        }
    }
    __decorate([
        Autobind
    ], ProjectInput.prototype, "getFormValues", null);
    class ProjectItem extends BaseProjectTemplate {
        get persons() {
            if (this.project.people === 1) {
                return "1 Person";
            }
            return `${this.project.people} Persons`;
        }
        constructor(elementId, project) {
            super("single-project", elementId, false, project.id);
            this.project = project;
            this.configure();
            this.rendererContent();
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStarthandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        rendererContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + " assigned.";
            this.element.querySelector('p').textContent = this.project.description;
        }
        dragStarthandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(event) {
            console.log('DragEnd');
        }
    }
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragStarthandler", null);
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    class ProjectList extends BaseProjectTemplate {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.projectsList = [];
            this.type = type;
            this.configure();
            this.rendererContent();
        }
        renderProjects() {
            let listElement = document.getElementById(`${this.type}-projects-list`);
            listElement.innerHTML = "";
            for (let projectItem of this.projectsList) {
                new ProjectItem(this.element.querySelector("ul").id, projectItem);
            }
        }
        rendererContent() {
            this.element.querySelector('ul').id = `${this.type}-projects-list`;
            this.element.querySelector('h2').textContent = `${this.type} projects`;
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            projectState.addListener((projects) => {
                let neededProjects = projects.filter(el => {
                    if (this.type === "active") {
                        return el.status === ProjectStatus.Active;
                    }
                    else
                        return el.status === ProjectStatus.Finished;
                });
                this.projectsList = neededProjects;
                this.renderProjects();
            });
        }
        dragLeaveHandler(event) {
            let listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                let listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            let id = event.dataTransfer.getData('text/plain');
            projectState.moveProject(id, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        }
    }
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dropHandler", null);
    let projectInput = new ProjectInput();
    let projectList = new ProjectList('active');
    let projectListFinished = new ProjectList('finished');
})(DOInterfaces || (DOInterfaces = {}));
