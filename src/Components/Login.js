import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import firebaseConfig from './Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

const Login = ( { handleLogIn, setAccountDetails, accountDetails, setLoggedIn } ) => {
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
                    setAccountDetails({username: username, password: password});
                    handleLogIn(username, password);
                    navigate(`/${username}`);
                    setValidAccount(true);
                    setLoggedIn(true);
                    break;
                } else {
                    console.log('username or password is wrong')
                    setValidAccount(false);
                }
            }
        })
    }

    const matchAccount = () => {
        let match = false;
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);
        onValue(databaseRef, (response) => {
            for (let key in response.val()) {
                if (key === username) {
                    console.log('please pick another username');
                    match = true;
                    setValidAccount(false);
                    break;
                }
            }
            if (!match) {
                console.log('account successfully created')
                setAccountDetails({username: username, password: password});
                handleLogIn(username, password)
                navigate(`/${username}`);
                setValidAccount(true);
                setLoggedIn(true);
            }
        })
    }

    const checkCredentials = (e) => {
        e.preventDefault();
        
        if (login) {
            matchLogin();
        } else {
            matchAccount();
        }

        setUsername('');
        setPassword('');
    }

    return (
        <section className="loginPage">
            <div className="contentContainer">
                <Link className='exit' to='/'>
                    <i className="fa-solid fa-x"></i>
                </Link>
                <form onSubmit={(e) => {checkCredentials(e)}}>
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