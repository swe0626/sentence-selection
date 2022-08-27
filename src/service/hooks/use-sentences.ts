import { useState, useEffect } from 'react';
import { getSentences } from 'service';

export const useSentences = () => {
    const [sentences, setSentences] = useState<{ [key: string]: string }>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const sentences = await getSentences();
                setSentences(sentences);
            } catch (e: any) {
                setError(e.message ?? JSON.stringify(e));
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, []);

    return { sentences, loading, error };
}