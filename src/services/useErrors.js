import { useDispatch } from 'react-redux';
import { addError, removeError } from '../store/errors';

export default function useErrors() {
    const dispatch = useDispatch();

    const newError = (error) => {

        dispatch(addError(error));

        setTimeout(() => {
            dispatch(removeError());
        }, 2000);
    }

    return { newError };
}