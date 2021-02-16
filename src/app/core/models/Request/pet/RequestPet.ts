import { Origin } from "../../enum/origin";
import { Sex } from "../../enum/sex";

export class RequestPet {

    name: string;
    species: string;
    breed: string;
    color: string;
    sex: Sex;
    dateBirth: Date;
    particularSigns: string;
    origin: Origin;
    customer: string;
    photo: string;
}