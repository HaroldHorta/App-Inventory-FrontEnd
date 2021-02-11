import { Status } from "../../enum/Status.enum"

export class ResponseVaccinations {
    id: string;
    description: string;
    status: Status;
    createAt: string;
}