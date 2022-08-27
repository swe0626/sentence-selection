import sentences from './sentences.json';

export const getSentences = () => new Promise<{ [key: string]: string }>((resolve) => {
    setTimeout(() => {
        resolve(sentences);
    }, 1000);
});
