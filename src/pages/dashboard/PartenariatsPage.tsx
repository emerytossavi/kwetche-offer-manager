import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, Handshake, TrendingUp, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface Partenaire {
  id: string;
  nom: string;
  logo: string;
  categorie: string;
  adresse: string;
  status: 'active' | 'inactive' | 'pending';
  dateCreation: string;
  nbOffres: number;
  nbConversions: number;
}

const mockPartenaires: Partenaire[] = [
  {
    id: '1',
    nom: 'Coffee Shop',
    logo: 'https://source.unsplash.com/random/100x100/?coffee',
    categorie: 'Restauration',
    adresse: '12 rue de la Paix, 75001 Paris',
    status: 'active',
    dateCreation: '10/01/2025',
    nbOffres: 3,
    nbConversions: 452
  },
  {
    id: '2',
    nom: 'Pizza Express',
    logo: 'https://source.unsplash.com/random/100x100/?pizza',
    categorie: 'Restauration',
    adresse: '25 avenue des Champs-Élysées, 75008 Paris',
    status: 'active',
    dateCreation: '15/02/2025',
    nbOffres: 2,
    nbConversions: 318
  },
  {
    id: '3',
    nom: 'Restaurant Le Gourmet',
    logo: 'https://source.unsplash.com/random/100x100/?restaurant',
    categorie: 'Restauration',
    adresse: '8 place Bellecour, 69002 Lyon',
    status: 'active',
    dateCreation: '03/03/2025',
    nbOffres: 1,
    nbConversions: 87
  },
  {
    id: '4',
    nom: 'Sport Life',
    logo: 'https://source.unsplash.com/random/100x100/?sport',
    categorie: 'Sport',
    adresse: '45 rue de la République, 13001 Marseille',
    status: 'inactive',
    dateCreation: '20/01/2025',
    nbOffres: 0,
    nbConversions: 0
  },
  {
    id: '5',
    nom: 'Cinéma Paradiso',
    logo: 'https://source.unsplash.com/random/100x100/?cinema',
    categorie: 'Loisirs',
    adresse: '30 boulevard des Capucines, 75009 Paris',
    status: 'pending',
    dateCreation: '05/05/2025',
    nbOffres: 0,
    nbConversions: 0
  }
];

// Move the getStatusBadge function outside of the component so it's accessible to all components in the file
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactif</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export default function PartenariatsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPartenaires = mockPartenaires.filter(partenaire =>
    partenaire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partenaire.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partenaire.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gestion des partenariats" 
        description="Gérez vos partenaires et suivez leurs performances."
        actions={
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau partenaire
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Partenaires actifs"
          value={mockPartenaires.filter(p => p.status === 'active').length}
          icon={<Handshake className="h-4 w-4" />}
        />
        <StatCard
          title="Offres partenaires"
          value={mockPartenaires.reduce((acc, p) => acc + p.nbOffres, 0)}
          icon={<ShoppingBag className="h-4 w-4" />}
        />
        <StatCard
          title="Conversions totales"
          value={mockPartenaires.reduce((acc, p) => acc + p.nbConversions, 0)}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="En attente"
          value={mockPartenaires.filter(p => p.status === 'pending').length}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="tous" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="tous">Tous</TabsTrigger>
            <TabsTrigger value="actifs">Actifs</TabsTrigger>
            <TabsTrigger value="inactifs">Inactifs</TabsTrigger>
            <TabsTrigger value="attente">En attente</TabsTrigger>
          </TabsList>
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un partenaire..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="tous" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartenaires.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>Aucun partenaire trouvé</p>
              </div>
            ) : (
              filteredPartenaires.map((partenaire) => (
                <PartenaireCard key={partenaire.id} partenaire={partenaire} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="actifs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartenaires.filter(p => p.status === 'active').length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>Aucun partenaire actif trouvé</p>
              </div>
            ) : (
              filteredPartenaires
                .filter(p => p.status === 'active')
                .map((partenaire) => (
                  <PartenaireCard key={partenaire.id} partenaire={partenaire} />
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="inactifs" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartenaires.filter(p => p.status === 'inactive').length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>Aucun partenaire inactif trouvé</p>
              </div>
            ) : (
              filteredPartenaires
                .filter(p => p.status === 'inactive')
                .map((partenaire) => (
                  <PartenaireCard key={partenaire.id} partenaire={partenaire} />
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="attente" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartenaires.filter(p => p.status === 'pending').length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p>Aucun partenaire en attente trouvé</p>
              </div>
            ) : (
              filteredPartenaires
                .filter(p => p.status === 'pending')
                .map((partenaire) => (
                  <PartenaireCard key={partenaire.id} partenaire={partenaire} />
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

interface PartenaireCardProps {
  partenaire: Partenaire;
}

function PartenaireCard({ partenaire }: PartenaireCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-center space-y-0 gap-3">
        <img 
          src={partenaire.logo} 
          alt={partenaire.nom} 
          className="h-10 w-10 rounded-md object-cover"
        />
        <div>
          <CardTitle className="text-base">{partenaire.nom}</CardTitle>
          <CardDescription>{partenaire.categorie}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2 flex items-start">
          <span className="text-xs bg-gray-100 rounded px-1.5 py-0.5 mr-2 mt-0.5">Adresse</span>
          {partenaire.adresse}
        </p>
        
        <div className="flex items-center justify-between text-sm mt-3">
          <p>
            <span className="text-muted-foreground">Statut:</span> {getStatusBadge(partenaire.status)}
          </p>
          <p>
            <span className="text-muted-foreground">Depuis:</span> {partenaire.dateCreation}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className={cn(
            "rounded-md p-2 text-center",
            partenaire.nbOffres > 0 ? "bg-kwetche-50 text-kwetche-700" : "bg-gray-50 text-gray-500"
          )}>
            <p className="text-xs font-medium">Offres</p>
            <p className="text-xl font-semibold">{partenaire.nbOffres}</p>
          </div>
          <div className={cn(
            "rounded-md p-2 text-center",
            partenaire.nbConversions > 0 ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"
          )}>
            <p className="text-xs font-medium">Conversions</p>
            <p className="text-xl font-semibold">{partenaire.nbConversions}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="ghost" className="w-full justify-between">
          <span>Voir les détails</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
