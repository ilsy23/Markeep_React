import React, { useRef } from "react";
import Select from "react-select";
import { colors, customStyles } from "../styles/customStyles";

const useSelct = (placeholder, handleChange, input) => {
  const selectRef = useRef();

  return (
    //   openMenuOnFocus={false}
    //   openMenuOnClick={false}
    <div>
      <Select
        id="select"
        ref={selectRef}
        isClearable={true}
        isSearchable={true}
        menuIsOpen={false}
        defaultValue={input}
        placeholder={placeholder}
        onChange={handleChange}
        maxMenuHeight={"160px"}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,

            neutral20: "rgba(187, 180, 254, 0.4)",
            primary: colors.purple,
            neutral80: colors.white,
            neutral60: colors.blue,
          },
        })}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default useSelct;
