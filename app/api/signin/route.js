import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

async function readUsersFile() {
  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    throw new Error('Unable to read users data');
  }
}

export async function POST(request) {
  console.log('Sign-in attempt received');
  try {
    const { email, password } = await request.json();

    // Read users from file
    const users = await readUsersFile();
    console.log(`Users file read, ${users.length} users found`);

    // Find user by email
    const user = users.find(u => u.email === email);

    if (user) {
      console.log(`User found: ${user.email}`);
    } else {
      console.log(`User not found for email: ${email}`);
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Password validation result: ${isPasswordValid}`);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not set in the environment variables');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '1h' }
    );

    console.log('Sign-in successful, sending response');
    // Set the token in a cookie
    const response = NextResponse.json({ message: 'Sign in successful' }, { status: 200 });
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in signin:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during signin' }, { status: 500 });
  }
}

