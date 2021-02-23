import { RequestClinicExamClinicHistory } from "../../Request/clinichistory/RequestClinicExamClinicHistory";
import { RequestListProblems } from "../../Request/clinichistory/RequestListProblems";
import { RequestPhysiologicalConstants } from "../../Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants";
import { ResponseDiagnosticPlan } from "../diagnosticplan/ResponseDiagnosticPlan";

export class ResponseClinicHistoryDTO {
    id: string;
    createAt: string;
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