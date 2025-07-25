import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Layout from '@/components/Layout'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText, 
  Search
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()

  const dashboardCards = [
    {
      title: 'Análise de Prospects',
      description: 'Identifique e analise potenciais clientes',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/prospects')
    },
    {
      title: 'Relatórios',
      description: 'Visualize métricas e insights detalhados',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      action: () => navigate('/reports')
    },
    {
      title: 'Gerenciar Leads',
      description: 'Organize e acompanhe seus leads',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/leads')
    },
    {
      title: 'Tendências',
      description: 'Acompanhe tendências do mercado',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/trends')
    }
  ]

  const stats = [
    { label: 'Prospects Ativos', value: '1,234', change: '+12%' },
    { label: 'Conversões', value: '89', change: '+5%' },
    { label: 'Taxa de Sucesso', value: '7.2%', change: '+2.1%' },
    { label: 'Receita Gerada', value: 'R$ 45.6K', change: '+18%' }
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boas-vindas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo das suas atividades e métricas mais recentes.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cards de funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={card.action}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription className="mt-1">{card.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Atividade recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova análise de prospect concluída</p>
                  <p className="text-xs text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Relatório mensal gerado</p>
                  <p className="text-xs text-gray-500">Há 5 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">15 novos leads adicionados</p>
                  <p className="text-xs text-gray-500">Ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}