import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import firebaseConfig from './Firebase';
import { getDatabase, ref, get, child } from 'firebase/database';

const Login = ( { accountDetails, setAccountDetails, setLoggedIn } ) => {
    const [ login, setLogin ] = useState(true);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validAccount, setValidAccount ] = useState(true);
    const [ validUsername, setValidUsername ] = useState(true);

    const navigate = useNavigate();


    // check if login credentials are correct
    const matchLogin = () => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);

        get(child(databaseRef, `/${username}/account`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const dbPassword = Object.values(snapshot.val())[0].password;
                const dbUsername = Object.values(snapshot.val())[0].username;
                if (dbUsername === username && dbPassword === password) {
                    console.log('log in successful');
                    setAccountDetails({username: username, password: password});
                    navigate(`/${username}`);
                    setValidAccount(true);
                    setLoggedIn(true);
                } else {
                    setValidAccount(false);
                }
            }
            else {
                console.log('username or password is wrong')
                setValidAccount(false);
            }
        }).catch((error) => {
            console.log(error);
            alert('Oh no! Something went wrong!');
        })
    }

    // check if inputted username is unique when creating an account
    const matchAccount = () => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);

        get(child(databaseRef, `/${username}/account`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const dbUsername = Object.values(snapshot.val())[0].username;
                if (dbUsername === username) {
                    console.log('please pick another username');
                    setValidAccount(false);
                }
            } else {
                console.log('account successfully created', username)
                setAccountDetails({username: username, password: password});
                navigate(`/${username}`);
                setValidAccount(true);
                setLoggedIn(true);
            }
        }).catch((error) => {
            console.log(error);
            alert('Oh no! Something went wrong!');
        })
    }

    // check validity of account details and reset inputs
    const checkCredentials = (e, username) => {
        e.preventDefault();
        if (checkUserName(username)) {
            if (login) {
                matchLogin();
            } else {
                matchAccount();
            }
        } else {
            console.log('pick a new one')
            setValidUsername(false);
            setValidAccount(true);
        }

        setUsername('');
        setPassword('');
    }

    // check if username contains firebase incompatible characters
    const checkUserName = (username) => {
        if (username.match(/^[ A-Za-z0-9_+-]+$/)) {
            return true
        } else {
            return false
        }
    }

    return (
        <section className="loginPage">
            <div className="contentContainer">
                <Link className='exit' to={`/${accountDetails.username}`}>
                    <i className="fa-solid fa-x"></i>
                </Link>
                <form onSubmit={(e) => {checkCredentials(e, username)}}>
                    <fieldset className='inputs'>
                        {
                            !validUsername && !login && validAccount
                                ? <p className='warning smallFont'>*Username cannot contain special characters. Please try again.</p>
                                : null
                        }
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' required value={username} onChange={(e) => {setUsername(e.target.value)}}></input>

                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' minLength='6' required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </fieldset>
                        {login
                            ? <button type='submit' className='submitLogin'>Log In</button>
                            : <button type='submit' className='submitLogin'>Create Account</button>}
                </form>
                
                {!validAccount
                    ?login
                        ?<p className='errorMessage smallFont'>*Username or password is wrong. Please try again.</p>
                        :<p className='errorMessage smallFont'>*Username already exists. Please choose another username.</p>
                    :null
                }

                {login
                    ?<div className='switch smallFont'>
                        <p>Don't have an account?</p>
                        <button onClick={() => {setLogin(!login); setValidAccount(true); setValidUsername(true)}}>Create an Account</button>
                    </div>
                    :<div className='switch smallFont'>
                        <p>Already have an account?</p>
                        <button onClick={() => {setLogin(!login); setValidAccount(true)}}>Log In</button>
                    </div>}
            </div>
        </section>
    )
}

export default Login