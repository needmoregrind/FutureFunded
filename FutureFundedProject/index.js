// Query for the theme button and assign it to a variable
const themeButton = document.getElementById("theme-button");

// Complete the toggleDarkMode function
const toggleDarkMode = () => {
    // Toggle the dark mode class on the body element
    document.body.classList.toggle("dark-mode");
};

// Register a 'click' event listener for the theme button
themeButton.addEventListener("click", toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
    const signNowButton = document.getElementById('sign-now-button');
    const signaturesSection = document.getElementById('signatures-section');

    // const addSignature = () => {
    //     const nameInput = document.getElementById('name');
    //     const hometownInput = document.getElementById('hometown');

    //     const name = nameInput.value.trim();
    //     const hometown = hometownInput.value.trim();

    //     if (!name || !hometown) {
    //         alert("Please fill out both the name and hometown fields.");
    //         return;
    //     }

    //     const newSignature = document.createElement('p');
    //     newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

    //     signaturesSection.appendChild(newSignature);

    //     nameInput.value = '';
    //     hometownInput.value = '';
    // };

    const validateForm = () => {
        let containsErrors = false;
        var petitionInputs = document.getElementById("sign-petition").elements;

        const person = {}; // Object to hold form data

        for (let i = 0; i < petitionInputs.length; i++) {
            const input = petitionInputs[i];

            if (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA") continue;

            if (input.value.trim().length < 2) {
                containsErrors = true;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
                // Add the input's name and value to the person object
                person[input.name] = input.value.trim();
            }
        }

        if (!containsErrors) {
            addSignature(person); // Pass the person object to addSignature
            toggleModal(person); // Show the modal after signing

            for (let i = 0; i < petitionInputs.length; i++) {
                if (petitionInputs[i].tagName === "INPUT" || petitionInputs[i].tagName === "TEXTAREA") {
                    petitionInputs[i].value = "";
                }
            }
        }
    };

    // Function to add a signature using the person object
    const addSignature = (person) => {
        if (!person.name || !person.hometown) {
            alert('Please fill out both the name and hometown fields.');
            return;
        }
        const newSignature = document.createElement('p');
        newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
        signaturesSection.appendChild(newSignature);
    };

    // Attach validateForm to the sign-now button
    signNowButton.addEventListener('click', validateForm);
});

let animation = {
    revealrevealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

console.log(animation);

const revealableContainers = document.querySelectorAll('.revealable');


const reveal = () => {
    let windowHeight = window.innerHeight; // Get the height of the window

    for (let i = 0; i < revealableContainers.length; i++) {
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top; // Get the top of the container
        
        if (topOfRevealableContainer < windowHeight - animation.revealrevealDistance) {
                  // Add the active class to reveal the container
            revealableContainers[i].classList.add('active');
        } else { 
                  // Remove the active class to hide the container again
            revealableContainers[i].classList.remove('active');
        }
    }
};

// Attach the reveal function to the scroll event
window.addEventListener('scroll', reveal);

// Trigger reveal on page load
reveal();

// Function to toggle the modal
const toggleModal = (person) => {
    // Select the modal and modal content elements
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('thanks-modal-content');
    // Set the display property of the modal to flex
    modal.style.display = 'flex';
    // Update the modal content with a personalized message
    modalContent.textContent = `Thank you so much ${person.name}! Representing ${person.hometown}!`;

    // Start the image scaling animation when the modal is shown
    scaleImage();  // Call to animate the image

    // Set interval to continuously scale the image every 500ms
    const intervalId = setInterval(scaleImage, 500);  // Call scaleImage every 500ms (0.5 seconds)

    // Hide the modal after 4 seconds
      setTimeout(() => {
        modal.style.display = "none";
        clearInterval(intervalId);
    }, 4000);
};

// Declare variables for scaling the image
let scaleFactor = 1;  // This will track the current scale factor
const modalImage = document.querySelector('#thanks-modal img');  // Select the image inside the modal

// Function to animate the image scaling
const scaleImage = () => {
    if (scaleFactor === 1) {
        scaleFactor = 0.8;  // Shrink the image
    } else {
        scaleFactor = 1;  // Return the image to original size
    }
    modalImage.style.transform = `scale(${scaleFactor})`;  // Apply the scale transformation to the image
};
