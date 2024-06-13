// test-utils.js
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { createContext } from 'react';

// Crear un contexto de enrutador manualmente si `RouterContext` sigue causando problemas
export const RouterContext = createContext({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    events: {
        on: vi.fn(),
        off: vi.fn(),
    },
    beforePopState: vi.fn(),
    isFallback: false,
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
});

// Crear una función auxiliar para envolver el componente con el mock del enrutador
export const renderWithRouter = (ui, { route = '/' } = {}) => {
    const router = {
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
        },
        beforePopState: vi.fn(),
        isFallback: false,
        pathname: route,
        route,
        asPath: route,
        query: {},
    };
    return render(
        <RouterContext.Provider value={router}>
            {ui}
        </RouterContext.Provider>
    );
};
