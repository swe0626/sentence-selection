import { ChangeEvent, KeyboardEvent } from 'react';
import './search-input.css';

type SearchProps = {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (word: string) => void;
    inputClass?: string;
}

export const SearchInput = ({ value, onChange, onSearch, inputClass }: SearchProps) => {
    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch && onSearch(value);
        }
    }

    return (
        <div className='search-container'>
            <input
                value={value}
                type='text'
                onChange={handleKeyChange}
                className={inputClass ?? 'search-input'}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
};
