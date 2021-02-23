import { Attitude } from "../../enum/Attitude";
import { BodyCondition } from "../../enum/BodyCondition";
import { StateDehydration } from "../../enum/StateDehydration";
import { RequestAddClinicExamClinicHistory } from "./RequestAddClinicExamClinicHistory";

export class RequestClinicExamClinicHistory {
    attitude: Attitude;
    bodyCondition: BodyCondition;
    stateDehydration: StateDehydration;
    clinicExamClinicHistories: RequestAddClinicExamClinicHistory[];
}