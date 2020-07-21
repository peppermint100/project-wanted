import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User, Application } from ".";
import { WantedNumbersOfRole } from "../types/role";
import { application } from "express";

@Entity()
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({})
    currentRolesOpenning: WantedNumbersOfRole

    @Column()
    wantedRoles: WantedNumbersOfRole

    @Column({ nullable: false, default: [] })
    wantedSkills: string[];

    @Column({ default: false })
    isDone: boolean;

    @Column()
    ownerId: number;
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "ownerId" })
    owner: User

    @OneToMany(() => Application, application => application.post)
    applications: Application[]
}