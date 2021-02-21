import { OptionClinicExam } from "../../enum/OptionClinicExam";
import { ResponseClinicExam } from "../../Response/examclinic/ResponseClinicExam";

export class RequestAddClinicExamClinicHistory {

    clinicExam: ResponseClinicExam;
    optionClinicExam: OptionClinicExam;
    observation: string;

}