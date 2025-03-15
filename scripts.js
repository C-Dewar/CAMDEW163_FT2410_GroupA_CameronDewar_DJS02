const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  //Checking for missing values
  if (!dividend || !divider) {
    result.innerText =
      "Division not performed. Both values are required in inputs. Try again";
    return;
  }

  //Checking if the inputs are both numbers and then parsing them to numbers (initial input is a string due to form format)

  const dividendNumber = Number(dividend);
  const dividerNumber = Number(divider);

  if (isNaN(dividendNumber) || isNaN(dividerNumber)) {
    //Checks if either number isNaN, to ensure no non-numeric values are entered
    document.body.innerHTML =
      "<h1>Something critical went wrong. Please reload the page</h1>";
    //Made use of document.body.innerHTML to ensure the entire page/content was replaced with the message, and then used the h1 tags to ensure the text was large/legible.
    console.error("Error: Non-numeric input entered"); //Log the error to the console with the appropriate identifier.
    return;
  }

  //Handling division by zero
  if (dividerNumber === 0) {
    result.innerText =
      "Division not performed. Invalid number provided. Try again";
    console.error("Error: Division by zero");
    return;
  }

  //Performing Division
  const resultValue = dividendNumber / dividerNumber;

  //Checking if the result is a whole number (integer) or contains a decimal

  if (Number.isInteger(resultValue)) {
    result.innerText = resultValue; //Whole number division occurs when the resultNumber is an integer
  } else if (resultValue > 0) {
    result.innerText = Math.floor(resultValue); // Math.floor function used to round down to the nearest integer when the resultValue is a positive decimal. i.e. 6.7777777 to 6.
  } else {
    result.innerText = Math.trunc(resultValue); //Math.trunc function used when result is a negative to avoid the answer rounding "down" i.e from -6.77777 to -7 when it should instead be -6. Trunc removes the decimal places, making it -6 instead as it should be.
  }
});
