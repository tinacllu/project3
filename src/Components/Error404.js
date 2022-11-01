import { Link } from 'react-router-dom';

const Error404 = () => {
    return(
        <section className="errorPage">
            <div className="textContainer">
                <h2 className="logo">404</h2>
                <p>Oh no, page not found!</p>
                <Link className='button' to='/'>Let's go home</Link>       
            </div>
            <div className="imgContainer">
                <img src={require("../assets/errorImg.png")} alt="cute gray and blue robot" />
            </div>
        </section>
    )
}

export default Error404;