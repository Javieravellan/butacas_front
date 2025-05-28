const wfetch = async (url: string, options?: RequestInit, timeout: number = 30000): Promise<Response> => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
        abortController.abort();
    }, timeout)
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: abortController.signal,
            headers: {
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        return response;
    
    } catch(error: any) {
        if (error.name === 'AbortError') {
            throw new Error(`Petición cancelada después de ${timeout/1000} segundos de espera.`);
        }

        throw error;
    }
    finally {
        clearTimeout(timeoutId);
    }
}

export default wfetch;