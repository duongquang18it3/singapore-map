import algoliaSearch from "algoliasearch";

const indexNameSchool = process.env.REACT_APP_ALGOLIA_INDEX_NAME as string;
const indexNameMrt = process.env.REACT_APP_ALGOLIA_INDEX_NAME_MRT as string;
const searchClient = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID as string,
  process.env.REACT_APP_ALGOLIA_API_KEY as string
);
console.log(indexNameSchool);
console.log(indexNameMrt);
console.log(searchClient);
export { indexNameSchool, searchClient };
