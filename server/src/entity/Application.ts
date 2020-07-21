import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../types/role";
import { User, Post } from ".";

@Entity()
export default class Application extends BaseEntity {

    @PrimaryGeneratedColumn()
    applicationId: number;

    @Column({ default: false })
    isAccepted: boolean;

    @Column()
    role: Role;

    @Column()
    ownerId: number;
    @ManyToOne(() => User, user => user.applications)
    @JoinColumn({ name: "ownerId" })
    owner: User;

    @Column()
    postId: number;
    @ManyToOne(() => Post, post => post.applications)
    @JoinColumn({ name: "postId" })
    post: Post
}