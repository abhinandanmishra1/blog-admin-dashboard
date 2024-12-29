import './TagsForm.css';

import { FaPlus, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useGetMetadataQuery, useUpdateTagsMutation } from '../../hooks/useMetadata';

import { Tag } from '../../types/metadata';

export const TagsForm: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const { data: metadata } = useGetMetadataQuery();
  const { mutate: updateTags } = useUpdateTagsMutation();

  useEffect(() => {
    if (metadata) {
      setTags(metadata.tags);
    }
  }, [metadata]);

  const handleTagChange = (index: number, field: keyof Tag, value: string) => {
    setTags(prev => {
      const newTags = [...prev];
      newTags[index] = { ...newTags[index], [field]: value };
      return newTags;
    });
  };

  const addTag = () => {
    setTags(prev => [...prev, { name: '', description: '', slug: '' }]);
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateTags(tags);
  };

  return (
    <div className="tags-form">
      <h1 className="page-title">Tags</h1>
      <form onSubmit={handleSubmit} className="form">
        {tags.map((tag, index) => (
          <div key={index} className="tag-item">
            <div className="tag-fields">
              <div className="form-group">
                <label htmlFor={`name-${index}`}>Name</label>
                <input
                  id={`name-${index}`}
                  value={tag.name}
                  onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <input
                  id={`description-${index}`}
                  value={tag.description}
                  onChange={(e) => handleTagChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`slug-${index}`}>Slug</label>
                <input
                  id={`slug-${index}`}
                  value={tag.slug}
                  onChange={(e) => handleTagChange(index, 'slug', e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeTag(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={addTag}>
          <FaPlus /> Add Tag
        </button>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
