import { RequestClinicExamClinicHistory } from "../../Request/clinichistory/RequestClinicExamClinicHistory";
import { RequestListProblems } from "../../Request/clinichistory/RequestListProblems";
import { ResultClinic } from "../../Request/clinichistory/ResultClinic";
import { TherapeuticPlan } from "../../Request/clinichistory/TherapeuticPlan";
import { RequestPhysiologicalConstants } from "../../Request/pet/RequestPhysiologicalConstants/RequestPhysiologicalConstants";
import { ResponseDiagnosticPlan } from "../diagnosticplan/ResponseDiagnosticPlan";
import { ResponsePet } from "../pet/ResponsePet";
import { ResponseVeterinary } from "../veterinary/ResponseVeterinary";

export class ResponseClinicHistoryDTO {
    id: string;
    createAt: Date;
    veterinary: ResponseVeterinary;
    pet: ResponsePet;
    reasonOfConsultation: string;
    anamnesis: string;
    recipeBook: string;
    physiologicalConstants: RequestPhysiologicalConstants;
    clinicExam: RequestClinicExamClinicHistory;
    listProblems: RequestListProblems[];
    diagnosticPlans: ResponseDiagnosticPlan[];
    resultClinic: ResultClinic;
    therapeuticPlan: TherapeuticPlan[];
}