import Home from './Home'
import { render, screen } from '@testing-library/react';

describe('<Home/>', () => {
    test('should mount', () => {
        render(<Home/>);
        const homeScreen = screen.getByTestId('Home');
        expect(homeScreen).toBeInTheDocument();
    })
})
