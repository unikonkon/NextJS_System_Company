'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockWikiArticles } from '@/lib/mock/chat';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Eye, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function WikiArticlePage() {
  const params = useParams();
  const router = useRouter();
  const article = mockWikiArticles.find(a => a.slug === params.slug);

  if (!article) return <div className="p-8 text-center">Article not found</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push('/wiki')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Wiki
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast.info('Edit coming soon')}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary">{article.category}</Badge>
          <div className="flex items-center gap-1"><User className="h-3 w-3" />{article.authorName}</div>
          <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(article.updatedAt).toLocaleDateString()}</div>
          <div className="flex items-center gap-1"><Eye className="h-3 w-3" />{article.viewCount} views</div>
        </div>
        <div className="flex gap-1 mt-2">
          {article.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
        </div>
      </div>
      <Card>
        <CardContent className="p-6 prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{article.content}</div>
        </CardContent>
      </Card>
    </div>
  );
}
