import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as xlsx from 'xlsx';

@Injectable()
export class ParseXlsxPipe implements PipeTransform<Express.Multer.File, any> {
    transform(file: Express.Multer.File) {
        if (!file) throw new BadRequestException('Not found file');
        const originalFile = file.originalname.split('.');
        if (originalFile.length < 2) {
            throw new BadRequestException('Extension Invalid' + JSON.stringify(originalFile) + originalFile.length);
        }
        if (originalFile.pop() !== 'xlsx') {
            throw new BadRequestException('Invalid extension xlsx!' + originalFile.pop());
        }
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const data = {}
        workbook.SheetNames.map(sheet_name => {
            data[sheet_name.toLowerCase().trim()] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name])
        })

        return [data];
        
    }
}

