import { habitat } from "../../enum/habitat";
import { Origin } from "../../enum/origin";
import { reproductiveStatus } from "../../enum/reproductiveStatus";
import { Sex } from "../../enum/sex";
import { RequestFeeding } from "../../Request/feeding/RequestFeeding";
import { RequestPatientHistoryVaccinations } from "../../Request/pet/vaccination/RequestPatientHistoryVaccinations";
import { ResponseBreed } from "../breed/ResponseBreed";
import { ResponseCustomer } from "../customer/ResponseCustomer.module";
import { ResponseDewormingInternal } from "../dewormingInternal/ResponseDewormingInternal";
import { ResponsePhysiologicalConstants } from "../physiologicalConstants/ResponsePhysiologicalConstants";
import { ResponseSpecies } from "../species/ResponseSpecies";
import { ResponseVaccinations } from "../vaccination/ResponseVaccinations";

export class ResponsePet {
    id: string;
    name: string;
    species: ResponseSpecies;
    breed: ResponseBreed;
    color: string;
    sex: Sex;
    dateBirth: string;
    age: number;
    particularSigns: string;
    origin: Origin;
    customer: ResponseCustomer;
    createAt: string;
    vaccinations: RequestPatientHistoryVaccinations[];
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
    photo: string;
}