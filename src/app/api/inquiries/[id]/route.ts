import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { read } = await request.json()
  const inquiry = await prisma.inquiry.update({ where: { id }, data: { read } })
  return NextResponse.json(inquiry)
}
