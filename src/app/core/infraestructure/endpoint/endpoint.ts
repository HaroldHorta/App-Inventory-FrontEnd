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
    CashRegister: `${environment.serverUrl}/cash/cashRegisterHistory`,

};
