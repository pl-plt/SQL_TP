

function verify_user_not_in_DB() {
    const user = document.getElementById("username").value; // Declare the user object with a unique identifier

    console.log("test")

    // Assuming you have a user object with a unique identifier
    if (user) {
        // Check if the user exists in the database
        if (checkUserExists(user)) {
            console.log("User already exists in the database");
        } else {
            console.log("User does not exist in the database");
        }
    } else {
        console.log("Invalid user object");
    }
}
function checkUserExists(username) {
    // Assuming you have a MongoDB connection and a collection named "users"
    const collection = db.collection("users");

    // Check if a document with the given username exists in the collection
    const user = collection.findOne({ username });

    return user !== null;
}

function check_password_the_same() {
    const password = document.getElementById("password").value;
    const passwordVerify = document.getElementById("password_verify").value;

    const err_message = document.getElementById("error_register")

    if (password === passwordVerify) {
        console.log("Passwords match");
        err_message.innerText = "";
        document.getElementById("submit_button").disabled = false;
        document.getElementById("submit_button").style.cursor = "pointer";

    } else {
        console.log("Passwords do not match");
        err_message.innerText = "Passwords do not match";
        document.getElementById("submit_button").disabled = true;
        document.getElementById("submit_button").style.cursor = "not-allowed";
    }
}

function writeRequest(request) {
    const requestToSubmit = document.getElementById("dbRequest");
    requestToSubmit.value = request;
}