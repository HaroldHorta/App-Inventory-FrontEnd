import { habitat } from "../../enum/habitat";
import { origin } from "../../enum/origin";
import { reproductiveStatus } from "../../enum/reproductiveStatus";
import { sex } from "../../enum/sex";
import { RequestFeeding } from "../../Request/feeding/RequestFeeding";
import { ResponseBreed } from "../breed/ResponseBreed";
import { ResponseCustomer } from "../customer/ResponseCustomer.module";
import { ResponseDewormingInternal } from "../dewormingInternal/ResponseDewormingInternal";
import { ResponsePhysiologicalConstants } from "../physiologicalConstants/ResponsePhysiologicalConstants";
import { ResponseSpecies } from "../species/ResponseSpecies";
import { ResponseVaccinations } from "../vaccinations/ResponseVaccinations";

export class ResponsePet {
    id: string;
    name: string;
    species: ResponseSpecies;
    breed: ResponseBreed;
    color: string;
    sex: string;
    Enum: sex;
    dateBirth: string;
    age: number;
    particularSigns: string;
    origin: origin;
    customer: ResponseCustomer;
    createAt: string;
    vaccinations: ResponseVaccinations[];
    physiologicalConstants: ResponsePhysiologicalConstants[];
    dewormingInternal: ResponseDewormingInternal[];
    dewormingExternal: ResponseDewormingInternal[];
    feeding: RequestFeeding;
    previousIllnesses: string;
    surgeries: string;
    familyBackground: string;
    habitat: habitat;
    reproductiveStatus: reproductiveStatus;
    allergy: string;
}