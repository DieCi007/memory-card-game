import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PlayCard from './PlayCard';

const background = 'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_09c00101-02690e02.png';

describe('<PlayCard/>', () => {
    test('should mount', () => {
        render(<PlayCard click={() => {
        }}
                         background={background}
                         rotate={false}/>);
        const card = screen.getByTestId('play-card');
        expect(card).toBeInTheDocument();
    })

    test('should mount', async () => {
        let rotate = false;
        render(<PlayCard click={() => rotate = true}
                         background={background}
                         rotate={rotate}/>);
        const card = screen.getByTestId('play-card');
        fireEvent.click(card);
        expect(card).toBeInTheDocument();
        await waitFor(async () => {
            const element = await screen.findByTestId('card-background');
            expect(element).toHaveStyle(`background-image: url(${background})`)
        });
    })
})
