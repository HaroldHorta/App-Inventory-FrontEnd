import { environment } from '../../../../environments/environment';

export const endpoint = {
    Category: `${environment.serverUrl}/category`,
    Customer: `${environment.serverUrl}/customer`,
    Order: `${environment.serverUrl}/order`,
    Product: `${environment.serverUrl}/product`,
    Ticket: `${environment.serverUrl}/ticket`,
};
