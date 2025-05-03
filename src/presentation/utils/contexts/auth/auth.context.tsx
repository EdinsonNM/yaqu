import { createContext, useState, useEffect, ReactNode } from "react";
import supabase from "../../../../core/supabase-client";
import useAuthStore from "@presentation/store/auth-store";
import { useRoles } from "@infra/authentication/use-roles";

interface AuthContextType {
  user: any; // Cambiar 'any' por el tipo adecuado si se conoce
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null); // Cambiar 'any' por el tipo adecuado si se conoce
  const [loading, setLoading] = useState<boolean>(true);
  const { userSession, setUserSession, removeUserSession } = useAuthStore();
  const { mutate } = useRoles();

  useEffect(() => {
    if(userSession){
      setUser(userSession.user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [userSession]);
 
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          removeUserSession();
          setUser(null);
          return;
        };
        
        if (event === 'SIGNED_IN') {
          mutate(session?.user.id, {
            onSuccess: (roles) => {
              setUserSession({...session, roles});
              setUser(session?.user || null);
            }
          });
        }
      }
    );
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const resetPassword = async (email: string) => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
