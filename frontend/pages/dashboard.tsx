import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../utils/api";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

//  useEffect(() => {
//   getTasks(token).then(data => {
//     console.log("API Response:", data);
//     setTasks(data);
//   });
// }, []);


//   async function add(e: any) {
//     e.preventDefault();
//     await createTask(token, e.target.title.value, e.target.desc.value);
//     getTasks(token).then(setTasks);
//   }

//   return (
//     <div>
//       <h2>My Tasks</h2>
//       <form onSubmit={add}>
//         <input name="title" />
//         <input name="desc" />
//         <button>Add</button>
//       </form>
//  {Array.isArray(tasks) && tasks.map((t) => (
//   <div key={t.id} style={{ border: "1px solid #ccc", padding: "8px", margin: "6px" }}>
//     <b>{t.title}</b>
//     <p>{t.description}</p>
//   </div>
// ))}

//     </div>
//   );
// }
export default function Dashboard() {
    useEffect(() => {
  if (typeof window !== "undefined" && localStorage.getItem("role") === "admin") {
    window.location.href = "/admin";
  }
}, []);

  const [tasks, setTasks] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const load = () => getTasks(token).then(data => {
  console.log("Tasks API:", data);
  setTasks(Array.isArray(data) ? data : []);
});


  useEffect(() => {
    load();
  }, []);

  async function add(e: any) {
    e.preventDefault();
    await createTask(token, e.target.title.value, e.target.desc.value);
    e.target.reset();
    load();
  }

  async function saveEdit(id: number) {
    await updateTask(token, id, editTitle, editDesc);
    setEditId(null);
    load();
  }

  async function remove(id: number) {
    await deleteTask(token, id);
    load();
  }

  return (
  <>
    <div className="navbar">
      <h2>User Dashboard</h2>
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
      <h2 className="page-title">My Tasks</h2>

      <form onSubmit={add}>
        <input name="title" placeholder="Title" required />
        <input name="desc" placeholder="Description" />
        <button>Add Task</button>
      </form>

      <div className="section">
        {Array.isArray(tasks) &&
          tasks.map((t) => (
            <div key={t.id} className="task">
              {editId === t.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                  <button onClick={() => saveEdit(t.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <b>{t.title}</b>
                  <p>{t.description}</p>
                  <button
                    onClick={() => {
                      setEditId(t.id);
                      setEditTitle(t.title);
                      setEditDesc(t.description);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => remove(t.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  </>
);

}