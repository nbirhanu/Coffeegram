import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../utils/authContext'

const Header = () => {
	const { user, handleUserLogout } = useAuth()
	return (
		<div id="header--wrapper">
			{user ? (
				<>
					<p>welcame {user.name}</p>
					<LogOut onClick={handleUserLogout} className="header--link" />
				</>
			) : (
				<button>login</button>
			)}
		</div>
	)
}

export default Header
