'use server'
import { redirect } from 'next/navigation'
import { checkPassword, createAdminSession, destroyAdminSession } from '@/lib/admin-auth'

export async function loginAction(_: unknown, formData: FormData): Promise<{ error: string }> {
  const password = formData.get('password') as string
  if (!password || !checkPassword(password)) {
    return { error: 'Incorrect password. Please try again.' }
  }
  await createAdminSession()
  redirect('/admin')
}

export async function logoutAction() {
  await destroyAdminSession()
  redirect('/admin/login')
}
