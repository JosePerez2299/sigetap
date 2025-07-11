
import { useForm } from "react-hook-form";
import {useAuth} from "../../hooks/useAuth";
import type { Credentials } from "../../types/authTypes";
import { useState } from "react";
import type { User } from "../../types/userTypes";

const AuthForm = () => {
 const {login, loading, error} = useAuth();
 const [user, setUser] = useState<User | null>(null);

 const { register, handleSubmit } = useForm<Credentials>();

 const onSubmit = async (data: Credentials) => {
    const response = await login(data);
    setUser(response?.user || null);
    console.log('user', user);
 }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")}/>
        <input type="password" placeholder="Password" {...register("password")}/>
        <button type="submit">Login</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>
        <b>Error:</b>
        <br/>
        {JSON.stringify(error)}
        
        </p>}
      {user && <p>
        
        {JSON.stringify(user)}
        
        </p>}
    </div>
  )
}

export default AuthForm