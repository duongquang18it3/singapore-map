import React from "react";
import { Hits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";

import HitLrt from "../../lib/HitLrt.js";

export default connectStateResults(({ searchState, searchResults }) =>
  searchResults && searchResults.nbHits !== 0 ? (
    <>
      <Hits hitComponent={HitLrt}  />
      
    </>
  ) : (
    <div>
      No results found for <strong>{searchState.query}</strong>.
    </div>
  )
);
