import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only apply middleware to VIP routes
  if (pathname.startsWith('/vip-courses')) {
    const token = request.cookies.get('token');

    // If no token is found, redirect to payment
    if (!token) {
      return NextResponse.redirect(new URL('/courses/payment', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
      
      // Check if the user has a VIP subscription
      if (!payload.vip_subscription) {
        return NextResponse.redirect(new URL('/courses/payment', request.url));
      }
    } catch (err) {
      // Token verification failed; redirect to payment
      return NextResponse.redirect(new URL('/courses/payment', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}
