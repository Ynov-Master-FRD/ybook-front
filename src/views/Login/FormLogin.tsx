import React from "react";

const FormLogin = () => {
    return (
        <div>
            <h2>FormLogin</h2>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button>Submit</button>
        </div>
    );
}

export default FormLogin;
