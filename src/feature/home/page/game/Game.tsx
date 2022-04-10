import styles from './Game.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../../api/AmiiboClient';
import { ISeries } from '../../model/ISeries';
import PlayCard from '../../component/play-card/PlayCard';

interface GameState {
    key: string;
    series: string;
}

interface ICard extends ISeries {
    rotate: boolean
}

const Game = () => {
    const [allCharacters, setAllCharacters] = useState<ICard[]>([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const seriesName = (state as GameState)?.series;
    const seriesKey = (state as GameState)?.key;

    useEffect(() => {
        if (!seriesName || !seriesKey) {
            return navigate('/home');
        }
        const loadRandomCharacters = async (): Promise<void> => {
            const allSeries = await client.getSeriesByKey(seriesKey).then(res => res.amiibo);
            const numbers: number[] = Array.from(Array(allSeries.length).keys());
            const randomNumbers: number[] = numbers.sort(() => Math.random() - 0.5).slice(0, 5);
            const chosenCharacters = randomNumbers.map(n => ({
                ...allSeries[n],
                rotate: false
            }));
            setAllCharacters(shuffleArray([...chosenCharacters, ...chosenCharacters]));
        }
        loadRandomCharacters();
    }, []);

    const onCardClick = (i: number) => {
        setAllCharacters(old => old.map((card, index) => {
            return i === index ? {...card, rotate: !card.rotate} : card;
        }))
    }

    return (
        <div className={styles.container}>
            {
                allCharacters.map((char, i) => (
                    <PlayCard index={i} click={() => onCardClick(i)} key={i} background={char.image}
                              rotate={char.rotate}/>
                ))
            }
        </div>
    )
}

export default Game;

function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
