import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { data: { user } } = await supabase.auth.getUser()

  // RBAC & Route Protection
  const path = request.nextUrl.pathname

  // Protected routes
  const isDashboardRoute = path.startsWith('/dashboard') || 
                           path.startsWith('/fire-monitoring') ||
                           path.startsWith('/cartographie') ||
                           path.startsWith('/centre-ia') ||
                           path.startsWith('/capteurs') ||
                           path.startsWith('/alertes') ||
                           path.startsWith('/analytics') ||
                           path.startsWith('/rapports') ||
                           path.startsWith('/users') ||
                           path.startsWith('/settings') ||
                           path.startsWith('/mes-sites') ||
                           path.startsWith('/notifications') ||
                           path.startsWith('/historique') ||
                           path.startsWith('/aide')

  const isClientRoute = path.startsWith('/client')

  if ((isDashboardRoute || isClientRoute) && !user) {
    // Return unauthorized access to login
    const url = request.nextUrl.clone()
    url.pathname = '/connexion'
    return NextResponse.redirect(url)
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('system_role')
      .eq('id', user.id)
      .single()

    const role = profile?.system_role || user.user_metadata?.system_role || 'viewer'

    if (isClientRoute && role !== 'client') {
      const url = request.nextUrl.clone()
      // If admin, send to admin dashboard
      if (role === 'admin') {
        url.pathname = '/dashboard'
      } else {
        url.pathname = '/'
      }
      return NextResponse.redirect(url)
    }

    if (isDashboardRoute && role !== 'admin') {
      const url = request.nextUrl.clone()
      if (role === 'client') {
        url.pathname = '/client/dashboard'
      } else {
        url.pathname = '/'
      }
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
