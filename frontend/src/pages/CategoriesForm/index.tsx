import "./CategoriesForm.css";

import { FaPlus, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  useGetMetadataQuery,
  useUpdateCategoriesMutation,
} from "../../hooks/useMetadata";

import { Category } from "../../types";
import { IconSelector } from '../../components/IconSelector';

function hexToRgb(hex: string) {
  let r = parseInt(hex.substring(1, 3), 16);

  let g = parseInt(hex.substring(3, 5), 16);

  let b = parseInt(hex.substring(5, 7), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb: string) {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const CategoriesForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: metadata } = useGetMetadataQuery();
  const { mutate: updateCategories } = useUpdateCategoriesMutation();
  useEffect(() => {
    if (metadata) {
      setCategories(metadata.categories);
    }
  }, [metadata]);

  const handleCategoryChange = (
    index: number,
    field: keyof Category,
    value: string
  ) => {
    if (field === "color") {
      console.log(field, value);
    }
    setCategories((prev) => {
      const newCategories = [...prev];
      newCategories[index] = { ...newCategories[index], [field]: value };
      return newCategories;
    });
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        icon: "",
        title: "",
        description: "",
        color: "",
        tag: "",
        coverImage: "",
      },
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateCategories(categories);
  };

  return (
    <div className="categories-form">
      <h1 className="page-title">Categories</h1>
      <form onSubmit={handleSubmit} className="form">
        {categories.map((category, index) => (
          <div key={index} className="category-item" data-index={index + 1}>
            <div className="category-fields">
              <div className="form-group">
                <label htmlFor={`icon-${index}`}>Icon</label>
                <IconSelector
                  selectedIcon={category.icon}
                  onIconSelect={(iconName) => handleCategoryChange(index, "icon", iconName)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`title-${index}`}>Title</label>
                <input
                  id={`title-${index}`}
                  value={category.title}
                  onChange={(e) =>
                    handleCategoryChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <input
                  id={`description-${index}`}
                  value={category.description}
                  onChange={(e) =>
                    handleCategoryChange(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`color-${index}`}>Color</label>
                <input
                  id={`color-${index}`}
                  type="color"
                  className="color-picker"
                  value={rgbToHex(category.color)}
                  onChange={(e) =>
                    handleCategoryChange(
                      index,
                      "color",
                      hexToRgb(e.target.value)
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`tag-${index}`}>Tag</label>
                <input
                  id={`tag-${index}`}
                  value={category.tag}
                  onChange={(e) =>
                    handleCategoryChange(index, "tag", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`coverImage-${index}`}>Cover Image</label>
                <input
                  id={`coverImage-${index}`}
                  value={category.coverImage}
                  onChange={(e) =>
                    handleCategoryChange(index, "coverImage", e.target.value)
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeCategory(index)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={addCategory}>
          <FaPlus /> Add Category
        </button>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
