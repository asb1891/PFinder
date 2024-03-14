import { onAuthStateChanged, signout, getAuth } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from'react';
import { auth } from '../database/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect (() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoadingInitial(false);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const logout = () => {
        signout(auth).then(() => setUser(null));
    };

    const memoedValue = useMemo(() => {
        return { user, setUser, loading, setLoading, logout };
    }, [user, loading]);

    return (
        <AuthContext.Provider value = {memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};
export default function useAuth() {
    return useContext(AuthContext);
  }