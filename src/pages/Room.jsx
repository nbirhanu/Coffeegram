import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_MESSAGE_ID, PROJECT_ID } from '../appWriteConfig'
import { ID } from 'appwrite'

const Room = () => {
	//
	const [messages, setMessage] = useState([])
	const [messageBody, setMessageBody] = useState('')
	useEffect(function () {
		getMessage()
	}, [])
	//create document
	const handleOnSubmit = async function (e) {
		e.preventDefault()
		let payload = {
			body: messageBody,
		}
		let respones = await databases.createDocument(
			DATABASE_ID,
			COLLECTION_MESSAGE_ID,
			ID.unique(),
			payload
		)
		console.log(respones)
		setMessage(prestate => [respones, ...messages])
		setMessageBody('')
	}
	// create database
	const getMessage = async function () {
		const response = await databases.listDocuments(DATABASE_ID, COLLECTION_MESSAGE_ID)
		setMessage(response.documents)
	}
	//

	// console.log('messages', message~s)
	return (
		<main className="container">
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
