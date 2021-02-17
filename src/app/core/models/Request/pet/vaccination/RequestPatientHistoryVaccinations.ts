import { RequestPhysiologicalConstants } from "../RequestPhysiologicalConstants/RequestPhysiologicalConstants";
import { RequestVaccination } from "./RequestVaccination";

export class RequestPatientHistoryVaccinations {
    vaccinations: RequestVaccination[];
    physiologicalConstants : RequestPhysiologicalConstants;

}