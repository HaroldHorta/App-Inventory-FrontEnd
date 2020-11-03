import { ResponseCategory } from '../category/ResponseCategory.module';
import { Status } from '../enum/Status.enum';
import { FileInfo } from '../../Request/base/FileInfo.module';

export class ResponseProduct {
  id: string;

  name: string;

  description: string;

  category: ResponseCategory[];

  status: Status;

  createAt: string;

  updateAt: string;

  priceBuy: number;

  priceSell: number;

  unit: number;

  photo: FileInfo;

}
