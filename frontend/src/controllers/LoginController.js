import LoginModel from "../models/LoginModel.js";
import LoginService from "../services/LoginService.js";

const form = document.querySelector('#login_form');
const login_button = document.querySelector('#login_button');
const register_button = document.querySelector('#register_button');


login_button.addEventListener('click', async(event) => {
    event.preventDefault();
    
    const username = form.username_input.value;
    const password = form.password_input.value;

    if(username != '' && password != '') {
        try {
            const LoginService1 = new LoginService(new LoginModel(username, password));
            const response = await LoginService1.handleLogin();
            if(response.auth == true) {
                // redirect to task management
                window.location.href = './tasks.html';
            } 
        } catch(error) {
            window.alert(error.message);
            throw new Error(error.message);
        }
    } else {
        window.alert('Check if you filled in the username and password fields correctly and try again!');
    }

});


register_button.addEventListener('click', async(event) => {
    event.preventDefault();

    const username = form.querySelector('#username_input').value;
    const password = form.querySelector('#password_input').value;

    if(username != '' && password != '') {
        try {
            const LoginService2 = new LoginService(new LoginModel(username, password));
            const newUser = await LoginService2.handleRegister();

            if(newUser) {
                window.alert(`New user registered with success!`);
            }

        } catch(error) {
            window.alert(error.message);
            throw new Error(error.message);
        }
    } else {
        window.alert('Check if you filled in the username and password fields correctly and try again!');
    }

});

