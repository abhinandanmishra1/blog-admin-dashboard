import './SeriesForm.css';

import { FaPlus, FaTrash } from 'react-icons/fa';
import React, {useState} from 'react';

import axios from 'axios';

interface Series {
  title: string;
  description: string;
  coverImage: string;
}

export const SeriesForm: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([])
  const handleSeriesChange = (index: number, field: keyof Series, value: string) => {
    setSeries(prev => {
      const newSeries = [...prev];
      newSeries[index] = { ...newSeries[index], [field]: value };
      return newSeries;
    });
  };

  const addSeries = () => {
    setSeries(prev => [...prev, { title: '', description: '', coverImage: '' }]);
  };

  const removeSeries = (index: number) => {
    setSeries(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/metadata/series', series, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Series updated successfully');
    } catch (error) {
      console.error('Error updating series:', error);
    }
  };

  return (
    <div className="series-form">
      <h1 className="page-title">Series</h1>
      <form onSubmit={handleSubmit} className="form">
        {series.map((item, index) => (
          <div key={index} className="series-item">
            <div className="series-fields">
              <div className="form-group">
                <label htmlFor={`title-${index}`}>Title</label>
                <input
                  id={`title-${index}`}
                  value={item.title}
                  onChange={(e) => handleSeriesChange(index, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) => handleSeriesChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`coverImage-${index}`}>Cover Image</label>
                <input
                  id={`coverImage-${index}`}
                  value={item.coverImage}
                  onChange={(e) => handleSeriesChange(index, 'coverImage', e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeSeries(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={addSeries}>
          <FaPlus /> Add Series
        </button>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
