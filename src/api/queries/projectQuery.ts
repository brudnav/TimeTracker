import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apiClient";

const CACHE_PROJECT = "CACHE_PROJECT";

const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const useGetProjects = () => {
  return useQuery({ queryKey: [CACHE_PROJECT], queryFn: getProjects });
};

const addProjects = async (project) => {
  const { data } = await api.post("/projects", { project });
  return data;
};

export const useAddProjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProjects,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_PROJECT] });
    },
  });
};
