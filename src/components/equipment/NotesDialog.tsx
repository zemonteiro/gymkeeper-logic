
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface NotesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  noteContent: string;
  setNoteContent: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}

const NotesDialog: React.FC<NotesDialogProps> = ({
  isOpen,
  onOpenChange,
  noteContent,
  setNoteContent,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Equipment Notes</DialogTitle>
          <DialogDescription>
            Add or update notes for this equipment
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Enter notes about this equipment..."
            className="min-h-[150px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Notes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
