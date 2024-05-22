


const passwordValidation = (password) => {
    // Password must contain at least 8 characters, including a letter, number and a special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

const passwordMatch = (password, confirmedPassword) => {
    return password === confirmedPassword;
};

const nameValidation = (name) => {
    // Name must contain only letters
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
};

const emailValidation = (email, {usersList}) => {
    
    // no such emial exist
    if (usersList.length > 0) {
    const exist = usersList.find((user) => user.email === email);
    return exist !== undefined;
    } else {
        return true;
    }
};

const setInvalidInput =(textFieldId) => {
    setInputClass(textFieldId, 'is-invalid');
};
const setValidInput = (textFieldId) => {
    setInputClass(textFieldId, 'is-valid');
};
    
const setInputClass = (textFieldId, className) => {
    const inputElement = document.getElementById(textFieldId);
    inputElement.classList.remove('is-valid', 'is-invalid');
    inputElement.classList.add(className);
};

export const checkForm = (requiredElements, {usersList}) => {
    let isValid = true;

    // Iterate over each required element
    requiredElements.forEach((element) => {
        const inputElement = element.tagName.toLowerCase() === 'input' ? element : element.querySelector('input');

        // Check if the input field is empty or if validation fails
        if (!inputElement.value.trim() ||
            (inputElement.id === 'InputPassword' && !passwordValidation(inputElement.value)) ||
            (inputElement.id === 'ConfirmedPassword' && !passwordMatch(document.getElementById('InputPassword').value, inputElement.value)) ||
            (inputElement.id === 'InputFirstName' && !nameValidation(inputElement.value)) ||
            (inputElement.id === 'InputLastName' && !nameValidation(inputElement.value)) ||
            (inputElement.id === 'InputEmail' && !emailValidation(inputElement.value, usersList={usersList}))) {
            isValid = false;
            setInvalidInput(inputElement.id);
        } else {
            setValidInput(inputElement.id);
        }
    });

    // Update formIsValid state based on validation result
    //setFormIsValid(isValid);
    return isValid;
};

