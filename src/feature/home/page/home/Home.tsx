import styles from './home.module.scss';
import { useEffect, useState } from 'react';
import { client } from '../../api/AmiiboClient';
import { ISeriesKey } from '../../model/ISeriesKey';
import { VALID_SERIES } from '../../model/GameSeries';
import IntroCard from '../../component/intro-card/IntroCard';

const validSeries: string[] = VALID_SERIES;

const Home = () => {
    const [allSeriesKeys, setAllSeriesKeys] = useState<ISeriesKey[]>([]);

    useEffect(() => {
        client.getSeriesKeys().then(data => setAllSeriesKeys(data?.amiibo
            .filter(series => validSeries.includes(series.name))));
    }, [])

    return (
        (allSeriesKeys.length === 0) ? <div>Loading...</div> :
            <div className={styles.container}>
                <div className={styles.title}>Choose your preferred Game Series</div>
                <section className={styles.cards}> {allSeriesKeys.map(series => (
                    <IntroCard key={series.key} name={series.name} seriesKey={series.key}/>
                ))}
                </section>
            </div>
    )
}

export default Home;
