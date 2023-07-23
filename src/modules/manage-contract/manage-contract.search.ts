import { ElasticsearchService } from "@nestjs/elasticsearch";
import { CreateManageContractDto } from "./dto/create-manage-contract.dto";

export class ManageContractSearchService {
    index = 'contracts'

    constructor(
        private readonly elasticsearchService: ElasticsearchService
    ) { }

    async indexPosts(contracts: CreateManageContractDto) {
        // return this.elasticsearchService.index(ICreateManageContractDtoSearch, new CreateManageContractDto({}))
    }
}