import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Error fetching courses' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
      },
    });
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Error creating course' }, { status: 500 });
  }
}

