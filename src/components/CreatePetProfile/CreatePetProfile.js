import React, { useState } from "react";
import "./CreatePetProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../constants";

function CreatePetProfile() {
const [repass, setRepass] = useState("");
const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    staff : false,
    shelter : ''
});
function handleChange(event) {
    if (event.target.name === "adopter" && event.target.value === "staff") {
    setInfo({ ...info, [event.target.name]: true });
    } else if (
    event.target.name === "adopter" &&
    event.target.value === "adopter"
    ) {
    setInfo({ ...info, [event.target.name]: false });
    } else {
    setInfo({ ...info, [event.target.name]: event.target.value });
    }
}
function handleRepass(event) {
    setRepass(event.target.value);
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validatePassword = (password, repassword) => {
    if (password.length < 5) {
    return 0;
    }
    if (password !== repassword) {
    return 1;
    }
    return 2;
};
function validateAge(birthdate) {
    var today = new Date();
    var selectedDate = new Date(birthdate);

    // Check if the entered date is a realistic past date
    if (selectedDate >= today) {
    return false;
    } else {
    return true;
    }
}
function validateSSN(SSN) {
    if (!isNaN(SSN) && SSN.length === 14) {
    return true;
    }
    return false;
}
function validatePhone(phone) {
    if (!isNaN(phone)) {
    return true;
    }
    return false;
}
async function handleSubmit(e) {
    e.preventDefault();
    const isValidEmail = validateEmail(info.email);
    const isValidPassword = validatePassword(info.password, repass);
    const isValidBirth = validateAge(info.birthDate);
    const isValidSSN = validateSSN(info.ssn);
    const isValidPhone = validatePhone(info.phone);

    if (!isValidEmail) {
    document.getElementById("email").placeholder =
        "must contain @ and . as(kk@ll.dd)";
    document.getElementById("email").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("email").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("email").placeholder = "Email";
    }, 1000);
    }
    if (isValidPassword === 0) {
    document.getElementById("password").placeholder = "5 chars or more";
    document.getElementById("password").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("password").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("password").placeholder = "Password";
    }, 1000);
    } else if (isValidPassword === 1) {
    document.getElementById("Repassword").placeholder = "Not Matched";
    document.getElementById("Repassword").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("Repassword").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("Repassword").placeholder = "Re-Password";
    }, 1000);
    }
    if (!isValidSSN) {
    document.getElementById("ssn").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("ssn").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
    }, 1000);
    }
    if (!isValidPhone) {
    document.getElementById("phone").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("phone").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
    }, 1000);
    }
    if (!isValidBirth) {
    document.getElementById("birth").classList.add("SSvibrate"); // Add the vibrate class
    setTimeout(() => {
        document.getElementById("birth").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
    }, 1000);
    }
    if (
    isValidEmail &&
    isValidPassword === 2 &&
    isValidSSN &&
    isValidBirth &&
    isValidPhone
    ) {
    console.log(info);
    axios
        .post(SERVER_URL + "/register", info)
        .then((response) => {
        alert(response.data);
        window.location.href = "http://localhost:3000/";
        })
        .catch((err) => {
        alert(err.response.data);
        });
    }
}
return (
    <div className="create-pet-profile-body">
    <div className="SSgradient-form">
        <div className="SSall">
        <div className="create-pet-profile-form-container d-flex flex-column">
            <h2>CREATE PET PROFILE</h2>
            <form
            className="create-pet-profile-form"
            onSubmit={handleSubmit}
            >

                <input
                className="create-pet-profile-signup-in"
                placeholder="Pet Name"
                name="petName"
                id="petName"
                type="text"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                placeholder="Species"
                name="species"
                id="species"
                type="text"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                placeholder="Breed"
                id="breed"
                name="breed"
                type="text"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                name="birthDate"
                id="Repassword"
                type="date"
                required
                onChange={handleRepass}
                />
                <select className='create-pet-profile-signup-in' placeholder='Shelter'id='shelter'  name="shelter" required onChange={handleChange}>
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                <input
                className="create-pet-profile-signup-in"
                placeholder="Health Status"
                id="health"
                name="health"
                type="text"
                onChange={handleChange}
                />
                <div className="create-pet-profile-radio">
                <textarea style={{width : "94%", height: "100px"}}
                placeholder='Description'
                className="create-pet-profile-signup-in"
                />
                </div>
                
            <button className="create-pet-profile-signup-register btn btn-light" type="submit">
                Register
            </button>
            <Link
                className="create-pet-profile-signup-back btn btn-primary" to={"/createshelter"}>
                Create shelter
            </Link>
            </form>
        </div>
        </div>
    </div>
    </div>
);
}

export default CreatePetProfile;
