import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Role } from "./../types/role";
import { Post, Application } from ".";

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, default: "Let's have some fun with side project" })
    description: string;

    @Column({ nullable: false, default: [] })
    role: Role[];

    @Column({ nullable: false, default: [] })
    skills: string[];

    @OneToMany(() => Post, post => post.owner)
    posts: Post[];

    @OneToMany(() => Application, application => application.owner)
    applications: Application[];
}
