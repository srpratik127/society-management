import React, { useState } from 'react';
import notesData from '../../data/notesData.js';
import CreateNote from '../../components/models/CreateNote.js'; 
import EditNote from '../../components/models/EditNote.js'; 

const Note = () => {
  const [notes, setNotes] = useState(notesData);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedNote, setSelectedNote] = useState(null);
  const openCreateModal = () => {
    setIsModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsModalOpen(false);
  };
  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };
  const handleSaveEdit = (updatedNote) => {
    setNotes(notes.map(note => note.title === updatedNote.title ? updatedNote : note));
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Note</h1>
        <button
          onClick={openCreateModal} 
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
        >
          Create Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg overflow-hidden"
            onClick={() => openEditModal(note)} 
          >
            <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-medium">{note.title}</h2>
              <button className="text-white">
                <img src='/assets/3dots.svg' alt="Menu" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-black">Description:</p>
              {note.description}
            
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <CreateNote onClose={closeCreateModal} />}
      {isEditModalOpen && selectedNote && (
        <EditNote
          note={selectedNote}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Note;
