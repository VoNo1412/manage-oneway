import { Controller, Delete, Get, HttpException, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { AuthGuards } from "../auth/decorators/auth.decorator";
import { Role } from "src/common/interface/role.enum";
import { DataSource } from "typeorm";
import { User } from "../user/entities/user.entity";

@AuthGuards(Role.User)
@Controller('post') 
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly dataSource: DataSource
    ) {}

    
    @Get('get_posts') 
    async getPosts() {
        let queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.dataSource.manager.getRepository(User).update({id: 3}, {email: 'vono_devops@gmail.com'})
            await this.postService.deletePost(1);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new HttpException('Not found get posts', HttpStatus.NOT_FOUND)
        } finally {
            await queryRunner.release();
        }
    }

    @Delete('del/:postId')
    async deletePost(
        @Param('postId') postId: number
    ) {
        try {
            return this.postService.deletePost(postId);
        } catch (error) {
            throw new HttpException('delete post failure', HttpStatus.NOT_FOUND)
        }
    }
}