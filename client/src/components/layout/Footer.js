import React from 'react'

export default () => {
    return (
        <footer className="text-white mt-5 p-4 text-center" 
            style={{backgroundColor: '#1abc9c'}}>
            Copyright &copy; {new Date().getFullYear()} ppavlov.me
        </footer>
    )
}
