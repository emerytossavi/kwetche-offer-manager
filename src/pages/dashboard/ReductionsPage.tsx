
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
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreHorizontal, Percent, Search, Check, Copy, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reduction {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageLimit: number;
  usageCount: number;
  expirationDate: string;
  status: 'active' | 'expired' | 'depleted';
}

const mockReductions: Reduction[] = [
  {
    id: '1',
    code: 'EYA2025',
    description: '20% de réduction sur les offres d\'été',
    type: 'percentage',
    value: 20,
    usageLimit: 100,
    usageCount: 45,
    expirationDate: '31/08/2025',
    status: 'active'
  },
  {
    id: '2',
    code: 'BIENVENUE',
    description: '10% de réduction pour les nouveaux utilisateurs',
    type: 'percentage',
    value: 10,
    usageLimit: 0,
    usageCount: 320,
    expirationDate: '31/12/2025',
    status: 'active'
  },
  {
    id: '3',
    code: 'PROMO50',
    description: '50 Kwetché offerts pour tout achat',
    type: 'fixed',
    value: 50,
    usageLimit: 200,
    usageCount: 200,
    expirationDate: '15/05/2025',
    status: 'depleted'
  },
  {
    id: '4',
    code: 'SIMPLETEST',
    description: '15% sur les achats de bracelets',
    type: 'percentage',
    value: 15,
    usageLimit: 150,
    usageCount: 120,
    expirationDate: '31/4/2025',
    status: 'expired'
  }
];

export default function ReductionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: 'Code copié',
        description: `Le code "${code}" a été copié dans le presse-papier.`,
      });
    });
  };

  const handleDelete = (reduction: Reduction) => {
    toast({
      title: 'Code promo supprimé',
      description: `Le code "${reduction.code}" a été supprimé.`,
    });
  };

  const filteredReductions = mockReductions.filter(reduction =>
    reduction.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reduction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expiré</Badge>;
      case 'depleted':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Épuisé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Codes de réduction" 
        description="Gérez les codes promo associés à vos offres."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouveau code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer un nouveau code promo</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouveau code de réduction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Code</Label>
                  <Input id="code" placeholder="Ex: EYA2025" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Ex: 20% de réduction sur les offres d'été" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type de réduction</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                        <SelectItem value="fixed">Montant fixe (Kwetché)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="value">Valeur</Label>
                    <Input id="value" type="number" min="1" placeholder="Ex: 20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="limit">Limite d'utilisation</Label>
                    <Input id="limit" type="number" min="0" placeholder="Ex: 100 (0 = illimité)" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expiration">Date d'expiration</Label>
                    <Input id="expiration" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                <Button onClick={() => {
                  toast({
                    title: 'Code promo créé',
                    description: 'Votre nouveau code promo a été créé avec succès.',
                  });
                  setIsDialogOpen(false);
                }}>
                  <Check className="h-4 w-4 mr-2" />
                  Créer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Liste des codes promo</CardTitle>
            <div className="relative w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un code..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>
            Visualisez et gérez tous vos codes de réduction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Utilisation</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReductions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Aucun code de réduction trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredReductions.map((reduction) => (
                  <TableRow key={reduction.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <span>{reduction.code}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {reduction.type === 'percentage' 
                        ? `${reduction.value}%` 
                        : `${reduction.value} Kwetché`}
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate">{reduction.description}</TableCell>
                    <TableCell>
                      {reduction.usageCount} / {reduction.usageLimit > 0 ? reduction.usageLimit : '∞'}
                    </TableCell>
                    <TableCell>{reduction.expirationDate}</TableCell>
                    <TableCell>{getStatusBadge(reduction.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyToClipboard(reduction.code)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copier le code</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-500"
                            onClick={() => handleDelete(reduction)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
