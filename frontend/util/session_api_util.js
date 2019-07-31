// signup- make an ajax request that creates a new user
// login - make an ajax request that creates a new session
// logout - make an ajax request that deletes the current session

export const signup = (user) => {
    return $.ajax({
        method: 'POST',
        url: 'api/users',                                                       // ? /api/users wrong?
        data: { user
            // user: {
            //     email: email,
            //     password: password,
            //     first_name: firstName,
            //     last_name: lastName,
            //     state: state
            // }
        }
    });
};

// to test on window!!!!
// signup( {
//     email: 'max@gmail.com',
//     password: '12345678',
//     first_name: 'max',
//     last_name: 'b',
//     state: 'New York'
// })



// to test on window!!!!
// login({ email: 'harry@gmail.com', password: '12345678' })
export const login = (user) => {    
    return $.ajax({
        method: 'POST',
        url: 'api/session',                                                       
        data: { user }
    });
};



// to test on window!!!!
// logout()
export const logout = () => {
    return $.ajax({
        method: 'DELETE',
        url: 'api/session'
    });
};
