import Game from './Game'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


const Mocked = () => {
    return (
        <BrowserRouter>
            <Game/>
        </BrowserRouter>
    )
}
describe('<Game/>', () => {
    test('component should mount', () => {
        render(<Mocked/>);
        const rendered = screen.getByTestId('game');
        expect(rendered).toBeInTheDocument();
    })

    test('back btn should be visible', () => {
        render(<Mocked/>);
        const text = screen.getByText('Change Game Series');
        expect(text).toBeInTheDocument();
    })
})
