// Constructor function for the FormValidator object
// This initializes a new validator for a specific form
function FormValidator(formElement) {
    this.form = formElement;             // Reference to the form element
    this.name = this.form["name"];       // Reference to the 'name' input field
    this.email = this.form["email"];    
    this.inquiry = this.form["inquiry"]; 
    this.message = this.form["message"]; 
}

// Prototype method to validate that all fields have a value before submission
FormValidator.prototype.validateRequiredFields = function () {
    if (
        this.name.value.trim() === "" ||
        this.email.value.trim() === "" ||
        !this.inquiry.value ||
        this.message.value.trim() === ""
    ) {
        throw new Error("Please complete all fields before submitting the form.");
    }
};

//Prototype method to block specific emails ending in '@gmail.com'
FormValidator.prototype.validateEmailDomain = function () {
    const blockedDomainRegex = /@gmail\.com$/;
    if (blockedDomainRegex.test(this.email.value.trim())) {
        throw new Error("Email addresses from gmail.com are not allowed.");
    }
};

// Prototype  to run all methods
FormValidator.prototype.validate = function () {
    this.validateRequiredFields();  // Step 1: Check for empty fields
    this.validateEmailDomain();     // Step 2: Check for blocked email domains
};

// Initialize and add the map
function initMap() {
    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Show map at user's position
function showPosition(position) {
    const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    const map = new google.maps.Map(document.getElementById("map"), {
        center: userLatLng,
        zoom: 15
    });

    new google.maps.Marker({
        position: userLatLng,
        map: map,
        title: "You are here!"
    });
}

// Handle geolocation errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
