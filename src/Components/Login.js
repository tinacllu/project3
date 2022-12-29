import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import firebaseConfig from './Firebase';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';

const Login = ( { handleLogIn, setAccountDetails, accountDetails } ) => {
    const [ login, setLogin ] = useState(true);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validAccount, setValidAccount ] = useState(true);

    const navigate = useNavigate();

    const matchLogin = () => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        onValue(databaseRef, (response) => {
            for (let key in response.val()) {
                if (key === username && Object.values(response.val()[key]['account'])[0].password === password) {
                    console.log('log in successful');
                    // setAccountDetails({username: username, password: password});
                    // handleLogIn(username, password)
                    // navigate(`/${username}`);
                } else {
                    console.log('username or password is wrong')
                }
            }
        })
    }

    const matchAccount = () => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        onValue(databaseRef, (response) => {
            for (let key in response.val()) {}
        })
    }

    const checkCredentials = (e, username, password) => {
        e.preventDefault();
        
        // const database = getDatabase(firebaseConfig);
        // const databaseRef = ref(database);
        // onValue(databaseRef, (response) => {
        //     for (let key in response.val()) {
                
        //         if (login) {
        //             if (key === username && Object.values(response.val()[key]['account'])[0].password === password) {
        //                 console.log('log in successful');
        //                 setAccountDetails({username: username, password: password});
        //                 handleLogIn(username, password)
        //                 navigate(`/${username}`);
        //             } else {
        //                 console.log('username or password is wrong')
        //             }
        //         } else {
        //             if (key === username) {
        //                 console.log('please pick another username')
        //             } else {
        //                 console.log('account successfully created')
        //                 // setAccountDetails({username: username, password: password});
        //                 // handleLogIn(username, password)
        //                 // navigate(`/${username}`);
        //             }
        //         }
        //         // login = true
        //             // if username & password matches, return true
        //             // if no match, then tell user to check email/pass combo
        //         // login = false (create account)
        //             // if username matches, tell user to pick another one
        //             // else let them creat ethe account 
        //         // if (key === username ) {
        //         //     console.log('it matches')
        //         //     console.log(Object.values(response.val()[key]['account'])[0].password)
        //         // }
        //     }
        // });

        //if credentials good, then call the function
        setAccountDetails({username: username, password: password});
        handleLogIn(username, password)
        navigate(`/${username}`);
        setUsername('');
        setPassword('');
    }

    return (
        <section className="loginPage">
            <div className="contentContainer">
                <Link className='exit' to='/'>
                    <i className="fa-solid fa-x"></i>
                </Link>
                <form onSubmit={(e) => {checkCredentials(e, username, password)}}>
                    <fieldset className='inputs'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' required value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </fieldset>
                        {login
                            ? <button type='submit' className='submitLogin'>Log In</button>
                            : <button type='submit' className='submitLogin'>Create Account</button>}
                </form>
                


                {login
                    ?<div className='switch'>
                        <p>Don't have an account?</p>
                        <button onClick={() => setLogin(!login)}>Create an Account</button>
                    </div>
                    :<div className='switch'>
                        <p>Already have an account?</p>
                        <button onClick={() => setLogin(!login)}>Log In</button>
                    </div>}
            </div>
        </section>
    )
}

export default Login