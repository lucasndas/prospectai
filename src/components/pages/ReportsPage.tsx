import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { BarChart3, Download, Calendar } from 'lucide-react'

export default function ReportsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatórios
          </h1>
          <p className="text-gray-600">
            Visualize métricas e insights detalhados sobre suas atividades.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Novo Relatório</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Período</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Mensal</CardTitle>
              <CardDescription>
                Acompanhe o desempenho dos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Gráfico de desempenho será exibido aqui
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversões</CardTitle>
              <CardDescription>
                Taxa de conversão por período
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Dados de conversão serão exibidos aqui
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}