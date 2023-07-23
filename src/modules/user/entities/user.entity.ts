import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import * as bcrypt from 'bcrypt';
import { PostEntity } from "../../post/entity/post.entity";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @ApiProperty()
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async verifyPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    @ApiProperty()
    @Column({ nullable: true })
    username: string;

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity[];

    @ApiProperty()
    @Column({ nullable: true })
    refresh_token: string;
}