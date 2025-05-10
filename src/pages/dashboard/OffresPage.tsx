
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { OffresTable, Offre } from '@/components/dashboard/OffresTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockOffres: Offre[] = [
  {
    id: '01',
    titre: 'Café gratuit chez Coffee Shop',
    statut: 'active',
    dateCreation: '15/04/2023',
    valeurKwetche: 100,
    vues: 1240,
    conversions: 128
  },
  {
    id: '02',
    titre: 'Réduction de 20% sur les pizzas',
    statut: 'active',
    dateCreation: '22/03/2023',
    valeurKwetche: 150,
    vues: 890,
    conversions: 96
  },
  {
    id: '03',
    titre: 'Dessert offert pour deux plats achetés',
    statut: 'inactive',
    dateCreation: '10/03/2023',
    valeurKwetche: 80,
    vues: 720,
    conversions: 84
  },
  {
    id: '04',
    titre: 'Réduction de 15% sur les vêtements',
    statut: 'draft',
    dateCreation: '05/02/2023',
    valeurKwetche: 200,
    vues: 320,
    conversions: 45
  },
  {
    id: '05',
    titre: 'Séance de cinéma gratuite',
    statut: 'active',
    dateCreation: '18/01/2023',
    valeurKwetche: 250,
    vues: 650,
    conversions: 72
  }
];

export default function OffresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const handleEdit = (offre: Offre) => {
    // This would typically navigate to edit page
    console.log('Edit offre:', offre);
  };

  const handleDelete = (offre: Offre) => {
    toast({
      title: 'Offre supprimée',
      description: `L'offre "${offre.titre}" a été supprimée.`,
    });
  };

  const filteredOffres = mockOffres.filter(offre => {
    const matchesSearch = offre.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offre.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <PageHeader 
        title="Gérer les offres" 
        description="Consultez, modifiez ou désactivez vos offres actuelles."
        actions={
          <Link to="/dashboard/offre/ajouter">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle offre
            </Button>
          </Link>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une offre..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actives</SelectItem>
            <SelectItem value="inactive">Inactives</SelectItem>
            <SelectItem value="draft">Brouillons</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <OffresTable
        offres={filteredOffres}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
