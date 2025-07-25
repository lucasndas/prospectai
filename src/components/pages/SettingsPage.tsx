import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, User, Bell, Shield, Database } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import Layout from '@/components/Layout'

export default function SettingsPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Implementar atualização de perfil
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configurações
          </h1>
          <p className="text-gray-600">
            Gerencie suas preferências e configurações da conta.
          </p>
        </div>

        <div className="space-y-6">
          {/* Perfil do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Perfil do Usuário</span>
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user?.email || ''} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input 
                    id="company" 
                    type="text" 
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notificações</span>
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por Email</h4>
                    <p className="text-sm text-gray-500">Receba atualizações importantes por email</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ativado
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Relatórios Semanais</h4>
                    <p className="text-sm text-gray-500">Resumo semanal das suas atividades</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ativado
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Segurança</span>
              </CardTitle>
              <CardDescription>
                Gerencie a segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar Autenticação de Dois Fatores
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Sessões Ativas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Dados</span>
              </CardTitle>
              <CardDescription>
                Gerencie seus dados e privacidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Exportar Dados
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}