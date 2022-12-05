import React, {  } from "react";
import { DebounceInput } from "react-debounce-input";
import { MdSearch } from "react-icons/md";

type searchProps = {
  inputPlaceholder: string;
  searchKey: string | undefined;
  handleChangeSearchKey: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  hasDebounce?: boolean
};

export const Search = ({
  inputPlaceholder,
  searchKey,
  handleChangeSearchKey,
  minLength,
  hasDebounce = true,
}: searchProps): JSX.Element => {
  return (
    <>
      <div className="control has-icons-left">
        <DebounceInput
          debounceTimeout={hasDebounce ? 300 : 0}
          onChange={handleChangeSearchKey}
          placeholder={inputPlaceholder}
          className="input is-rounded"
          value={searchKey}
          minLength={minLength}
        />

        <span className="icon is-left">
          <MdSearch />
        </span>
      </div>
    </>
  );
};
