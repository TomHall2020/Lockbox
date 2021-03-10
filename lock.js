window.onload = function() {

  // Global constants for correct answer and code attempts
  const answer = "4718"
  let attempts = 0

  // Limit number inputs to 0-9 and wrap like a wheel
  let inputs = document.querySelectorAll(".digit");
  for (const el of inputs) {

    el.addEventListener("change", function() {
      if (this.value > 9) {
        this.value = "0";
        console.log('input changed for overflow')
      }
      if (this.value < 0) {
        this.value = "9";
        console.log('input changed for underflow')
      }
    })

    el.addEventListener("input", function(){
      if (this.value.length > 1 && this.value >0) {
        this.value = this.value.slice(-1);
      }
    })

  }

  // Control light button to show success or failure
  // Definitions
  const light = document.querySelector('#light')

  function toggleLight(status) {
    if (status == false) {
      light.classList.toggle("failure-light");
    } else {
      light.classList.toggle("success-light")
    }
  }

  // Event handler on form submission of code
  const codeForm = document.querySelector('#lock');
  codeForm.addEventListener('submit', event => {
    event.preventDefault();

    // Concat number inputs into string
    let code = ""
    for (const el of inputs) {
      code = code + el.value;
    }

    // Check number string against answer
    console.log(code);
    let status = Boolean(code == answer)

    // Show failure
    if (status == false) {
      attempts++;
      console.log("wrong code");
      console.log("Current no of attempts: " + attempts)
      toggleLight(status);

      if (attempts > 3) {
        console.log("temporary lockout")
        setTimeout(toggleLight, 4000, status);
        attempts = 0
      } else {
        setTimeout(toggleLight, 800, status);
      }
      resetFocus();
    }
    // show success
    else {
      console.log("correct code!");
      toggleLight(status);
      // TODO: reveal div with hidden info below
    }

  });

  // Function Move focus back to first input number
  function resetFocus() {
    document.querySelector(".digit").focus();
    document.querySelector(".digit").select();
  }

  // move focus when tabbing out from the enter button
  light.addEventListener("focus", function(){
    console.log("light focused");
    resetFocus();
  });

  // set focus on page load
  resetFocus();
}
