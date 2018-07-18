import React from 'react'
import Icon from '../common/Icon';

const Footer = () => {
    return (
        <footer className="text-white p-4" style={styles.main}>
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4 text-center" >
                    <span style={{ fontSize: '1.3rem' }} >www.ppavlov.me </span>
                    <br />
                    <span>Copyright &copy; {new Date().getFullYear()}</span>
                </div>
                <div className="col-md-2">
                </div>   
                <div className="col-md-2">
                    <div className="row">
                        <Icon fab="linkedin" size="2" href="https://www.linkedin.com/in/petromil-pavlov-431ab3111/" />
                        <Icon fab="github" size="2" href="https://github.com/Dominent" />
                        <Icon fas="envelope" size="2" href="petromilpavlov@gmail.com" />
                    </div>
                </div>
            </div>

        </footer>
    )
}

const styles = {
    main: {
        background: 'linear-gradient(to right, rgb(26, 188, 156), rgb(0, 123, 255))'
    }
}


export default Footer;
