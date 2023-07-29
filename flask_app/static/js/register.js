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

// adding event listeners


// function for displaying the 2nd form
form_1_next_btn.addEventListener("click", function(){
    form_1.style.display = "none"; /* hides first form when next is hit. */
    form_2.style.display = "block"; /*displays second form*/

    // hides form 1 buttons and shows form 2 buttons, back and next
    form_1_btns.style.display = "none";
    form_2_btns.style.display = "flex";

    // allows the 2nd progress circle to light up.
    form_2_progressbar.classList.add("active");
});

//function for going backwards once on the 2nd form
form_2_back_btn.addEventListener("click", function(){
    form_1.style.display = "block"; /* show first form when next is hit. */
    form_2.style.display = "none"; /*hide second form*/

    // shows form 1 buttons and hides form 2 buttons
    form_1_btns.style.display = "flex";
    form_2_btns.style.display = "none";

    // decrements progress bar
    form_2_progressbar.classList.remove("active");
});


//function for displaying the 3rd form
form_2_next_btn.addEventListener("click", function(){
    form_2.style.display = "none"; /* hides 2nd form when next is hit. */
    form_3.style.display = "block"; /* displays 3rd form*/

    // hides form 2 buttons and shows form 3 buttons, back and done
    form_2_btns.style.display = "none";
    form_3_btns.style.display = "flex";

    // allows the 2nd progress circle to light up.
    form_3_progressbar.classList.add("active");
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