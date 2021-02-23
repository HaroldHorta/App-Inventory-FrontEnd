import { Status } from "../../enum/Status.enum"

export class Vaccination {
    id: string;
    description: string;
    status: Status;
    createAt: string;
    lot:string;
    observation:string;

}