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

    @Column({ default: 0 })
    devRecruited: number;

    @Column({ default: 0 })
    pmRecruited: number;

    @Column({ default: 0 })
    designRecruited: number;

    @Column({ default: false })
    isDone: boolean;

    @Column("simple-array")
    wantedSkills: string[];

    @Column()
    ownerId: number;
    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "ownerId" })
    owner: User

    @OneToMany(() => Application, application => application.post)
    applications: Application[]
}