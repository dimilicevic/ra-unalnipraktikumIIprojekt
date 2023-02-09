import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const Profile = () => {
    const { accountNumber } = useParams();
    const [accountNo, setAccountNo] = useState(accountNumber);
    const [accountHolder, setAccountHolder] = useState(accountNumber);

    const navigate = useNavigate();

    const findAccountDetailsByAccountNumber = async (account) => {
        console.info('findAccountDetailsByAccountNumber ', account);
        const response = await fetch(`http://localhost:8029/accounts/${account}`);
        const data = await response.json();
        const accountDetails = data.data;
        setAccountHolder(accountDetails);
        console.log('Account Details --> ', accountHolder);
    }

    const logout = () => {
        navigate('/');
    }

    useEffect(() => {
        // Effect logic goes here
        findAccountDetailsByAccountNumber(accountNo);
        return () => {
            // Cleanup logic goes here
        };
    }, []);

    return (
        <div className='container'>
            <div className='mt-3'>
                <Card style={{ width: "50rem" }}>
                    {/* <Card.Img variant="top" src="https://via.placeholder.com/150" /> */}
                    <Card.Body>
                        <Row>
                            <Col><Card.Title>Account Details</Card.Title></Col>
                            <Col></Col>
                            <Col><Button variant="dark" onClick={logout}>Logout</Button></Col>
                        </Row>
                        <Card.Text className='mt-3'>
                            <Form.Group controlId="name">
                                <Form.Label> <strong>Name</strong> {accountHolder.name} </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label> <strong>Account Number</strong> {accountHolder.accountNumber} </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label> <strong>Balance</strong> {accountHolder.balance} </Form.Label>
                            </Form.Group>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
