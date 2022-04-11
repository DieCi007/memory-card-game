import styles from './home.module.scss';
import { useContext, useEffect } from 'react';
import { client } from '../../api/AmiiboClient';
import { VALID_SERIES } from '../../model/GameSeries';
import IntroCard from '../../component/intro-card/IntroCard';
import { AppContext } from '../../../../shared/AppStateReducer';

const validSeries: string[] = VALID_SERIES;

const Home = () => {
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (state.seriesKeys.length === 0) {
            client.getSeriesKeys().then(data => dispatch!({
                seriesKeys: data?.amiibo
                    .filter(series => validSeries.includes(series.name))
            }));
        }
    }, [])

    return (
        (state.seriesKeys.length === 0) ? <div data-testid="Home">Loading...</div> :
            <div className={styles.container}>
                <div className={styles.title}>Choose your favourite Game Series</div>
                <section className={styles.cards} data-testid={'intro-cards'}> {state.seriesKeys.map(series => (
                    <IntroCard key={series.key} name={series.name} seriesKey={series.key}/>
                ))}
                </section>
            </div>
    )
}

export default Home;
