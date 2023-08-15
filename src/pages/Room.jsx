import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_MESSAGE_ID, PROJECT_ID } from '../appWriteConfig'

const Room = () => {
	useEffect(function () {
		getMessage()
	}, [])
	const getMessage = async function () {
		const response = await databases.listDocuments(DATABASE_ID, COLLECTION_MESSAGE_ID)
		console.log('response', response)
	}
	return <div>Room</div>
}

export default Room
