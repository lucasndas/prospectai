import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'
import { Users, Plus, Mail, Phone } from 'lucide-react'

export default function LeadsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar Leads
          </h1>
          <p className="text-gray-600">
            Organize e acompanhe seus leads em potencial.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Adicionar Lead</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Enviar Email</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Ligar</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads</CardTitle>
            <CardDescription>
              Acompanhe o status e progresso de cada lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum lead cadastrado
              </h3>
              <p className="text-gray-500 mb-4">
                Comece adicionando seus primeiros leads para acompanhamento.
              </p>
              <Button>
                Adicionar Lead
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}