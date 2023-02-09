import React, { useState } from 'react'
import Numpad from './Numpad/Numpad';
import Result from './Result/Result';
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';


export const ATMScreen = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [resultStr, setResultStr] = useState("Please enter your pin");
  const [resultCode, setResultCode] = useState("");
  const [key, setKey] = useState("");
  let [incorrentPINAttempts, setIncorrentPINAttempts] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [cardNumber, setCardNumber] = useState("")


  const [show, setShow] = useState(false);
  const [showInsertCard, setShowInsertCard] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleInsertCardShow = () => setShowInsertCard(true);
  const handleInsertCardClose = () => setShowInsertCard(false);



  const numberClickedHandler = (number) => {
    if (userInput.length < 6) {
      const input = userInput + number;
      setUserInput(input);
    }
  }

  const clearNumberHandler = () => {
    setUserInput("");
  }

  const deleteNumberHandler = () => {
    const input = userInput.substring(0, userInput.length - 1);
    setUserInput(input);
  }

  const authenticatePIN = () => {
    console.log('Authenticating PIN --------------------------------', userInput);


    const pin = Number(userInput);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinCode: pin, cardNumber: cardNumber })
    };
    fetch('http://localhost:8029/accounts/authentication', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Data ', data);

        if (data.status === 'Failure') {
          // Check incorrect attempts
          setIncorrentPINAttempts(++incorrentPINAttempts);
          if (incorrentPINAttempts > 3) {
            disabledAccount();
            return;
          }
          console.log('Authentication failed');
          setUserInput('');
          setModalTitle("Authentication Failed");
          setModalBody(data.message);
          handleShow();
        }
        else {
          console.log('You are authenticated');
          setIncorrentPINAttempts(0);
          navigate(`/account/${data.data.accountNumber}`);
        }
      }
      ).catch(err => {
        console.log('Error', err);
      }
      );
  }

  const disabledAccount = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber: cardNumber })
    };
    fetch('http://localhost:8029/accounts/disableAccount', requestOptions)
      .then(response => response.json())
      .then(data => {
        setIncorrentPINAttempts(0);
        setModalTitle("Account Blocked");
        setModalBody("Your account has been Blocked due to many incorrect attempts.Please visit our branch or contact to concerned department in order to activate your account.")
        handleShow();
      }).catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      {/* Modal to display insert card modal */}

      <Modal show={showInsertCard} onHide={handleInsertCardClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInsertCardClose}>
            Enter Card
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to show alert messages  */}
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton> {modalTitle} </ModalHeader>
        <ModalBody>
          {modalBody}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <div className="App">
        <Button variant="primary" onClick={handleInsertCardShow} >
          Insert Card
        </Button>
        <Numpad
          userInput={userInput}
          clicked={numberClickedHandler}
          del={deleteNumberHandler}
          clear={clearNumberHandler}
          dispense={authenticatePIN} />
        <Result
          key={key}
          resultStr={resultStr}
          resultCode={resultCode} />
      </div>
    </>
  )
}
