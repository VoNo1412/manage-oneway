import { Controller, Get, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { AuthGuards } from "../auth/decorators/auth.decorator";
import { Role } from "src/common/interface/role.enum";

@AuthGuards(Role.User)
@Controller('post') 
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    
    @Get('get_posts') 
    @AuthGuards(Role.User)
    async getPosts() {
        try {
            return this.postService.getPosts();
        } catch (error) {
            throw new HttpException('Not found get posts', HttpStatus.NOT_FOUND)
        }
    }
}