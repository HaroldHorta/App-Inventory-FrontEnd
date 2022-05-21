import { environment } from '../../../../environments/environment';

export const endpoint = {

    category: `${environment.serverUrl}/category`,
    customer: `${environment.serverUrl}/customer`,
    order: `${environment.serverUrl}/order`,
    product: `${environment.serverUrl}/product`,
    ticket: `${environment.serverUrl}/ticket`,
    productoWhitPhoto: `${environment.serverUrl}/file/upload`,
    inventory: `${environment.serverUrl}/inventory`,
    cashBase: `${environment.serverUrl}/cash`,
    expenses: `${environment.serverUrl}/expenses`,

    // modulo de clinica

    breed: `${environment.serverUrl}/breed`,
    species: `${environment.serverUrl}/species`,
    pet: `${environment.serverUrl}/pet`,
    vaccinations: `${environment.serverUrl}/vaccination`,
    veterinary: `${environment.serverUrl}/veterinary`,
    clinicExam: `${environment.serverUrl}/clinicExam`,
    diagnosticPlan: `${environment.serverUrl}/diagnosticPlan`,
    clinicHistory: `${environment.serverUrl}/clinic-history`,

    // server photos s3

    productPhoto: `${environment.serverS3}`,


};
