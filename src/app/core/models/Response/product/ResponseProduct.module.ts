import { ResponseCategory } from '../category/ResponseCategory.module';
import { FileInfo } from '../../Request/base/FileInfo.module';
import { Status } from '../../enum/Status.enum';

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

  photo: string;

}
