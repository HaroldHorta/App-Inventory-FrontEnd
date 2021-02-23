import { ResponseDiagnosticPlan } from "../../Response/diagnosticplan/ResponseDiagnosticPlan";
import { RequestPhysiologicalConstants } from "../pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants";
import { RequestClinicExamClinicHistory } from "./RequestClinicExamClinicHistory";
import { RequestListProblems } from "./RequestListProblems";

export class RequestAddClinicHistoryDTO {
    veterinary: string;
    pet: string;
    reasonOfConsultation: string;
    anamnesis: string;
    recipeBook: string;
    physiologicalConstants: RequestPhysiologicalConstants;
    clinicExam: RequestClinicExamClinicHistory;
    listProblems: RequestListProblems[];
    diagnosticPlans: ResponseDiagnosticPlan[];



}