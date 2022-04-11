import styles from './Game.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { client } from '../../api/AmiiboClient';
import { ISeries } from '../../model/ISeries';
import PlayCard from '../../component/play-card/PlayCard';
import { shuffleArray } from '../../../../utils/ArrayUtis';

interface GameState {
    key: string;
    series: string;
}

interface ICard extends ISeries {
    rotate: boolean
}

const Game = () => {
    const [allCharacters, setAllCharacters] = useState<ISeries[]>([]);
    const [gameCharacters, setGameCharacters] = useState<ICard[]>([]);
    const [lastSelection, setLastSelection] = useState<number | null>(null);
    const [solvedCharacters, setSolvedCharacters] = useState<number[]>([]);
    const [wins, setWins] = useState<number>(0);
    const acceptNewClick = useRef<boolean>(true);

    const {state} = useLocation();
    const navigate = useNavigate();
    const seriesName = (state as GameState)?.series;
    const seriesKey = (state as GameState)?.key;

    useEffect(() => {
        acceptNewClick.current = true;
    }, [lastSelection]);

    useEffect(() => {
        if (solvedCharacters.length > 0 &&
            solvedCharacters.length === gameCharacters.length) {
            restart();
        }
    }, [solvedCharacters, gameCharacters]);

    useEffect(() => {
        const numbers: number[] = Array.from(Array(allCharacters.length).keys());
        const randomNumbers: number[] = numbers.sort(() => Math.random() - 0.5).slice(0, 5);
        const chosenCharacters = randomNumbers.map(n => ({
            ...allCharacters[n],
            rotate: false
        }));
        setGameCharacters(shuffleArray([...chosenCharacters, ...chosenCharacters]));
    }, [allCharacters, wins]);

    useEffect(() => {
        if (!seriesName || !seriesKey) {
            return navigate('/home');
        }
        const loadRandomCharacters = async (): Promise<void> => {
            const allSeries: ISeries[] = await client.getSeriesByKey(seriesKey).then(res => res.amiibo);
            setAllCharacters(allSeries);
        }
        loadRandomCharacters();
    }, [seriesName, seriesKey]);

    const onCardClick = (i: number): void => {
        if (i === lastSelection || solvedCharacters.includes(i) || !acceptNewClick.current) return;
        acceptNewClick.current = false;
        openCard(i);
        setTimeout(() => {
            // wait for animation
            console.log('last selection ' + lastSelection)
            lastSelection !== null ? handleSecondSelection(i) : setLastSelection(i);
        }, 500);
    }

    const openCard = (i: number): void => {
        setGameCharacters(old => old.map((card, index) => {
            return i === index ? {...card, rotate: true} : card;
        }));
    }

    const handleSecondSelection = (i: number): void => {
        if (lastSelection == null) {
            alert('contact police this should not have happened');
        }
        const selected = gameCharacters[i];
        const previous = gameCharacters[lastSelection!];
        if (selected.name !== previous.name) {
            setGameCharacters(old => old.map((card, index) => {
                return (index === i || index === lastSelection) ? {...card, rotate: false} : card;
            }));
        }

        if (selected.name === previous.name) {
            setSolvedCharacters(old => [...old, i, lastSelection!]);
        }
        setLastSelection(null);
    }

    const restart = () => {
        alert(`Win ${wins + 1}`);
        setLastSelection(null);
        setSolvedCharacters([]);
        setWins(old => old + 1);
    }

    return (
        <div className={styles.container}>
            {
                gameCharacters.map((char, i) => (
                    <PlayCard index={i} click={() => onCardClick(i)} key={i} background={char.image}
                              rotate={char.rotate}/>
                ))
            }
        </div>
    )
}

export default Game;
