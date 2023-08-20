import { createContext, useState, useEffect, useContext } from 'react'
import { account } from '../appWriteConfig'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
	const Navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	useEffect(function () {
		// setLoading(false)
		handleUserOnSubmit()
	}, [])
	const handleUserOnSubmit = async function () {
		try {
			const userDetails = await account.get()
			setUser(userDetails)
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}
	const handleSubmit = async function (e, credentials) {
		e.preventDefault()
		try {
			const response = await account.createEmailSession(credentials.email, credentials.password)
			console.log(response)
			const userDetails = account.get()
			setUser(userDetails)
			Navigate('/')
		} catch (error) {
			console.error(error)
		}
	}
	const handleUserLogout = async function () {
		await account.deleteSession('current')
		setUser(null)
	}
	const contextData = {
		user,
		handleSubmit,
		handleUserLogout,
	}

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <p>Loading..</p> : children}
		</AuthContext.Provider>
	)
}
export const useAuth = () => {
	return useContext(AuthContext)
}
export default AuthContext
