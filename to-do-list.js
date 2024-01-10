const users = [
    { username: "user1", password: "password1", firstName: "John", lastName: "Doe", age: 25, location: "City1" },
    { username: "user2", password: "password2", firstName: "Jane", lastName: "Smith", age: 30, location: "City2" }
];


let currentUser = null;
const tasks = [];


function showRegisterForm() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
}


function showLoginForm() {
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
}


function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");


    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();


    const user = users.find(u => u.username === username && u.password === password);


    if (user) {
        currentUser = user;
        showTodoContainer();
    } else {
        alert("Invalid username or password. Please try again.");
    }


    // Clear input fields
    usernameInput.value = "";
    passwordInput.value = "";
}


function register() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const ageInput = document.getElementById("age");
    const locationInput = document.getElementById("location");
    const newUsernameInput = document.getElementById("newUsername");
    const newPasswordInput = document.getElementById("newPassword");


    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const age = parseInt(ageInput.value, 10);
    const location = locationInput.value.trim();
    const newUsername = newUsernameInput.value.trim();
    const newPassword = newPasswordInput.value.trim();


    if (
        firstName === "" ||
        lastName === "" ||
        isNaN(age) ||
        age <= 0 ||
        location === "" ||
        newUsername === "" ||
        newPassword === ""
    ) {
        alert("Please enter valid registration details.");
        return;
    }


    // Check if the username is already taken
    if (users.some(u => u.username === newUsername)) {
        alert("Username already exists. Please choose a different username.");
        return;
    }


    // Add the new user
    const newUser = {
        username: newUsername,
        password: newPassword,
        firstName: firstName,
        lastName: lastName,
        age: age,
        location: location
    };
    users.push(newUser);


    // Automatically log in the new user
    currentUser = newUser;
    showTodoContainer();


    // Clear input fields
    firstNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";
    locationInput.value = "";
    newUsernameInput.value = "";
    newPasswordInput.value = "";
}


function logout() {
    currentUser = null;
    showLoginForm();
}


function showTodoContainer() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("todoContainer").style.display = "block";
    displayTasks();
}


function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();


    if (taskDescription !== "") {
        const newTask = { description: taskDescription, done: false };
        tasks.push(newTask);
        taskInput.value = "";
        displayTasks();
    }
}


function displayTasks(filteredTasks = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";


    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => toggleTaskStatus(index));


        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(task.description));
        taskList.appendChild(listItem);
    });
}


function toggleTaskStatus(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks();
}


function filterTasks() {
    const filterSelect = document.getElementById("filterSelect");
    const filterValue = filterSelect.value;


    let filteredTasks = [];


    if (filterValue === "completed") {
        filteredTasks = tasks.filter(task => task.done);
    } else if (filterValue === "incomplete") {
        filteredTasks = tasks.filter(task => !task.done);
    } else {
        filteredTasks = tasks;
    }


    displayTasks(filteredTasks);
}