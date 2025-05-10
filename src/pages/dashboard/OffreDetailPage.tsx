
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/dashboard/StatCard';
import { ArrowLeft, Pencil, Eye, TrendingUp, BarChart3, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Mock data
const offreDetails = {
  id: '01',
  titre: 'Café gratuit chez Coffee Shop',
  description: 'Obtenez un café gratuit pour tout achat d\'un sandwich. Offre valable tous les jours de 8h à 11h.',
  statut: 'active',
  dateCreation: '15/04/2025',
  dateExpiration: '15/07/2025',
  valeurKwetche: 100,
  vues: 1240,
  conversions: 128,
  tauxConversion: 10.32,
  image: 'https://source.unsplash.com/random/400x300/?coffee',
  partenaire: 'Coffee Shop',
  conditions: [
    'Offre valable uniquement de 8h à 11h',
    'Un café gratuit par personne',
    'Non cumulable avec d\'autres offres',
    'Valable uniquement pour les sandwichs au menu'
  ]
};

const weeklyStats = [
  { jour: 'Lun', vues: 180, conversions: 18 },
  { jour: 'Mar', vues: 220, conversions: 22 },
  { jour: 'Mer', vues: 175, conversions: 15 },
  { jour: 'Jeu', vues: 190, conversions: 20 },
  { jour: 'Ven', vues: 210, conversions: 25 },
  { jour: 'Sam', vues: 150, conversions: 18 },
  { jour: 'Dim', vues: 115, conversions: 10 },
];

export default function OffreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Brouillon</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <p>Chargement des détails de l'offre...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/dashboard/offres">
          <Button variant="ghost" className="pl-0 mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux offres
          </Button>
        </Link>
        <PageHeader 
          title={offreDetails.titre}
          description={`Créée le ${offreDetails.dateCreation}`}
          actions={
            <>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Prévisualiser
              </Button>
              <Link to={`/dashboard/offre/${id}/edit`}>
                <Button>
                  <Pencil className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </Link>
            </>
          }
        />
        <div className="flex items-center space-x-2 mt-2">
          {getStatusBadge(offreDetails.statut)}
          <Badge variant="outline" className="border-kwetche-200 bg-kwetche-50 text-kwetche-700">
            {offreDetails.valeurKwetche} Kwetché
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Vues totales"
          value={offreDetails.vues.toLocaleString()}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          title="Conversions"
          value={offreDetails.conversions.toLocaleString()}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Taux de conversion"
          value={`${offreDetails.tauxConversion}%`}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          title="Expiration"
          value={offreDetails.dateExpiration}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="details" className="mb-6">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'offre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={offreDetails.image} 
                    alt={offreDetails.titre}
                    className="rounded-md w-full h-48 object-cover"
                  />
                  
                  <div>
                    <h3 className="font-semibold mb-1">Description</h3>
                    <p className="text-sm text-muted-foreground">{offreDetails.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Partenaire</h3>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{offreDetails.partenaire}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Valeur</h3>
                    <p>{offreDetails.valeurKwetche} Kwetché</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conditions d'utilisation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  {offreDetails.conditions.map((condition, index) => (
                    <li key={index} className="text-sm">{condition}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="statistics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performances hebdomadaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <div className="flex items-end h-64 gap-4">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col gap-1 items-center">
                        <div 
                          className="w-full bg-kwetche-200 rounded-t"
                          style={{ height: `${(stat.conversions / 25) * 100}px` }}
                        ></div>
                        <div 
                          className="w-full bg-kwetche-500 rounded-t"
                          style={{ height: `${(stat.vues / 220) * 100}px` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs">{stat.jour}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-kwetche-500 rounded"></div>
                    <span className="text-xs">Vues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-kwetche-200 rounded"></div>
                    <span className="text-xs">Conversions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "22/04/2025 14:30", action: "Mise à jour de l'image", user: "admin@bemi.com" },
                  { date: "20/04/2025 10:15", action: "Modification de la description", user: "admin@bemi.com" },
                  { date: "15/04/2025 09:00", action: "Création de l'offre", user: "admin@bemi.com" }
                ].map((event, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-kwetche-600"></div>
                    {i !== 2 && <div className="absolute left-1 top-3 h-full w-[1px] bg-gray-200"></div>}
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{event.action}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
