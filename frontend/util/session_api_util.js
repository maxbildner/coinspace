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



export const login = (user) => {
    return $.ajax({
        method: 'POST',
        url: 'api/session',                                                       
        data: { user }
    });
};



export const logout = (user) => {
    return $.ajax({
        method: 'DELETE',
        url: 'api/session',
        data: { user }
    });
};
