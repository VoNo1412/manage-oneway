import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller('post') 
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    @Get('get_posts') 
    async getPosts() {
        try {
            return this.postService.getPosts();
        } catch (error) {
            throw new HttpException('Not found get posts', HttpStatus.NOT_FOUND)
        }
    }
}