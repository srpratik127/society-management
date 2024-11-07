import React from 'react';

const notes = [
  { title: 'Rent or Mortgage', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Housing Costs', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Property Taxes', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Maintenance Fees', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Rent or Transportation', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Breakdown', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Expense Tracker', description: 'A visual representation of your spending categories visual representation.' },
  { title: 'Personal Expenses', description: 'A visual representation of your spending categories visual representation.' },
];

const Note = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Note</h1>
        <button className="bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-2 px-4 rounded-lg">Create Note</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {notes.map((note, index) => (
          <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-[#5678E9] text-white px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-medium">{note.title}</h2>
              <button className="text-white">
              <img src='/assets/3dots.svg'/>
               
              </button>
            </div>
            <div className="p-4">
               Description
              <p className="text-gray-600" > des{note.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
