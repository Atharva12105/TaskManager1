const API = process.env.NEXT_PUBLIC_API_URL as string;

export async function register(email: string, password: string) {
  return fetch(`${API}/auth/register?email=${email}&password=${password}`, {
    method: "POST"
  }).then(r => r.json());
}

export async function login(email: string, password: string) {
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  }).then(async (r) => {
    if (!r.ok) {
      const err = await r.text();
      throw new Error(err);
    }
    return r.json();
  });
}



export async function getTasks(token: string) {
  return fetch(`${API}/tasks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(r => r.json());
}


export async function createTask(token: string, title: string, description: string) {
  return fetch(`${API}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,   // 🔥 THIS WAS MISSING OR BROKEN
    },
    body: JSON.stringify({ title, description }),
  }).then(r => r.json());
}


export async function updateTask(token: string, id: number, title: string, description: string) {
  return fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  }).then((r) => r.json());
}

export async function deleteTask(token: string, id: number) {
  return fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}

export async function getUsers(token: string) {
  return fetch(`${API}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}


export async function promoteUser(token: string, id: number) {
  return fetch(`${API}/auth/promote/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  }).then(r => r.json());
}
