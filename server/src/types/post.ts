import { User } from "../entity";

export interface createPostRequest {
    title: string;
    content: string;
    devNeeded: number;
    pmNeeded: number;
    designNeeded: number;
    devRecruited: number;
    pmRecruited: number;
    designRecruited: number;
    wantedSkills: string[];
    ownerId: number;
    owner: User;
}

export interface updatePostRequest {
    postId: number;
    title: string;
    content: string;
    devNeeded: number;
    pmNeeded: number;
    designNeeded: number;
    // devRecruited: number;
    // designRecruited: number;
    // pmRecruited: number;
    wantedSkills: string[];
}