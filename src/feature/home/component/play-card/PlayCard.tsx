import styles from './PlayCard.module.scss';
import { useEffect } from 'react';

interface PlayCardProps {
    background: string;
    rotate: boolean;
    click: () => void;
}

const PlayCard = (props: PlayCardProps) => {
    useEffect(() => {
    }, []);

    return (
        <div className={styles.container} data-testId='play-card'>
            <div onClick={() => props.click()}
                 className={`${styles.card} ${props.rotate ? styles.rotate : ''}`}>
                <div className={styles.front}/>
                <div data-testId='card-background' className={styles.back} style={{backgroundImage: `url(${props.background})`}}/>
            </div>
        </div>
    )
}

export default PlayCard;
