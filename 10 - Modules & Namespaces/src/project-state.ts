import { Project, ProjectStatus } from "./app";

type Listener<T> = (items: T[]) => void;

export class ListenerState<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends ListenerState<Project> {
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

export const projectState = ProjectState.getInstance();