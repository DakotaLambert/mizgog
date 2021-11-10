import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import "../../components/Mizgog.css"
import login from "./actualLoginBackground.png"

export const Login = props => {
    const history = useHistory()
    const username = useRef()
    const existDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("wizard", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (

        <>
        <img className="cover" alt="The login background" src={login}/>
        <div />
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

                    <h1 className="mizgogPageHeader">Mizgog's M'accoutrements</h1>
            <section className="namsayin">
                
                <form className="form--login" onSubmit={handleLogin}>

                    <fieldset className="loginField">
                        <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus
                            />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <Link to="/register">No account? Register!</Link>
            </section>
            <section className="linkRegister">
            </section>
        </main>
        </>
    )
}

