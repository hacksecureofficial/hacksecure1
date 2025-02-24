import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

async function readUsersFile() {
  const data = await fs.readFile(USERS_FILE_PATH, 'utf8');
  return JSON.parse(data);
}

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = await readUsersFile();
    const user = users.find(u => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

