import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const Mocked = () => {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    )
}
test('should render', () => {
    render(<Mocked/>);
    const rendered = screen.getByTestId('app');
    expect(rendered).toBeInTheDocument();
});

test('should default to /home', () => {
    render(<Mocked/>);
    expect(window.location.pathname).toEqual('/home');
});
