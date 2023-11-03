import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hook';
import { fetchProducts } from './store/productsSlice';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // повторный запрос если меняется лимит и очистка
        dispatch(fetchProducts());
    }, [dispatch]);

    const productsData = useAppSelector((state) => state.products);
    console.log(productsData);

    return <></>;
}

export default App;
