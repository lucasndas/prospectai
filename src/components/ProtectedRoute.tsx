import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        setUser(data?.user || null)
      } catch (error) {
        console.error('Erro ao verificar usuário:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Escutar mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}