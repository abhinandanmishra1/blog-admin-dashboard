import {
  Author,
  Category,
  Series,
  SiteInfo,
  SiteMetadata,
  Tag,
} from "../types";

import { getAxios } from "../axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getMetadata = async () => {
  const axios = getAxios();
  const { data } = await axios.get(`${BASE_URL}/metadata`);
  return data;
};

export const createMetadata = async (metadata: SiteMetadata) => {
  const axios = getAxios();
  const { data } = await axios.post(`${BASE_URL}/metadata`, metadata);
  return data;
};

export const updateMetadata = async (metadata: SiteMetadata) => {
  const axios = getAxios();
  const { data } = await axios.put(`${BASE_URL}/metadata`, metadata);
  return data;
};

export const updateSiteInfo = async (siteInfo: SiteInfo) => {
  const axios = getAxios();
  const { data } = await axios.patch(`${BASE_URL}/metadata/siteinfo`, siteInfo);
  return data;
};

// UPDATE AUTHOR
// UPDATE TAGS
// UPDATE SERIES
// UPDATE CATEGORIES

export const updateAuthor = async (author: Author) => {
  const axios = getAxios();
  const { data } = await axios.patch(`${BASE_URL}/metadata/author`, author);
  return data;
};

export const updateTags = async (tags: Tag[]) => {
  const axios = getAxios();
  const { data } = await axios.patch(`${BASE_URL}/metadata/tags`, { tags });
  return data;
};

export const updateSeries = async (series: Series[]) => {
  const axios = getAxios();
  const { data } = await axios.patch(`${BASE_URL}/metadata/series`, series);
  return data;
};

export const updateCategories = async (categories: Category[]) => {
  const axios = getAxios();
  const { data } = await axios.patch(`${BASE_URL}/metadata/categories`, {
    categories,
  });
  return data;
};
