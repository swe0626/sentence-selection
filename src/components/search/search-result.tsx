import React from 'react';

type SearchResultProps = {
    result: string[];
    itemRenderer?: (sentence: string) => React.ReactNode;
    containerClass?: string;
}
export const SearchResult = ({ result, itemRenderer, containerClass }: SearchResultProps) => (
    <div className={containerClass ?? 'search-results'}>
        {itemRenderer && result.map((sentence: string) => itemRenderer(sentence))}
        {!itemRenderer && result.map((sentence: string) => <p>{sentence}</p>)}
    </div>
);
