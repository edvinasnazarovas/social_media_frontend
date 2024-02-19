import useFetch from "./utils";

export async function uploadUserIcon(icon: File) {
    console.log("XUJETA ", icon)
    const form_data = new FormData();
    form_data.append("file", icon);
    const res = await useFetch(`${import.meta.env.VITE_API}/api/users/icon`, {
        method: "POST",
        body: form_data
    });
    if (res.ok) {
        return await res.json();
    } else {
        return null;
    }
}