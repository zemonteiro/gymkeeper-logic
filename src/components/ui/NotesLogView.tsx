
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Note {
  id: string;
  itemName: string;
  content: string;
  date: string;
}

interface NotesLogViewProps {
  title: string;
  notes: Note[];
  emptyMessage?: string;
}

const NotesLogView = ({ title, notes, emptyMessage = "No notes found." }: NotesLogViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNotes = notes.filter(note => 
    note.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="shadow-subtle">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gym-muted h-4 w-4" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-medium">{note.itemName}</TableCell>
                    <TableCell className="max-w-xs truncate">{note.content}</TableCell>
                    <TableCell>{note.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-gym-muted">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesLogView;
