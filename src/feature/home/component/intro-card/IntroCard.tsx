import styles from './IntroCard.module.scss'
import { useNavigate } from 'react-router-dom';

interface IntroCardProps {
    name: string,
    seriesKey: string
}

const IntroCard = (props: IntroCardProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => navigate('/game',
            {state: {series: props.name, key: props.seriesKey}})}>
            <div className={styles.cardName}>{props.name}</div>
        </div>
    )
}

export default IntroCard
