export enum Role {
    DEVELOPER = "developer",
    DESIGNER = 'designer',
    PROJECTMANAGER = 'projectmanager'
}

export interface WantedNumbersOfRole {
    developer?: number;
    projectmanager?: number;
    designer?: number;
}