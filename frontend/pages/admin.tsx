import { useEffect, useState } from "react";
import { getUsers, promoteUser, getTasks, deleteTask } from "../utils/api";

export default function Admin() {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  // Runs once when page loads in browser
  useEffect(() => {
    setMounted(true);
    setToken(localStorage.getItem("token") || "");
    setRole(localStorage.getItem("role") || "");
  }, []);

  // Runs only after token is loaded
  useEffect(() => {
    if (mounted && role === "admin") {
      getUsers(token).then(setUsers);
      getTasks(token).then(setTasks);
    }
  }, [mounted, role, token]);

  if (!mounted) return null;

  if (role !== "admin") {
    window.location.href = "/";
    return null;
  }

  async function makeAdmin(id: number) {
    await promoteUser(token, id);
    getUsers(token).then(setUsers);
  }

  async function removeTask(id: number) {
    await deleteTask(token, id);
    getTasks(token).then(setTasks);
  }

   return (
     <>
    <div className="navbar">
      <h2>Admin Dashboard</h2>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>

    <div className="container">
      <div className="section">
        <h2>Users</h2>
        {users.map((u) => (
          <div key={u.id} className="task">
            {u.email} — {u.role}
            {u.role !== "admin" && (
              <button onClick={() => makeAdmin(u.id)}>Make Admin</button>
            )}
          </div>
        ))}
      </div>

      <div className="section">
        <h2>All Tasks</h2>
        {tasks.map((t) => (
          <div key={t.id} className="task">
            <b>{t.title}</b> — {t.description}
            <button onClick={() => removeTask(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  </>
);

}
