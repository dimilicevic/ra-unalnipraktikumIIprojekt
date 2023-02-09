import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import { useParams } from 'react-router-dom';

export const Withdraw = () => {
    const [amount, setAmount] = useState();
    const { accountNumber } = useParams();
    const [accountNo, setAccountNo] = useState(accountNumber);
    const [accountHolder, setAccountHolder] = useState(accountNumber);
    const [title, setTitle] = useState();
    const [messageBody, setMessageBody] = useState("");

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findAccountDetailsByAccountNumber = async (account) => {
        console.info('findAccountDetailsByAccountNumber ', account);
        const response = await fetch(`http://localhost:8029/accounts/${account}`);
        const data = await response.json();
        const accountDetails = data.data;
        setAccountHolder(accountDetails);
        console.log('Account Details --> ', accountHolder);
    }

    useEffect(() => {
        console.info('Withdraw Component is loaded');
        // Effect logic goes here
        findAccountDetailsByAccountNumber(accountNo);
        return () => {
            // Cleanup logic goes here
        };
    }, []);

    const makeWithdrawal = () => {
        const accountBalance = accountHolder.balance;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accountNumber: accountNo })
          };
        if (accountBalance > amount) {
            fetch(`http://localhost:8029/accounts/withdrawal/${amount}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Data ', data);
                    if (data.status === 'Failure') {
                        console.log(data.message);
                        setAmount(0);
                    }
                    else {
                        const message = 'You have successfully withdrawn amount of '+amount+ ' from account number ['+accountNumber+"]";
                        console.log('Response Message --> ',message);
                        setTitle('Amount Withdrawn');
                        setMessageBody(message);
                        handleShow();
                    }
                }
                ).catch(err => {
                    console.log('Error', err);
                }
                );
        }
        else {
            const message = 'You have insufficient amount in your account';
            console.log('Response Message --> ',message);
            setTitle("Insufficient Funds")
            setMessageBody(message);
            handleShow();
        }
        console.info('Account Balance ', accountBalance);
        console.log('Making withdrawal of ' + amount + ' from ' + accountNo);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton> {title} </ModalHeader>
                <ModalBody>
                    {messageBody}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='container'>
                <div className='mt-3'>
                    <Card style={{ width: "50rem" }}>
                        {/* <Card.Img variant="top" src="https://via.placeholder.com/150" /> */}
                        <Card.Body>
                            <Card.Title> Withdraw Amount </Card.Title>
                            <Card.Text className='mt-5'>
                                <Form.Group controlId="amount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Amount to withdraw"
                                        value={amount}
                                        onChange={(event) => setAmount(event.target.value)}
                                        style={{ width: "20rem" }}
                                    />
                                </Form.Group>
                            </Card.Text>
                            <Button variant="primary" onClick={makeWithdrawal}>Withdraw</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
