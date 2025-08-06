import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import type { Credentials } from "../types/authTypes";

const AuthForm = () => {
  const { login, loading, error } = useAuth();
  const { register, handleSubmit } = useForm<Credentials>();

  const onSubmit = async (data: Credentials) => {
    await login(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <button type="submit">Login</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
        <p>
          <b>Error:</b>
          <br />
          {JSON.stringify(error)}
        </p>
      )}
    </div>
  );
};

export default AuthForm;
