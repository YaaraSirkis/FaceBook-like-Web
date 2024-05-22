
import React from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uploadImage } from '../services/Api';



function SignUp() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        picture: ''
    });
   

    const handleCloseClick = () => {
        // Navigate to the login page
        navigate('/');
    };

  

    /**
     * handle change in input fields and update the user state.
     * the picture field is handled differently.
     * @param {*} name 
     * @param {*} value 
     */
    const handleChange = (name, event) => {
        setUser((prevUser) => ({
            ...prevUser,
            [name]: name === 'picture' ? (event && event.target.files[0]) : (event && event.target.value)
        }));
        
        console.log(user);
    };

    
    

    /**
     * Sets or updates the CSS class of an input element based on its ID.
     * @param {*} textFieldId 
     * @param {*} className 
     */
    const setInputClass = (textFieldId, className) => {
        const inputElement = document.getElementById(textFieldId);
        inputElement.classList.remove('is-invalid');
        if (className.trim() !== ''){
        inputElement.classList.add(className);
        }
    };

    /**
     * validate the form and set errors if any
     * @param {*} event 
     * @param {*} SetErrors 
     */
    const validate = (event) => {
        event.preventDefault();
        //reset validation classes
        const requiredElements = document.querySelectorAll('[required]');
        requiredElements.forEach((element) => {
            setInputClass(element.id, '');
        });

        let error = '';
        const validationRules = [
            { field: 'firstName', message: 'First name is required', pattern: /[a-zA-Z]/, patternMessage: 'First name must contain only letters'},
            { field: 'lastName', message: 'Last name is required', pattern: /[a-zA-Z]/, patternMessage: 'Last name must contain only letters'},
            { field: 'email', message: 'Email is required' },
            { field: 'password', message: 'Password is required', pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
                patternMessage: 'Password must contain at least 8 characters, including a letter, number and a special character'},
            { field: 'confirmedPassword', message: 'Confirmed password is required' },
            { field: 'picture', message: 'Picture is required' }
        ];

        validationRules.forEach(({field, message, pattern, patternMessage}) => {
            if (!user[field]) {
                error += `${message}\n`;
                setInputClass(field, 'is-invalid');
            } else if (pattern && patternMessage && !pattern.test(user[field])) {
                error += `${patternMessage}\n`;
                setInputClass(field, 'is-invalid');
            }
            console.log(user.picture);
        });
        if (user.password !== user.confirmedPassword) {
            error += 'Passwords do not match\n';
            setInputClass('confirmedPassword', 'is-invalid');
        }
        setErrors(error);
        if (!error) {
            submitForm();
            
        }
    };

    const submitForm = async () => {
            const updatedImage = await uploadImage(user.picture);
            const updatedUser = { ...user, picture: updatedImage };
            try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser) 
            });
            console.log(response);
    
            // Handle the response as needed
            if (response["status"] === 409) {
                setErrors("User already exists");
            } else {
                setErrors("");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            //need try catch?
        }
   // };
        
    };
    



    /**
     * show error box with error messages
     * @param {*} param0 
     * @returns 
     */
    const ErrorBox = ({ errors }) => {
        const errorLines = errors.split('\n');
        return (
            <div className="error-box is-invalid">
                {errorLines.map((error, index) => (
                    <p key={index} className="error-message">{error}</p>
                ))}
            </div>
        );
    };





    


    

    return (
        <div>
            {errors && <ErrorBox errors={errors} />}
        < div className="SIform" noValidate>
            <button id="close" type="button" className="btn-close" onClick={handleCloseClick} aria-label="Close"></button>
            <div className="headLine">
                <p id="first">Sign Up</p>
                <p id="second">It's quick and easy.</p>
            </div>
            

            <div className="container text">
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="firstName"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="First name"
                                    aria-describedby="inputGroupPrepend"
                                    value={user.firstName}
                                    onChange={(e) => handleChange('firstName', e)}
                                    required>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="lastName"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last name"
                                    aria-describedby="inputGroupPrepend"
                                    value={user.lastName}
                                    onChange={(e) => { handleChange('lastName', e); }}
                                    required>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-3">
                    <div className="input-group">
                        <input type="EmailOrNumber"
                            className="form-control"
                            id="email"
                            placeholder="Mobile number or email"
                            aria-describedby="inputGroupPrepend"
                            value={user.email}
                            onChange={(e) => handleChange('email', e)}
                            required>
                        </input>
                    </div>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="New Password"
                        aria-describedby="inputGroupPrepend"
                        value={user.password}
                        onChange={(e) => handleChange('password', e)}
                        required>
                    </input>
                </div>

                <div className="mb-3">
                    <input type="password" className="form-control" id="confirmedPassword" placeholder="Confirm Password"
                        aria-describedby="inputGroupPrepend"
                        value={user.confirmedPassword}
                        onChange={(e) => handleChange('confirmedPassword', e)}
                        required>
                    </input>
                </div>
                <p>* first name and last name must contain only letters</p>
                <p>* password must contain at least 8 characters, including a letter, number and a special character</p>
                
            



                <p id="pic">picture</p>
                <div className="mb-3">
                    <input className="form-control" type="file" id="picture"
                        aria-describedby="inputGroupPrepend"
                        onChange={(e) => handleChange('picture', e)}
                        required
                    />
                </div>
            

                <div id="signUpBtn">
                    <button type="submit" className="btn btn-primary" onClick={(event) => {validate(event)}}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>


    );
}

                export default SignUp;
