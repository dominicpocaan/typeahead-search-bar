import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

function useRealmLogin() {
  const [user, setUser] = useState<Realm.User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function logInRealm() {
      try {
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID as string;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);
        setUser(user);
      } catch (error) {
        setError(error as Error);
      }
    }

    logInRealm();
  }, []);

  return { user, error };
}

export default useRealmLogin;
