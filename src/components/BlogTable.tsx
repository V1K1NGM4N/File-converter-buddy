import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TableColumn {
  header: string;
  key: string;
  width?: string;
}

interface BlogTableProps {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: Record<string, any>[];
  className?: string;
}

export const BlogTable = ({ title, description, columns, data, className }: BlogTableProps) => {
  return (
    <div className={cn("my-8", className)}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-muted-foreground mb-4">{description}</p>}
      
      <div className="overflow-x-auto">
        <Table className="border border-border rounded-lg">
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  className="border border-border px-4 py-3 text-left font-semibold"
                  style={{ width: column.width }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/20">
                {columns.map((column) => (
                  <TableCell key={column.key} className="border border-border px-4 py-3">
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
