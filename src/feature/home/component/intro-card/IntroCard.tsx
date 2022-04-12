import styles from './IntroCard.module.scss'
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

interface IntroCardProps {
    name: string,
    seriesKey: string
}

const IntroCard = (props: IntroCardProps) => {
    const navigate = useNavigate();

    return (
        <Tilt perspective={980} glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}>
            <div data-testId='intro-card' className={styles.card} onClick={() => navigate('/game',
                {state: {series: props.name, key: props.seriesKey}})}>
                <div className={styles.cardName}>{props.name}</div>
            </div>
        </Tilt>
    )
}

export default IntroCard
