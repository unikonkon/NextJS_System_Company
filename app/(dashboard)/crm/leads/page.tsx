'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockLeads } from '@/lib/mock/clients';
import { LeadStatus } from '@/types/crm.types';
import { Plus, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const LEAD_COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'New', color: 'bg-blue-200' },
  { status: 'CONTACTED', label: 'Contacted', color: 'bg-cyan-200' },
  { status: 'QUALIFIED', label: 'Qualified', color: 'bg-indigo-200' },
  { status: 'PROPOSAL', label: 'Proposal', color: 'bg-purple-200' },
  { status: 'NEGOTIATION', label: 'Negotiation', color: 'bg-yellow-200' },
  { status: 'WON', label: 'Won', color: 'bg-green-200' },
  { status: 'LOST', label: 'Lost', color: 'bg-red-200' },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lead Pipeline" description="Track sales opportunities" action={{ label: 'Add Lead', onClick: () => toast.info('Add lead form coming soon'), icon: Plus }} />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_COLUMNS.map(col => {
          const leads = mockLeads.filter(l => l.status === col.status);
          return (
            <div key={col.status} className="min-w-[260px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-3 w-3 rounded-full ${col.color}`} />
                <h3 className="font-medium text-sm">{col.label}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{leads.length}</span>
              </div>
              <div className="space-y-2">
                {leads.map(lead => (
                  <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-2">
                      <p className="font-medium text-sm">{lead.companyName}</p>
                      <p className="text-xs text-muted-foreground">{lead.contactName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        <span>฿{lead.estimatedValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{lead.assignedToName}</span>
                        <span className="text-xs font-medium">{lead.probability}%</span>
                      </div>
                      {lead.nextFollowUp && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Follow up: {lead.nextFollowUp}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {leads.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">No leads</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
