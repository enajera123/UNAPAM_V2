export async function fetchData<T>(url: string, method?: string, body?: any): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json() as T;
}

export async function fetchFileData<T>(url: string, method?: string, body?: any): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.blob() as T;
}