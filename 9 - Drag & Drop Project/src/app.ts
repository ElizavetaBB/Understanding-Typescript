interface Draggable {
    dragStarthandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
    Active, Finished
}

class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number, 
        public status: ProjectStatus) {}
}

type Listener<T> = (items: T[]) => void;

class ListenerState<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends ListenerState<Project> {
    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor() {
        super();
    }

    public static getInstance() {
        if (ProjectState.instance) {
            return ProjectState.instance;
        } else {
            ProjectState.instance = new ProjectState();
            return ProjectState.instance;
        }
    }

    addProject(title: string, description: string, people: number) {
        let newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            people, 
            ProjectStatus.Active
        )
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        let project = this.projects.find(el => el.id === projectId);
        if (project) {
            if (project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
    }

    private updateListeners() {
        for (let listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // copy of projects
        }
    }
}

const projectState = ProjectState.getInstance();

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?:number;
}

function validate(input: Validatable) {
    let isValid = true;
    if (input.required) {
        if (typeof input.value === "string") {
            isValid = isValid && input.value.trim().length !== 0;
        } else {
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

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    let originalMethod = descriptor.value;
    let adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

abstract class BaseProjectTemplate<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    appElement: T;
    element: U;

    constructor(
        templateId: string, 
        elementId: string, 
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = <HTMLTemplateElement> document.getElementById(templateId)!;
        this.appElement = <T> document.getElementById(elementId)!;

        let importedNode = document.importNode(this.templateElement.content, true);
        this.element = <U> importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.appElement.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract rendererContent(): void;
    abstract configure(): void;
}

class ProjectInput extends BaseProjectTemplate<HTMLDivElement, HTMLFormElement> {

    title: HTMLInputElement;
    description: HTMLTextAreaElement;
    people: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.rendererContent();
        this.configure();
        this.title = this.element.querySelector("#title") as HTMLInputElement;
        this.description = this.element.querySelector("#description") as HTMLTextAreaElement;
        this.people = this.element.querySelector("#people") as HTMLInputElement;
    }

    configure() {
        this.startListeningFormSubmit();
    }

    rendererContent() {}

    private processFormResult(): [string, string, number] | void {
        let title = this.title.value;
        let description = this.description.value;
        let people = +this.people.value;
        let minLength = 5;
        if (!validate({value: title, required: true, minLength: minLength})) {
            alert(`Title should have at least ${minLength + 1} letters!`);
        } else 
        if (!validate({value: description, required: true, minLength: minLength, maxLength: 100})) {
            alert(`Description should have at least ${minLength + 1} and at most 99 letters!`);
        } else
        if (!validate({value: people, required: true, min: 0, max: 8})) {
            alert(`Should be at least 1 and at most 7 people`);
        } else 
        return [title, description, people];
    }

    private clearFormElements() {
        this.title.value = "";
        this.description.value = "";
        this.people.value = "";
    }

    @Autobind
    private getFormValues(event: Event) {
        event.preventDefault();
        let formResult = this.processFormResult();
        if (Array.isArray(formResult)) {
            let [title, desc, people] = formResult;
            projectState.addProject(title, desc, people);
            this.clearFormElements();
        }
    }

    private startListeningFormSubmit() {
        this.appElement.addEventListener("submit", this.getFormValues);
    }
}

class ProjectItem extends BaseProjectTemplate<HTMLUListElement, HTMLLIElement> implements Draggable{
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return "1 Person";
        }
        return `${this.project.people} Persons`; 
    }

    constructor(elementId: string, project: Project) {
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
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + " assigned.";
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @Autobind
    dragStarthandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {
        console.log('DragEnd');
    }
}

class ProjectList extends BaseProjectTemplate<HTMLDivElement, HTMLElement> implements DragTarget {
    projectsList: Project[] = [];
    type: 'active' | 'finished';

    constructor(type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.configure();
        this.rendererContent();
    }

    private renderProjects() {
        let listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElement.innerHTML = "";
        for (let projectItem of this.projectsList) {
            new ProjectItem(this.element.querySelector("ul")!.id, projectItem)
        }
    }

    rendererContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = `${this.type} projects`;
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            let neededProjects = projects.filter(el => {
                if (this.type === "active") {
                    return el.status === ProjectStatus.Active;
                } else return el.status === ProjectStatus.Finished;
            })
            this.projectsList = neededProjects;
            this.renderProjects();
        });
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
        let listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            let listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        let id = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(id, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
}

let projectInput = new ProjectInput();
let projectList = new ProjectList('active');
let projectListFinished = new ProjectList('finished');
