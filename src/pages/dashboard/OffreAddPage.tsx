
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function OffreAddPage() {
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans une application réelle, vous enverriez ces données à une API
    toast({
      title: 'Offre créée avec succès',
      description: 'Votre nouvelle offre a été ajoutée.',
    });
    
    // Rediriger vers la liste des offres
    navigate('/dashboard/offres');
  };

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
          title="Ajouter une nouvelle offre" 
          description="Créez une nouvelle offre à présenter à vos clients."
        />
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="titre" className="text-base">Titre de l'offre</Label>
                <Input id="titre" placeholder="Ex: Café gratuit chez Coffee Shop" className="mt-1.5" />
                <p className="text-sm text-muted-foreground mt-1">
                  Le titre doit être concis et descriptif.
                </p>
              </div>
              <div>
                <Label htmlFor="partenaire" className="text-base">Partenaire</Label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Sélectionner un partenaire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                    <SelectItem value="pizza-express">Pizza Express</SelectItem>
                    <SelectItem value="le-gourmet">Restaurant Le Gourmet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Sélectionnez le commerce partenaire pour cette offre.
                </p>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="description" className="text-base">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez votre offre en détail..." 
                  className="mt-1.5 min-h-[100px]" 
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Donnez suffisamment de détails pour que les clients comprennent la valeur de votre offre.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <Label className="text-base">Image de l'offre</Label>
            <div className="mt-1.5 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
                 onClick={() => document.getElementById('image-upload')?.click()}>
              {image ? (
                <div className="relative w-full">
                  <img 
                    src={image} 
                    alt="Aperçu de l'offre" 
                    className="rounded-md max-h-[200px] mx-auto"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Cliquez pour uploader une image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="valeur" className="text-base">Valeur en KWETCHE</Label>
                <Input id="valeur" type="number" min="1" placeholder="Ex: 100" className="mt-1.5" />
                <p className="text-sm text-muted-foreground mt-1">
                  Combien de KWETCHE l'utilisateur gagne-t-il avec cette offre ?
                </p>
              </div>
              <div>
                <Label htmlFor="expiration" className="text-base">Date d'expiration</Label>
                <Input id="expiration" type="date" className="mt-1.5" />
                <p className="text-sm text-muted-foreground mt-1">
                  Jusqu'à quand cette offre est-elle valable ?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="status" className="text-base">Statut initial</Label>
                <Select defaultValue="draft">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activer immédiatement</SelectItem>
                    <SelectItem value="draft">Enregistrer comme brouillon</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choisissez si l'offre sera immédiatement visible par les utilisateurs.
                </p>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between py-4">
            <Button variant="outline" type="button" asChild>
              <Link to="/dashboard/offres">Annuler</Link>
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4 mr-2" />
              Créer l'offre
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
