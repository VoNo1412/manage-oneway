import { CreateManageContractDto } from "../dto/create-manage-contract.dto";
import { ManageContract } from "../entities/manage-contract.entity";

interface IManageContract extends ManageContract { }
interface ICreateManageContractDtoSearch {
    hits: {
        total: number,
        hits: Array<{ _source: CreateManageContractDto }>
    }
}

export {
    IManageContract,
    ICreateManageContractDtoSearch
}