import React,  { useState } from 'react';
import { Card,  Form } from "react-bootstrap";

export const Summary = () => {
    return (
        <div className='container'>
            <div className='mt-3'>
                <Card style={{ width: "50rem" }}>
                    {/* <Card.Img variant="top" src="https://via.placeholder.com/150" /> */}
                    <Card.Body>
                        <Card.Title>Account Summary</Card.Title>
                        <Card.Text className='mt-3'>
                            {/* <Form.Group controlId="name">
                                <Form.Label> <strong>Name</strong> Eidan Khan</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label> <strong>Account Number</strong> 296502157</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label> <strong>Balance</strong> 296500.000</Form.Label>
                            </Form.Group> */}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
