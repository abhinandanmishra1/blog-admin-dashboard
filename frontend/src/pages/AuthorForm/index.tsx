import './AuthorForm.css';

import { FaPlus, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useGetMetadataQuery, useUpdateAuthorMutation } from '../../hooks/useMetadata';

interface Achievement {
  title: string;
  description: string;
  link: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
  honors: string;
}

interface Social {
  twitter: string;
  github: string;
  linkedin: string;
  email: string;
}

interface Author {
  name: string;
  username: string;
  tagline: string;
  bio: string;
  avatar: string;
  achievements: Achievement[];
  experience: Experience[];
  education: Education[];
  social: Social;
}

export const AuthorForm: React.FC = () => {
  const [author, setAuthor] = useState<Author>({
    name: '',
    username: '',
    tagline: '',
    bio: '',
    avatar: '',
    achievements: [],
    experience: [],
    education: [],
    social: { twitter: '', github: '', linkedin: '', email: '' },
  });

  const { data: metadata } = useGetMetadataQuery();
  const { mutate: updateAuthor } = useUpdateAuthorMutation();

  useEffect(() => {
    if (metadata) {
      setAuthor(metadata.author);
    }
  }, [metadata]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthor(prev => ({ ...prev, social: { ...prev.social, [name]: value } }));
  };

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    setAuthor(prev => {
      const newAchievements = [...prev.achievements];
      newAchievements[index] = { ...newAchievements[index], [field]: value };
      return { ...prev, achievements: newAchievements };
    });
  };

  const addAchievement = () => {
    setAuthor(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', description: '', link: '' }],
    }));
  };

  const removeAchievement = (index: number) => {
    setAuthor(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    setAuthor(prev => {
      const newExperience = [...prev.experience];
      if (field === 'highlights') {
        newExperience[index] = { ...newExperience[index], highlights: value as string[] };
      } else {
        newExperience[index] = { ...newExperience[index], [field]: value as string };
      }
      return { ...prev, experience: newExperience };
    });
  };

  const addExperience = () => {
    setAuthor(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', period: '', highlights: [] }],
    }));
  };

  const removeExperience = (index: number) => {
    setAuthor(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setAuthor(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const addEducation = () => {
    setAuthor(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '', honors: '' }],
    }));
  };

  const removeEducation = (index: number) => {
    setAuthor(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthor(author);
  };

  return (
    <div className="author-form">
      <h1 className="page-title">Author Information</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={author.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={author.username} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" value={author.tagline} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={author.bio} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="avatar">Avatar URL</label>
            <input id="avatar" name="avatar" value={author.avatar} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Social Links</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input id="twitter" name="twitter" value={author.social.twitter} onChange={handleSocialChange} />
            </div>
            <div className="form-group">
              <label htmlFor="github">GitHub</label>
              <input id="github" name="github" value={author.social.github} onChange={handleSocialChange} />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input id="linkedin" name="linkedin" value={author.social.linkedin} onChange={handleSocialChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" value={author.social.email} onChange={handleSocialChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Achievements</h2>
            <button type="button" className="add-button" onClick={addAchievement}>
              <FaPlus /> Add Achievement
            </button>
          </div>
          {author.achievements.map((achievement, index) => (
            <div key={index} className="item-container">
              <div className="item-fields">
                <div className="form-group">
                  <label htmlFor={`achievement-title-${index}`}>Title</label>
                  <input
                    id={`achievement-title-${index}`}
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`achievement-description-${index}`}>Description</label>
                  <input
                    id={`achievement-description-${index}`}
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`achievement-link-${index}`}>Link</label>
                  <input
                    id={`achievement-link-${index}`}
                    value={achievement.link}
                    onChange={(e) => handleAchievementChange(index, 'link', e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeAchievement(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <button type="button" className="add-button" onClick={addExperience}>
              <FaPlus /> Add Experience
            </button>
          </div>
          {author.experience.map((exp, index) => (
            <div key={index} className="item-container">
              <div className="item-fields">
                <div className="form-group">
                  <label htmlFor={`experience-title-${index}`}>Title</label>
                  <input
                    id={`experience-title-${index}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`experience-company-${index}`}>Company</label>
                  <input
                    id={`experience-company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`experience-period-${index}`}>Period</label>
                  <input
                    id={`experience-period-${index}`}
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Highlights</label>
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="highlight-input-group">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...exp.highlights];
                          newHighlights[highlightIndex] = e.target.value;
                          handleExperienceChange(index, 'highlights', newHighlights);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newHighlights = exp.highlights.filter((_, i) => i !== highlightIndex);
                          handleExperienceChange(index, 'highlights', newHighlights);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newHighlights = [...exp.highlights, ''];
                      handleExperienceChange(index, 'highlights', newHighlights);
                    }}
                  >
                    Add Highlight
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeExperience(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
            <button type="button" className="add-button" onClick={addEducation}>
              <FaPlus /> Add Education
            </button>
          </div>
          {author.education.map((edu, index) => (
            <div key={index} className="item-container">
              <div className="item-fields">
                <div className="form-group">
                  <label htmlFor={`education-degree-${index}`}>Degree</label>
                  <input
                    id={`education-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`education-school-${index}`}>School</label>
                  <input
                    id={`education-school-${index}`}
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`education-year-${index}`}>Year</label>
                  <input
                    id={`education-year-${index}`}
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`education-honors-${index}`}>Honors</label>
                  <input
                    id={`education-honors-${index}`}
                    value={edu.honors}
                    onChange={(e) => handleEducationChange(index, 'honors', e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeEducation(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
