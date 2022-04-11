import Home from './Home'
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AppContext, appStateReducer } from '../../../../shared/AppStateReducer';
import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';


describe('<Home/>', () => {
    test('should mount', () => {
        render(<Home/>);
        const homeScreen = screen.getByTestId('Home');
        expect(homeScreen).toBeInTheDocument();
    })

    test('should render cards', async () => {
        jest.mock('axios');
        axios.get = jest.fn().mockResolvedValue(mockedResponse);
        const Wrapper = () => {
            const [state, dispatch] = useReducer(appStateReducer, {seriesKeys: mockedResponse});

            return (
                <AppContext.Provider value={{state, dispatch}}>
                    <BrowserRouter>
                        <Home/>
                    </BrowserRouter>
                </AppContext.Provider>
            );
        };
        render(<Wrapper/>);
        await waitFor(async () => {
            expect(screen.getByTestId('intro-cards'))
                .toBeInTheDocument();
        });
    })
})

const mockedResponse = [
    {
        "key": "0x00",
        "name": "Super Smash Bros."
    },
];
