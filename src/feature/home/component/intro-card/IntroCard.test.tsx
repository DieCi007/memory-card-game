import { render, screen } from '@testing-library/react';
import IntroCard from './IntroCard';
import { BrowserRouter } from 'react-router-dom';

describe('<IntroCard/>', () => {
    test('should mount', () => {
        render(
            <BrowserRouter>
                <IntroCard name={'diego'}
                           seriesKey={'123'}/>
            </BrowserRouter>);
        const card = screen.getByTestId('intro-card');
        expect(card).toBeInTheDocument();
        expect(screen.getByText('diego')).toBeInTheDocument();
    })
})
