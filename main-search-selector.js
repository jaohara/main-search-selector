document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key === "/") {
    /*
      This predicate function needs to be more comprehensive - 
      
      - What are other ways for things to be marked as a searchbar?
      - Should I save the original, unfiltered array and use it for subsequent searches?
      - RE: above, I should probably only do further searches if this didn't work, right?
    */
    let target = Array.from(document.querySelectorAll('[class*="search"]'))
      .filter((item) => item.type === "search" || item.type === "text")[0];

    if (target === null || target === undefined) {
      console.log("Searching for inputs of type 'search'...");
      let allInputsArray = Array.from(document.getElementsByTagName("input"));

      target = allInputsArray.filter((item) => item.type === "search")[0];

      
      if (target === null || target === undefined) {
        console.log("Searching for aria-labels that contain 'search'...");
        target = allInputsArray.filter((item) => 
          item.getAttribute("aria-label") !== null 
          && item.getAttribute("aria-label").match(/search/i))[0];
      }
    }

    // strange bug on bbref - i think they manually clear the value on click.   

    if (target !== undefined && target !== null) {
      if (document.activeElement !== target) {
        target.value = "";
        target.focus();
      }
      else { 
        target.blur();
      }
    }
  }
});