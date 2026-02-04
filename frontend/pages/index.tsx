import { login } from "../utils/api";

export default function Login() {
  async function handle(e: any) {
    e.preventDefault();
    const res = await login(e.target.email.value, e.target.password.value);

    localStorage.setItem("token", res.access_token);
    localStorage.setItem("role", res.role);

    // 🔥 Redirect based on role
    if (res.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  }

//   return (
//     <form onSubmit={handle}>
//       <h2>Login</h2>
//       <input name="email" />
//       <input name="password" type="password" />
//       <button>Login</button>
//     </form>
//   );
return (
  <div className="auth-box">
    <h2>Login</h2>

    <form onSubmit={handle}>
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Login</button>
    </form>

    <span className="auth-link" onClick={() => window.location.href = "/register"}>
      Don’t have an account? Create one
    </span>
  </div>
);

}

