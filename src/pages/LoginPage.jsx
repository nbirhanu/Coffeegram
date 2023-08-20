import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/authContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
	const { user, handleSubmit } = useAuth()
	const navigate = useNavigate()
	const [credentials, setCredential] = useState({
		email: '',
		password: '',
	})
	useEffect(function () {
		if (user) {
			navigate('/')
		}
	}, [])
	const handleInputChange = function (e) {
		let name = e.target.name
		let value = e.target.value
		setCredential({ ...credentials, [name]: value })
		// console.log(credentials)
	}
	return (
		<div className="auth--container">
			<div className="form--wrapper">
				<form
					onSubmit={e => {
						handleSubmit(e, credentials)
					}}>
					<div className="field--wrapper">
						<label>Email</label>
						<input
							type="email"
							name="email"
							required
							placeholder="Enter your email..."
							value={credentials.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="field--wrapper">
						<label>Email</label>
						<input
							type="password"
							name="password"
							required
							placeholder="Enter your password..."
							value={credentials.password}
							onChange={handleInputChange}
						/>
					</div>
					<div className="field--wrapper">
						<input className="btn btn--lg btn--main" type="submit" value="submit" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
