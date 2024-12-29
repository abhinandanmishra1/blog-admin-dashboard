import './SiteInfoForm.css';

import React, { useEffect, useState } from 'react';
import { useGetMetadataQuery, useUpdateSiteInfoMutation } from '../../hooks/useMetadata';

import { SiteInfo } from '../../types';

export const SiteInfoForm: React.FC = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    title: '',
    description: '',
    siteUrl: '',
  });

  const { data: metadata } = useGetMetadataQuery();
  const { mutate: updateMetadata } = useUpdateSiteInfoMutation();
  
  useEffect(() => {
    if (metadata) {
      setSiteInfo({
        title: metadata.title,
        description: metadata.description,
        siteUrl: metadata.siteUrl,
      });
    }
  }, [metadata]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMetadata(siteInfo);
  };

  return (
    <div className="site-info">
      <h1 className="page-title">Site Information</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Site Title</label>
          <input
            id="title"
            name="title"
            value={siteInfo.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={siteInfo.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="siteUrl">Site URL</label>
          <input
            id="siteUrl"
            name="siteUrl"
            value={siteInfo.siteUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
