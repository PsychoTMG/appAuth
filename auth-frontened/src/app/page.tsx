'use client'
import Color from "./components/Color";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "./provider/ContextProvider";
import { useRouter } from "next/navigation";


interface ProfileData {
  username: string,
  email: string,
}


export default function Home() {
  const { token } = useAppContext();
  const [user, setUser] = useState<ProfileData | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.get<ProfileData>('http://localhost:3001/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <>
      <Color />
      {token && <div>Welcome {user?.username}</div>}



    </>
  );
}