// making variables for the forms and the buttons
var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");

var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");

var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");

var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");

var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");

var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");

var form_2_progressbar = document.querySelector(".form_2_progressbar")

var form_3_progressbar = document.querySelector(".form_3_progressbar")

var done_btn = document.querySelector(".btn_done")

// adding event listeners


// function for displaying the 2nd form
form_1_next_btn.addEventListener("click", function(){
    if (validateForm(1)) {
        form_1.style.display = "none"; /* hides first form when next is hit. */
        form_2.style.display = "block"; /*displays second form*/
    
        // hides form 1 buttons and shows form 2 buttons, back and next
        form_1_btns.style.display = "none";
        form_2_btns.style.display = "flex";
    
        // allows the 2nd progress circle to light up.
        form_2_progressbar.classList.add("active");
        currentForm = form_2;
    } else {
        alert("Validation failed");
    }
});

//function for going backwards once on the 2nd form
form_2_back_btn.addEventListener("click", function(){
    if (validateForm(2)) {
    form_1.style.display = "block"; /* show first form when next is hit. */
    form_2.style.display = "none"; /*hide second form*/

    // shows form 1 buttons and hides form 2 buttons
    form_1_btns.style.display = "flex";
    form_2_btns.style.display = "none";

    // decrements progress bar
    form_2_progressbar.classList.remove("active");
    } else {
    alert("Validation failed");
    }
});


//function for displaying the 3rd form
form_2_next_btn.addEventListener("click", function(){
    if (validateForm(2)) {
    form_2.style.display = "none"; /* hides 2nd form when next is hit. */
    form_3.style.display = "block"; /* displays 3rd form*/

    // hides form 2 buttons and shows form 3 buttons, back and done
    form_2_btns.style.display = "none";
    form_3_btns.style.display = "flex";

    // allows the 2nd progress circle to light up.
    form_3_progressbar.classList.add("active");
    } else {
        alert("Validation failed")
    }
});

//function for going backwards once on the 3rd form.
form_3_back_btn.addEventListener("click", function(){
    form_2.style.display = "block"; /* show second form when back is hit. */
    form_3.style.display = "none"; /*hide third form*/

    // shows form 1 buttons and hides form 2 buttons
    form_2_btns.style.display = "flex";
    form_3_btns.style.display = "none";

    // decrements progress bar
    form_3_progressbar.classList.remove("active");
});

let currentForm = form_1;

//using AJAX to handle form submission
done_btn.addEventListener("click", function(){
    if (validateForm(currentForm)) {
        //serialize form data
        const formData = new FormData(document.getElementById("registration_form"));

        //Perform AJAX form submission using fetch API
        fetch("/submit_registration", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.")
            }
            return response.json();
        })
        .then(data => {
            //handle success response. eventually you need to re-route
            alert("REGISTRATION SUCCESS.")
        })
        .catch(error => {
            //handle failure response. re-route to sign up page.
            alert("REGISTRATION FAILED.")
        })
    }
})

function validateForm(currentForm) {
    //target the inputs
    const emailInput = document.querySelector('input[name="email"]');
    const usernameInput = document.querySelector('input[name="username"]');
    
    const firstNameInput = document.querySelector('input[name="first_name"]');
    const lastNameInput = document.querySelector('input[name="last_name"]');

    //get the actual value of the inputs
    const emailValue = emailInput.value.trim();
    const usernameValue = usernameInput.value.trim();

    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    //clear previous error messages
    const emailErrors = document.getElementById('email-errors');
    const usernameErrors = document.getElementById('username-errors')
    const firstNameErrors = document.getElementById('first-name-errors');
    const lastNameErrors = document.getElementById('last-name-errors');
    firstNameErrors.textContent = '';
    lastNameErrors.textContent = '';
    emailErrors.textContent = '';
    usernameErrors.textContent = '';

    //validations
    let isValid = true;

    if (currentForm == 1) {
        if (usernameValue.length < 2) {
            usernameErrors.textContent = "**Username must have at least 2 characters!";
            document.querySelector(".error-container").style.display = 'block'; 
            isValid = false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(emailValue) == false) {
            emailErrors.textContent = "**Email must follow the following format: example@example.com";
            document.querySelector(".error-container").style.display = 'block'; 
            isValid = false;
        }
    } else if (currentForm == 2) {
        if (firstNameValue.length < 2) {
            firstNameErrors.textContent = "**First name must have at least 2 characters!";
            document.querySelector(".error-container").style.display = 'block'; 
            isValid = false;
        }

        if (/[\d]/.test(firstNameValue)) {
            firstNameErrors.textContent += "**First name must not have any numbers!";
            isValid = false;
        }
    }
    
    return isValid;
}
