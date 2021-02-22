// import React from 'react';

// interface ContextProps {
//     username: ({type}:{type:string}) => void;
//     password: ({type}:{type:string}) => void;
//   }

// const AuthContext: any = React.createContext({} as ContextProps);

// export default AuthContext;

import React from 'react';

export interface AuthContextInterface {
    authenticate: any;
    findCustomerByCustomerEmail: any;
    findOrderByCustomerId: any;
    user: any
    logout: any;
    customerId: number;
    orderId: number;
    customer: [];
    order: []
}

export const authContextDefaults: AuthContextInterface = {
    authenticate: false,
    findCustomerByCustomerEmail: false,
    findOrderByCustomerId: false,
    user: null,
    logout: null,
    customerId: 0,
    orderId: 0,
    customer: [],
    order: []
};

const AuthContext = React.createContext<AuthContextInterface>(
    authContextDefaults
);

export default AuthContext;