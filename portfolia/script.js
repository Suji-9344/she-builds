let form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;<br></br>
    let email = document.getElementById("email").value;<br></br>
    let message = document.getElementById("message").value;<br></br>

    if (name == "" || email == "" || message == "") {

        alert("Please fill all the fields.");

    } else {

        alert("Thank you " + name + "! Message sent.");

        form.reset();

    }

});