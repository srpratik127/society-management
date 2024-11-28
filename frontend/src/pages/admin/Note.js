import React, { useEffect, useState } from "react";
import CreateNote from "../../components/models/CreateNote.js";
import EditNote from "../../components/models/EditNote.js";
import { Popover } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/api/notes`
        );
        setNotes(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-6 m-4 bg-white rounded-lg">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-semibold">Note</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg"
        >
          Create Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
                <h2 className="text-lg font-medium capitalize">{note.title}</h2>

                <Popover className="relative">
                  <Popover.Button className="outline-none">
                    <img src="/assets/3dots.svg" alt="options" />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0  w-32 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setSelectedNote(note);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </Popover.Panel>
                </Popover>
              </div>
              <div className="p-4">
                <p className="text-[#4F4F4F]">Description:</p>
                {note.description}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-full">
            <p className="text-gray-500 text-center select-none">
              No Data found.
            </p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CreateNote onClose={() => setIsModalOpen(false)} setNotes={setNotes} />
      )}
      {isEditModalOpen && (
        <EditNote
          note={selectedNote}
          onClose={() => setIsEditModalOpen(false)}
          setNotes={setNotes}
        />
      )}
    </div>
  );
};

export default Note;
