import { Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) { }

    async getPosts() {
        return this.postRepository.find({ relations: ['author'] });
    }

    async deletePost(id: number) {
        return this.postRepository.delete(id)
    }
}