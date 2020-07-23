import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User, Application } from ".";

@Entity()
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column()
    devNeeded: number;

    @Column()
    pmNeeded: number;

    @Column()
    designNeeded: number;

    @Column()
    devRecruited: number;

    @Column()
    pmRecruited: number;

    @Column()
    designRecruited: number;

    @Column("simple-array")
    wantedSkills: string[];

    @Column()
    ownerId: number;
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "ownerId" })
    owner: User

    @Column({ default: false })
    isDone: boolean;

    @OneToMany(() => Application, application => application.post)
    applications: Application[]
}