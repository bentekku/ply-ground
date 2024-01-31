// import React, { createContext, useContext, useState } from "react";

// type Props = {};

// type userCollectionProviderProps = {
//   children: React.ReactNode;
// };

// type UserCollectionContextType = {
//   userCollection: [];
//   setUserCollection: React.Dispatch<React.SetStateAction<[]>>;
// };

// export const UserCollectionContext =
//   createContext<UserCollectionContextType | null>(null);

// const UserCollectionProvider = ({ children }: userCollectionProviderProps) => {
//   const [userCollection, setUserCollection] = useState([]);

//   return (
//     <UserCollectionContext.Provider
//       value={{
//         userCollection,
//         setUserCollection,
//       }}
//     >
//       {children}
//     </UserCollectionContext.Provider>
//   );
// };
