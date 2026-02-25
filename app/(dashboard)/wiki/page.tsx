'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockWikiArticles } from '@/lib/mock/chat';
import { Plus, BookOpen, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function WikiPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader title="Wiki" description="Company knowledge base" action={{ label: 'New Article', onClick: () => toast.info('New article form coming soon'), icon: Plus }} />
      <div className="grid gap-4 md:grid-cols-2">
        {mockWikiArticles.map(article => (
          <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/wiki/${article.slug}`)}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">{article.title}</CardTitle>
              </div>
              <Badge variant="secondary">{article.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.content.substring(0, 150)}...</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">By {article.authorName}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />{article.viewCount} views
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
