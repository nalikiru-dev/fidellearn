'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResourcesPage = () => {
  const resources = [
    {
      title: 'Course Materials',
      description: 'Access all your course materials and study guides',
      icon: FileText,
    },
    {
      title: 'Downloads',
      description: 'Download lecture notes and assignments',
      icon: Download,
    },
    {
      title: 'External Resources',
      description: 'Links to additional learning materials',
      icon: ExternalLink,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Learning Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <resource.icon className="h-5 w-5" />
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{resource.description}</p>
              <Button className="mt-4 w-full">Access Resources</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
