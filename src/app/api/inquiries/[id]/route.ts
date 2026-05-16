import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/admin-auth'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauth = await requireAdminSession()
  if (unauth) return unauth

  const { id } = await params
  const { read } = await request.json()
  const inquiry = await prisma.inquiry.update({ where: { id }, data: { read } })
  return NextResponse.json(inquiry)
}
