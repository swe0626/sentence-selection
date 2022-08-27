import { useMemo, useState } from 'react';
import { SearchInput, SearchResult } from 'components/search';
import { Dictionary } from 'types';
import { useSentences } from 'service/hooks/use-sentences';
import { Loader } from 'components/base/loader';

export const SearchPage = () => {
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState<string[]>([]);
    const { sentences, loading, error } = useSentences();
    
    const dictionary = useMemo<Dictionary>(() => {
        if (!sentences || Object.keys(sentences).length === 0) {
            return {};
        } else {
            return defaultParse(sentences);
        }
    }, [sentences]);
    
    const handleSearch = (word: string) => {
        setResult(defaultSearch(word, dictionary));
    };

    return (
        <main className='container container-lg'>
            {loading && <div style={{ textAlign: 'center' }}><Loader /></div>}
            {error && <p className='error'>{error}</p>}
            {sentences && (
                <div className='search-box'>
                    <SearchInput onSearch={handleSearch} value={keyword} onChange={setKeyword} />
                    <SearchResult result={result} />
                </div>
            )}
        </main>
    );
};

function defaultParse(sentences: { [key: string]: string }) {
    const result: { [key: string]: string[] } = {};
    for (const key in sentences) {
        const sentence = sentences[key];
        const words = sentence.split(/ +[,.]*|[,.]+ */).filter(word => word.length > 0);
        words.forEach(word => {
            if (word in result) {
                result[word].push(sentence);
            } else {
                result[word] = [sentence];
            }
        })
    }

    return result;
}

function defaultSearch(word: string, dict: Dictionary) {
    if (word in dict) {
        return dict[word];
    } else {
        return [];
    }
}
