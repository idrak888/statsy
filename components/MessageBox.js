import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import styles from '/styles/Home/Home.module.css'

function MessageBox(props) {
    const [showToast, setShowToast] = useState(true);

	return (
		<ToastContainer style={{zIndex: 100, margin: 20}} className="position-fixed" position='bottom-start'>
			{showToast ? <>
				<Toast onClose={() => setShowToast(false)} bg="primary" className={styles.inner}>
					<Toast.Header>
						<strong className="me-auto">Developer Message</strong>
					</Toast.Header>
					<Toast.Body style={{color: "white"}}>A few major countries like the <strong>UK</strong> and <strong>Ireland</strong> are not supported yet.</Toast.Body>
				</Toast> 
			</> : null}
		</ToastContainer>
	)
}

export default MessageBox;