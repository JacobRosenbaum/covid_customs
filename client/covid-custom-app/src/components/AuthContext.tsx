// import React from 'react';

// interface ContextProps {
//     username: ({type}:{type:string}) => void;
//     password: ({type}:{type:string}) => void;
//   }

// const AuthContext: any = React.createContext({} as ContextProps);

// export default AuthContext;

import React from 'react';
import { Order, Customer } from './Interfaces';

export interface AuthContextInterface {
    authenticate: any;
    login: any;
    user: any
    logout: any;
    customerId: number;
    customer: Customer;
    order: Order;
    customerName: string;
    updateOrder: (order: any) => void
}

export const authContextDefaults: AuthContextInterface = {
    authenticate: false,
    login: null,
    user: null,
    logout: null,
    customerId: 0,
    customer: {} as Customer,
    order: {} as Order,
    customerName: 'Loyal Shopper',
    updateOrder: (order: any) => {}
};

const AuthContext = React.createContext<AuthContextInterface>(
    authContextDefaults
);

export default AuthContext;