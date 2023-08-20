import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_MESSAGE_ID, PROJECT_ID } from '../appWriteConfig'
import { ID, Query } from 'appwrite'
import { Trash2 } from 'react-feather'
import client from '../appWriteConfig'
import Header from '../components/Header'

const Room = () => {
	//
	const [messages, setMessage] = useState([])
	const [messageBody, setMessageBody] = useState('')
	useEffect(function () {
		getMessage()
		const unsubscribe = client.subscribe(
			[`databases.${DATABASE_ID}.collections.${COLLECTION_MESSAGE_ID}.documents`],
			response => {
				if (response.events.includes('databases.*.collections.*.documents.*.create')) {
					setMessage(prevState => [response.payload, ...prevState])
				}
				if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
					setMessage(prevState => prevState.filter(message => message.$id !== response.payload.$id))
				}
			}
		)
		return () => {
			unsubscribe()
		}
	}, [])
	//create document
	const handleOnSubmit = async function (e) {
		e.preventDefault()
		let payload = {
			body: messageBody,
		}
		let response = await databases.createDocument(
			DATABASE_ID,
			COLLECTION_MESSAGE_ID,
			ID.unique(),
			payload
		)
		// console.log(respones)
		// setMessage(prestate => [respones, ...messages])
		setMessageBody('')
	}
	// create database
	const getMessage = async function () {
		const response = await databases.listDocuments(DATABASE_ID, COLLECTION_MESSAGE_ID)
		setMessage(response.documents)
	}
	const deleteMessage = async function (id) {
		const response = await databases.deleteDocument(DATABASE_ID, COLLECTION_MESSAGE_ID, id)
		// setMessage(messages.filter(message => message.$id !== id))
	}

	return (
		<main className="container">
			<Header />
			<div className="room--container">
				<form id="message--form" onSubmit={handleOnSubmit}>
					<div>
						<textarea
							maxLength="1000"
							required
							placeholder="Say something..."
							value={messageBody}
							onChange={e => setMessageBody(e.target.value)}></textarea>
					</div>
					<div className="send-btn--wrapper">
						<input className="btn btn--secondary" type="submit" value="Send" />
					</div>
				</form>
				<div>
					{messages.map(message => (
						<div key={message.$id} className="message--wrapper">
							<div className="message--header">
								<small className="message-timestamp">{message.$createdAt}</small>
								<Trash2 className="delete--btn" onClick={() => deleteMessage(message.$id)} />
							</div>
							<div className="message--body">
								<span>{message.body}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	)
}

export default Room
