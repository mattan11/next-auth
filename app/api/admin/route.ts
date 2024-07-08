import { NextResponse } from 'next/server';
import { currentAuthRole } from '@/lib/currentAuthUser';
import { UserRole } from '@prisma/client';

export async function GET() {
  const role = await currentAuthRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
