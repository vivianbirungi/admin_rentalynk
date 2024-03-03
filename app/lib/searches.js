import instance from "../../config";

const getSearches = async () => {
  const response = await instance.get("get_search_results");
  return response.data;
};
