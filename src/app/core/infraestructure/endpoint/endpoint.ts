import { environment } from '../../../../environments/environment';

export const endpoint = {

    Category: `${environment.serverUrl}/category`,
    Customer: `${environment.serverUrl}/customer`,
    Order: `${environment.serverUrl}/order`,
    Product: `${environment.serverUrl}/product`,
    Ticket: `${environment.serverUrl}/ticket`,
    ProductoWhitPhoto: `${environment.serverUrl}/file/upload`,
    Units: `${environment.serverUrl}/inventory`,
    CashBase: `${environment.serverUrl}/cash`,
    Expenses: `${environment.serverUrl}/expenses`,

    // modulo de clinica

    Breed: `${environment.serverUrl}/breed`,
    Species: `${environment.serverUrl}/species`,
    Pet: `${environment.serverUrl}/pet`,
    Vaccinations: `${environment.serverUrl}/vaccination`,
    Veterinary: `${environment.serverUrl}/veterinary`,
    ClinicExam: `${environment.serverUrl}/clinicExam`,

};
