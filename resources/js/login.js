import './bootstrap';
import 'flowbite';
import 'leaflet/dist/leaflet.css';
import jQuery from 'jquery';
window.$ = jQuery

const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

$('#signup').on('click', function () {
    var username = $('#suUsername').val();
    var password = $('#suPassword').val();
    var email = $('#suEmail').val();
    var firstname = $('#suFirstname').val();
    var lastname = $('#suLastname').val();

    $.ajax({
        url: '/api/login',
        method: 'post',
        dataType: 'json',
        data:{
            username: username,
            password: password,
        },
        success: function(response){
            var login_id = response.id
            if (response){
                console.log(response)
                $.ajax({
                    url: '/api/users',
                    method: 'post',
                    dataType: 'json',
                    data:{
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        login_id: login_id
                    },
                    success: function(response){
                        console.log(response)
                    }
                })
            }

        },error: function (xhr, status) {
            console.log(xhr, status);
        }
    })
    console.log(username, password, email, firstname, lastname, login_id)
})