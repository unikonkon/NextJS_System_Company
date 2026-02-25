'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { mockPerformanceReviews } from '@/lib/mock/employees';
import { Star } from 'lucide-react';

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Performance Reviews" description="Employee performance evaluations" />
      <div className="grid gap-4 md:grid-cols-2">
        {mockPerformanceReviews.map(review => (
          <Card key={review.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{review.employeeName}</CardTitle>
                <StatusBadge status={review.status} />
              </div>
              <p className="text-sm text-muted-foreground">Period: {review.period} | Reviewer: {review.reviewerName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-bold">{review.score}/{review.maxScore}</span>
                <Progress value={(review.score / review.maxScore) * 100} className="flex-1" />
              </div>
              <div className="space-y-2">
                {review.categories.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <span>{cat.name}</span>
                    <span className="font-medium">{cat.score}/{cat.maxScore}</span>
                  </div>
                ))}
              </div>
              {review.strengths && (
                <div><p className="text-xs font-medium text-muted-foreground">Strengths</p><p className="text-sm">{review.strengths}</p></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}