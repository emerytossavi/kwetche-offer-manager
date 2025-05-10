
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'offre' | 'reduction' | 'partenariat' | 'system';
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface RecentActivityProps {
  activities: ActivityItem[];
  className?: string;
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  const getStatusColor = (status?: 'success' | 'warning' | 'error' | 'info') => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'offre':
        return 'border-blue-200 bg-blue-50 text-blue-600';
      case 'reduction':
        return 'border-green-200 bg-green-50 text-green-600';
      case 'partenariat':
        return 'border-purple-200 bg-purple-50 text-purple-600';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-600';
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>Les dernières actions sur la plateforme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[400px] pr-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="mt-1">
              <span className={cn("block h-2 w-2 rounded-full", getStatusColor(activity.status))}></span>
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <Badge variant="outline" className={cn("text-xs", getTypeColor(activity.type))}>
                  {activity.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full">Afficher toute l'activité</Button>
      </CardFooter>
    </Card>
  );
}
