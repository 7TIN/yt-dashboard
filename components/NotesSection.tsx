"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NotesSection() {
  const [notes, setNotes] = useState<{ id: number; content: string }[]>([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // In a real app, you would fetch these from your database
  useEffect(() => {
    const savedNotes = localStorage.getItem("yt-dashboard-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleAddNote = () => {
    const updatedNotes = [...notes, { id: Date.now(), content: newNote }];
    setNotes(updatedNotes);
    localStorage.setItem("yt-dashboard-notes", JSON.stringify(updatedNotes));
    setNewNote("");
  };

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("yt-dashboard-notes", JSON.stringify(updatedNotes));
  };


  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Jot down some ideas..."
            />
            <Button onClick={handleAddNote} className="mt-2">Add Note</Button>
          </div>
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            {filteredNotes.map((note) => (
              <div key={note.id} className="flex justify-between items-center border p-2 rounded">
                <p>{note.content}</p>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}