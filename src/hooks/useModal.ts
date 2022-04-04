import { useContext } from 'react';
import { ImageModalContext } from '../contexts/ImageModalContext';

export function useModal() {
    const value = useContext(ImageModalContext);

    return value;
}