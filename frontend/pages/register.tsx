import { register } from "../utils/api";

export default function Register() {
  async function handle(e: any) {
    e.preventDefault();
    await register(e.target.email.value, e.target.password.value);
    alert("Registered! Now login.");
    window.location.href = "/";
  }

  return (
  <div className="auth-box">
    <h2>Register</h2>

    <form onSubmit={handle}>
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button>Register</button>
    </form>

    <span className="auth-link" onClick={() => window.location.href = "/"}>
      Already have an account? Login
    </span>
  </div>
);

}
