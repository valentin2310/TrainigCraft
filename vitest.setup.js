import { vi } from 'vitest';

vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useRouter: () => ({
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
        }),
        useSearchParams: () => new URLSearchParams(),
        RouterContext: actual.RouterContext, // Asegúrate de devolver RouterContext
    };
});
