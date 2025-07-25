import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { 
  Home,
  Search,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Prospects', href: '/prospects', icon: Search },
    { name: 'Relatórios', href: '/reports', icon: BarChart3 },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg mr-3"></div>
              <h1 className="text-xl font-bold text-gray-900">ProspectAI</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Bell className="h-4 w-4" />
              </Button>
              <span className="text-gray-700 hidden md:block">Olá, {user?.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm" className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-500">Logado como:</p>
                  <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="mx-3 w-auto"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}