export async function Login(credentials: { username: string, password: string }) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    });
    return res;
}

export async function Register(credentials: {
    username: string, password: string, name: string, last_name: string,
    email: string
}) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    return res;
}

export async function CheckAuth() {
    const res = await fetch(`${import.meta.env.VITE_API}/api/auth`, {
        method: "GET",
        credentials: "include"
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}

export async function Logout() {
    const res = await fetch(`${import.meta.env.VITE_API}/api/logout`, {
        credentials: "include"
    });
    return res;
}