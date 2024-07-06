import { useQuery } from "react-query";
import { getProject, getProjects, getViewProject } from "../api/apiCalls";
const token = localStorage.getItem("token");
export const useProjects = ({ userId }) => {
  const result = useQuery(["projects", token, userId], () =>
    getProjects({ token, userId })
  );
  return result;
};

export const useProject = ({ id }) => {
  console.log("query called");
  const result = useQuery(["project", id], () => getProject({ token, id }));
  console.log("result:", result);
  return result;
};

export const useViewProject = ({ id }) => {
  const result = useQuery(["project", id], () => getViewProject({ id }));
  return result;
};
