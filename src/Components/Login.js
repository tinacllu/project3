import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ( { handleLogIn } ) => {
    const [ login, setLogin ] = useState(true);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <section className="loginPage">
            <div className="contentContainer">
                <Link className='exit' to='/'>
                    <i className="fa-solid fa-x"></i>
                </Link>
                <form onSubmit={(e) => {handleLogIn(e, username, password)}}>
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