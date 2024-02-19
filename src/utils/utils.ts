export default async function useFetch(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });
    if (response.status === 401) {
        window.location.pathname = "/login";
    }
    return response;
}