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
    login: any;
    user: any
    logout: any;
    customerId: number;
    customer: [];
    order: any;
    customerName: string;
    updateOrder: (order: any) => void
}

export const authContextDefaults: AuthContextInterface = {
    authenticate: false,
    login: null,
    user: null,
    logout: null,
    customerId: 0,
    customer: [],
    order: {
        masks: []
    },
    customerName: 'Loyal Shopper',
    updateOrder: (order: any) => {}
};

const AuthContext = React.createContext<AuthContextInterface>(
    authContextDefaults
);

export default AuthContext;