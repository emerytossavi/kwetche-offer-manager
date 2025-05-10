import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { PlusCircle, Package, Eye, Percent, Handshake, BarChart3, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Mock data
const recentActivities = [
  {
    id: '1',
    title: 'Nouvelle offre créée',
    description: 'L\'offre "Réduction sur pizza" a été créée',
    time: 'Il y a 5 minutes',
    type: 'offre' as const,
    status: 'success' as const
  },
  {
    id: '2',
    title: 'Code promo ajouté',
    description: 'Le code "ETE2023" a été ajouté à l\'offre "Réduction sur pizza"',
    time: 'Il y a 30 minutes',
    type: 'reduction' as const,
    status: 'info' as const
  },
  {
    id: '3',
    title: 'Offre modifiée',
    description: 'L\'offre "Café gratuit" a été mise à jour',
    time: 'Il y a 2 heures',
    type: 'offre' as const,
    status: 'info' as const
  },
  {
    id: '4',
    title: 'Nouveau partenariat',
    description: 'Un partenariat avec "Restaurant Le Gourmet" a été créé',
    time: 'Il y a 5 heures',
    type: 'partenariat' as const,
    status: 'success' as const
  },
  {
    id: '5',
    title: 'Offre désactivée',
    description: 'L\'offre "Réduction vêtements" a été désactivée',
    time: 'Hier',
    type: 'offre' as const,
    status: 'warning' as const
  }
];

const topOffres = [
  { id: '1', titre: 'Café gratuit', conversions: 128, vues: 1240 },
  { id: '2', titre: 'Réduction sur pizza', conversions: 96, vues: 890 },
  { id: '3', titre: 'Dessert offert', conversions: 84, vues: 720 },
];

export default function DashboardHome() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <PageHeader 
        title="Bienvenue sur votre tableau de bord" 
        description="Consultez les indicateurs clés de performance de vos offres"
        actions={
          <Link to="/dashboard/offre/ajouter">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle offre
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total d'offres actives"
          value="24"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: "12%", isPositive: true }}
          description="vs. mois précédent"
        />
        <StatCard
          title="Vues totales"
          value="3,456"
          icon={<Eye className="h-4 w-4" />}
          trend={{ value: "8%", isPositive: true }}
          description="vs. mois précédent"
        />
        <StatCard
          title="Conversions"
          value="842"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: "5%", isPositive: true }}
          description="vs. mois précédent"
        />
        <StatCard
          title="Partenaires actifs"
          value="12"
          icon={<Handshake className="h-4 w-4" />}
          trend={{ value: "0%", isPositive: true }}
          description="vs. mois précédent"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Performance des offres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/80" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Graphique des performances sur 30 jours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <RecentActivity activities={recentActivities} className="md:col-span-3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meilleures offres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOffres.map((offre, index) => (
                <div key={offre.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {index + 1}
                    </div>
                    <span>{offre.titre}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {offre.conversions} conversions ({((offre.conversions / offre.vues) * 100).toFixed(1)}%)
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/dashboard/offres">
                <Button variant="outline" className="w-full">
                  Voir toutes les offres
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotions actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Codes promo actifs"
                  value="12"
                  icon={<Percent className="h-4 w-4" />}
                />
                <StatCard
                  title="Utilisation moyenne"
                  value="24%"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
              </div>
              <div className="pt-2">
                <Link to="/dashboard/reductions">
                  <Button variant="outline" className="w-full">
                    Gérer les réductions
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
