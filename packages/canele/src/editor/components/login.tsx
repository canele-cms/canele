export interface LoginProps {
  errors?: string[];
}

export function Login({ errors }: LoginProps) {
  return (
    <form>
      <label>
        Email
        <input type="email" name="email" />
      </label>

      <label>
        Password
        <input type="password" name="password" />
      </label>

      <button type="submit">Login</button>

      <em>
        {errors?.map((error) => (
          <>
            {error}
            <br />
          </>
        ))}
      </em>
    </form>
  );
}
