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
  user: any
  logout: any
//   checkingSession: boolean;
//   token: string | null;
//   idToken: string | null;
//   expiresAt: number | null;
//   isAuthenticated: boolean;
//   handleAuthentication: () => void;
//   login: () => void;
//   logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  authenticate: false,
  user: null,
  logout: null
//   checkingSession: false,
//   expiresAt: null,
//   token: null,
//   idToken: null,
//   isAuthenticated: false,
//   handleAuthentication: () => null,
//   login: () => null,
//   logout: () => null
};

const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);

export default AuthContext;