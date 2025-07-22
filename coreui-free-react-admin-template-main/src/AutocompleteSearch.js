// // AutocompleteSearch.js
// import React, { useState } from 'react';
// import Autosuggest from 'react-autosuggest';
// // import './style.css'; // Import CSS file for custom styling
// // import './scss/style.scss'
// const AutocompleteSearch = ({data,getValue}) => {
//   const [value, setValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   // Mock data for suggestions
// const languages = Array.isArray(data) ? data.map((item) => item.name) : [];

//   const getSuggestions = (inputValue) => {
//   const input = inputValue.trim().toLowerCase();
//   return languages.filter((language) =>
//     language.toLowerCase().startsWith(input)
//   );
// };


//   const onSuggestionsFetchRequested = ({ value }) => {
//     setSuggestions(getSuggestions(value));
//   };

//   const onSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   const onChange = (event, { newValue }) => {
//     setValue(newValue);
//     getValue && getValue(newValue);

//   };

//   const getSuggestionValue = (suggestion) => suggestion;

//   const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

//   const inputProps = {

//     value,
//     onChange
//   };

//   // Custom theme for styling
//   const theme = {
//     container: 'autocomplete-container',
//     suggestionsContainer: 'suggestions-container',
//     suggestion: 'suggestion',
//     suggestionHighlighted: 'suggestion-highlighted',
//     input: 'autocomplete-input'
//   };

//   return (
//     <Autosuggest
//       suggestions={suggestions}
//       onSuggestionsFetchRequested={onSuggestionsFetchRequested}
//       onSuggestionsClearRequested={onSuggestionsClearRequested}
//       getSuggestionValue={getSuggestionValue}
//       renderSuggestion={renderSuggestion}
//       inputProps={inputProps}
//       theme={theme} // Apply custom theme for styling
//     />
//   );
// };

// export default AutocompleteSearch;


import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutocompleteSearch = ({ data = [], getValue }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Filter full objects based on name startsWith
  const getSuggestions = (inputValue) => {
    const input = inputValue.trim().toLowerCase();
    return data.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // 👇 This fires when a suggestion is selected
  const onSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion)
    if (getValue) {
      getValue(suggestion); // full object returned
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const inputProps = {
    value,
    onChange,
  };

  const theme = {
    container: 'autocomplete-container',
    suggestionsContainer: 'suggestions-container',
    suggestion: 'suggestion',
    suggestionHighlighted: 'suggestion-highlighted',
    input: 'autocomplete-input',
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
      onSuggestionSelected={onSuggestionSelected} // important
    />
  );
};

export default AutocompleteSearch;
