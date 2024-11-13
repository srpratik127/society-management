import React, { useState } from 'react';

const CreateProtocol = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  const isFormValid = title && description && !errors.title && !errors.description;
  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        if (!value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, title: 'Title is required.' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
        }
        break;
      case 'description':
        if (!value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, description: 'Description is required.' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
        }
        break;
      default:
        break;
    }
  };
  const handleBlur = (field, value) => {
    validateField(field, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newProtocol = {
        title,
        description,
      };
      onSave(newProtocol); 
      setTitle('');
      setDescription('');
      onClose(); 
    } else {
      validateField('title', title);
      validateField('description', description);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-[25px] shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Security Protocols</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => handleBlur('title', e.target.value)}
              className="w-full border p-2 rounded-[10px] mt-1"
              placeholder="Enter title"
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={(e) => handleBlur('description', e.target.value)}
              className="w-full border rounded-[10px] p-2 mt-1"
              placeholder="Enter description"
              required
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-white-300 border-[1px] font-semibold text-gray-700 w-[175px] py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`py-2 px-4 rounded-lg w-[175px] ${isFormValid ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white' : 'bg-[#F6F8FB] text-black'}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProtocol;