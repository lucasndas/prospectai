import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Search, Plus, Filter } from 'lucide-react'

export default function ProspectsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Análise de Prospects
          </h1>
          <p className="text-gray-600">
            Identifique e analise potenciais clientes com inteligência artificial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Prospect</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Buscar</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Prospects</CardTitle>
            <CardDescription>
              Gerencie e acompanhe seus prospects em potencial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum prospect encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                Comece adicionando seu primeiro prospect para análise.
              </p>
              <Button>
                Adicionar Prospect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}