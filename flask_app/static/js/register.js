// making variables for the forms and the buttons
var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");

var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");

var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_1_error_container = document.querySelector(".form_1 .error-container");

var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_2_error_container = document.querySelector(".form_2 .error-container-2")

var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");

var form_3_error_container = document.querySelector(".form_3 .error-container-3")
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
        form_2_error_container.style.display = "none"; //hides 2nd form error container, important because user may have gone back to form 1.

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
    form_1.style.display = "block"; /* show first form when next is hit. */
    form_2.style.display = "none"; /*hide second form*/
    form_1_error_container.style.display = "none";

    // shows form 1 buttons and hides form 2 buttons
    form_1_btns.style.display = "flex";
    form_2_btns.style.display = "none";

    // decrements progress bar
    form_2_progressbar.classList.remove("active");
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
    form_2_error_container.style.display = "none";

    // shows form 1 buttons and hides form 2 buttons
    form_2_btns.style.display = "flex";
    form_3_btns.style.display = "none";

    // decrements progress bar
    form_3_progressbar.classList.remove("active");
});

let currentForm = form_1;

function validateForm(currentForm) {
    //target the inputs
    const emailInput = document.querySelector('input[name="email"]');
    const usernameInput = document.querySelector('input[name="username"]');
    
    const firstNameInput = document.querySelector('input[name="first_name"]');
    const lastNameInput = document.querySelector('input[name="last_name"]');

    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');

    //get the actual value of the inputs
    const emailValue = emailInput.value.trim();
    const usernameValue = usernameInput.value.trim();

    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();

    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    //clear previous error messages
    const emailErrors = document.getElementById('email-errors');
    const usernameErrors = document.getElementById('username-errors')

    const firstNameErrors = document.getElementById('first-name-errors');
    const lastNameErrors = document.getElementById('last-name-errors');

    const passwordErrors = document.getElementById('password-errors');
    firstNameErrors.textContent = '';
    lastNameErrors.textContent = '';
    emailErrors.textContent = '';
    usernameErrors.textContent = '';
    passwordErrors.textContent= '';


    //validations
    let isValid = true;

    if (currentForm == 1) {

// Check for spaces at the beginning or end
        let isUsernameValid = true;

        // Check for at least 2 characters
        if (isUsernameValid && usernameValue.length < 2) {
            usernameErrors.textContent = "**Username must have at least 2 characters!";
            isUsernameValid = false;
        }

        // Check for maximum of 2 underscores
        if (isUsernameValid && (usernameValue.match(/_/g) || []).length > 2) {
            usernameErrors.textContent = "**Username can have a maximum of 2 underscores!";
            isUsernameValid = false;
        }

        // Check for spaces within username
        if (isUsernameValid && usernameValue.includes(' ')) {
            usernameErrors.textContent = "**Username cannot contain spaces!";
            isUsernameValid = false;
        }

        // Check for allowed characters
        if (isUsernameValid && !/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
            usernameErrors.textContent = "**Username can only contain letters, numbers, and underscores!";
            isUsernameValid = false;
        }

        if (!isUsernameValid) {
            document.querySelector(".error-container").style.display = 'block'; 
            isValid = false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailValue)) {
            emailErrors.textContent = "**Email must follow the following format: example@example.com.";
            document.querySelector(".error-container").style.display = 'block'; 
            isValid = false;
        }
    } else if (currentForm == 2) {
        let isFirstNameValid = true;
        let isLastNameValid = true;
        
        if (firstNameValue.length < 2) {
            firstNameErrors.textContent = "**First name must have at least 2 characters!";
            isFirstNameValid = false;
        } else if (!/^[a-zA-Z]+$/.test(firstNameValue)) {
            firstNameErrors.textContent += "**First name must only contain letters!";
            isFirstNameValid = false;
        }

        if(!isFirstNameValid) {
            document.querySelector(".error-container-2").style.display = 'block'; 
            isValid = false;
        }

        if (lastNameValue.length < 2) {
            lastNameErrors.textContent = "**Last name must have at least 2 characters!";
            isLastNameValid = false;
        } else if (!/^[a-zA-Z]+$/.test(lastNameValue)) {
            lastNameErrors.textContent += "**Last name must only contain letters!";
            isLastNameValid = false;
        }

        if(!isLastNameValid) {
            document.querySelector(".error-container-2").style.display = 'block'; 
            isValid = false;
        }
    } else if (currentForm == 3) {
        let isPasswordValid = true;

        if (passwordValue.length < 9) {
            passwordErrors.textContent += "**Password must be at least 8 characters long!\n";
            isPasswordValid = false;
        }

        if (!/\d/.test(passwordValue)) {
            passwordErrors.textContent += "**Password must contain at least 1 number!\n";
            isPasswordValid = false;
        }

        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue)) {
            passwordErrors.textContent += "**Password must contain at least 1 special character!\n";
            isPasswordValid = false;
        }

        if (passwordValue !== confirmPasswordValue) {
            passwordErrors.textContent += "**Password and confirm password fields do not match!\n"
            isPasswordValid = false;
        }

        if (!isPasswordValid) {
            document.querySelector(".error-container-3").style.display = 'block';
            isValid = false;
        }

    }
    
    return isValid;
}
