import instance from "../../config";

const getSearches = async () => {
  const response = await instance.get("get_searches");
  return response.data;
};
