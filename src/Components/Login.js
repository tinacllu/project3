import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import firebaseConfig from './Firebase';
import { getDatabase, ref, get, child } from 'firebase/database';

const Login = ( { setAccountDetails, setLoggedIn } ) => {
    const [ login, setLogin ] = useState(true);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ validAccount, setValidAccount ] = useState(true);
    const [ validUsername, setValidUsername ] = useState(true);

    const navigate = useNavigate();

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
        }

        

        setUsername('');
        setPassword('');
    }

    const checkUserName = (username) => {
        // const regex = /^[ A-Za-z0-9_+-]+$/;
        if (username.match(/^[ A-Za-z0-9_+-]+$/)) {
            return true

        } else {
            return false
        }


    }
    return (
        <section className="loginPage">
            <div className="contentContainer">
                <Link className='exit' to='/'>
                    <i className="fa-solid fa-x"></i>
                </Link>
                <form onSubmit={(e) => {checkCredentials(e, username)}}>
                    <fieldset className='inputs'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' required value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
                        {
                            !validUsername
                                ? <p>Username cannot contain special characters. Please try again.</p>
                                : null
                        }
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' minLength='6' required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </fieldset>
                        {login
                            ? <button type='submit' className='submitLogin'>Log In</button>
                            : <button type='submit' className='submitLogin'>Create Account</button>}
                </form>
                
                {validAccount
                    ?null
                    :login
                        ?<p>username or password is wrong. Please try again.</p>
                        :<p>username already exists. Please choose another username.</p>}

                {login
                    ?<div className='switch'>
                        <p>Don't have an account?</p>
                        <button onClick={() => setLogin(!login)}>Create an Account</button>
                    </div>
                    :<div className='switch'>
                        <p>Already have an account?</p>
                        <button onClick={() => {setLogin(!login); setValidAccount(true)}}>Log In</button>
                    </div>}
            </div>
        </section>
    )
}

export default Login