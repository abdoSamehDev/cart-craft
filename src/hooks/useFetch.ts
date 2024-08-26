// useFetch.ts
import { useState } from "react";

type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

export const useFetch = <T>(url: string, options: RequestInit) => {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = async (bodyData: Record<string, any>) => {
        setState({ data: null, loading: true, error: null });

        try {
            const res = await fetch(url, {
                ...options,
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();
            setState({ data, loading: false, error: null });
        } catch (error: any) {
            setState({ data: null, loading: false, error: error.message });
        }
    };

    return [state, fetchData] as const;
};
