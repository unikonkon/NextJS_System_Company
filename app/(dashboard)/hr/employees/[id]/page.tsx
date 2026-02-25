'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockEmployees } from '@/lib/mock/employees';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Building2, Calendar, CreditCard } from 'lucide-react';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employee = mockEmployees.find(e => e.id === params.id);

  if (!employee) {
    return <div className="p-8 text-center">Employee not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-80 shrink-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarFallback className="text-xl">{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{employee.firstName} {employee.lastName}</h2>
              <p className="text-muted-foreground">{employee.firstNameTh} {employee.lastNameTh}</p>
              <div className="flex gap-2 mt-2">
                <StatusBadge status={employee.role} />
                <StatusBadge status={employee.status} />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone || 'Not set'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {employee.startDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>{employee.bankName || 'Not set'} {employee.bankAccount || ''}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 min-w-0">
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div><p className="text-sm text-muted-foreground">Employee Code</p><p className="font-medium">{employee.employeeCode}</p></div>
                  <div><p className="text-sm text-muted-foreground">Position</p><p className="font-medium">{employee.position}</p></div>
                  <div><p className="text-sm text-muted-foreground">Employment Type</p><p className="font-medium">{employee.employmentType}</p></div>
                  <div><p className="text-sm text-muted-foreground">Nickname</p><p className="font-medium">{employee.nickname}</p></div>
                  <div><p className="text-sm text-muted-foreground">Salary</p><p className="font-medium">฿{employee.salary?.toLocaleString() || 'N/A'}</p></div>
                  <div><p className="text-sm text-muted-foreground">Start Date</p><p className="font-medium">{employee.startDate}</p></div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card><CardContent className="p-6"><p className="text-muted-foreground">Attendance history will be displayed here.</p></CardContent></Card>
            </TabsContent>
            <TabsContent value="leave" className="mt-4">
              <Card><CardContent className="p-6"><p className="text-muted-foreground">Leave history will be displayed here.</p></CardContent></Card>
            </TabsContent>
            <TabsContent value="payroll" className="mt-4">
              <Card><CardContent className="p-6"><p className="text-muted-foreground">Payroll history will be displayed here.</p></CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}