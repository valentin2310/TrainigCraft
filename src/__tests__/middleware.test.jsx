import { describe, it, expect, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { middleware } from '@/middleware';

// Mocking de NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => ({})),
    redirect: vi.fn((url) => ({ redirect: url }))
  }
}));

// Mocking de authMiddleware
vi.mock('next-firebase-auth-edge', () => ({
  authMiddleware: vi.fn((request, handlers) => {
    const { handleValidToken, handleInvalidToken, handleError } = handlers;

    // Simular token check
    if (request.headers.get('Authorization') === 'Bearer valid-token') {
      return handleValidToken({ token: 'valid-token', decodedToken: {} }, request.headers);
    } else if (request.headers.get('Authorization') === 'Bearer invalid-token') {
      return handleInvalidToken('Invalid token');
    } else {
      return handleInvalidToken('No token');
    }
  }),
  redirectToHome: vi.fn(() => NextResponse.redirect('/')),
  redirectToLogin: vi.fn(() => NextResponse.redirect('/'))
}));

describe('middleware', () => {
  it('debería redirigir a los usuarios no autenticados a /', async () => {
    const request = {
      nextUrl: { pathname: '/dashboard' },
      headers: new Headers()
    };

    const response = await middleware(request);
    expect(response).toEqual({ redirect: '/' });
  });

  it('debería permitir que los usuarios autenticados accedan a /dashboard', async () => {
    const request = {
      nextUrl: { pathname: '/dashboard' },
      headers: new Headers({ 'Authorization': 'Bearer valid-token' })
    };

    const response = await middleware(request);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
