import { createMetadata, getMetadata, updateAuthor, updateCategories, updateMetadata, updateSiteInfo, updateTags } from "../api/metadata";
import { useMutation, useQuery } from "react-query";

export const useCreateMetadataMutation = () => {
  return useMutation({
    mutationFn: createMetadata,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useUpdateMetadataMutation = () => {
  return useMutation({
    mutationFn: updateMetadata,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetMetadataQuery = () => {
  return useQuery({
    queryKey: ["metadata"],
    queryFn: getMetadata,
  });
};

export const useUpdateSiteInfoMutation = () => {
  return useMutation({
    mutationFn: updateSiteInfo,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// update tags
export const useUpdateTagsMutation = () => {
  return useMutation({
    mutationFn: updateTags,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// category
export const useUpdateCategoriesMutation = () => {
  return useMutation({
    mutationFn: updateCategories,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// author
export const useUpdateAuthorMutation = () => {
  return useMutation({
    mutationFn: updateAuthor,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

