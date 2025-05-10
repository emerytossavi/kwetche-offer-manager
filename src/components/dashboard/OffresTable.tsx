
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Offre {
  id: string;
  titre: string;
  statut: 'active' | 'inactive' | 'draft';
  dateCreation: string;
  valeurKwetche: number;
  vues: number;
  conversions: number;
}

interface OffresTableProps {
  offres: Offre[];
  onEdit?: (offre: Offre) => void;
  onDelete?: (offre: Offre) => void;
}

export function OffresTable({ offres, onEdit, onDelete }: OffresTableProps) {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Offre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead className="text-right">Valeur (K)</TableHead>
            <TableHead className="text-right">Vues</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offres.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucune offre trouvée
              </TableCell>
            </TableRow>
          ) : (
            offres.map((offre) => (
              <TableRow key={offre.id}>
                <TableCell className="font-medium">
                  <Link to={`/dashboard/offre/${offre.id}`} className="hover:underline">
                    {offre.titre}
                  </Link>
                </TableCell>
                <TableCell>{getStatusBadge(offre.statut)}</TableCell>
                <TableCell>{offre.dateCreation}</TableCell>
                <TableCell className="text-right">{offre.valeurKwetche}</TableCell>
                <TableCell className="text-right">{offre.vues.toLocaleString()}</TableCell>
                <TableCell className="text-right">{offre.conversions.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/offre/${offre.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Voir les détails</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(offre)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Modifier</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-500"
                        onClick={() => onDelete?.(offre)}
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
    </div>
  );
}
