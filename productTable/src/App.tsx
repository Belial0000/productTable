import List from './components/List/List';
import Filter from './components/Filter/Filter';

import { Container } from '@mui/material';
import styles from './app.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <Container>
                <Filter />
                <List />
            </Container>
        </div>
    );
}

export default App;
