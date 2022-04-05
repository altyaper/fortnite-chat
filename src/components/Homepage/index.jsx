import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const Homepage = () => {
  return (
    <div>
      <Container>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Chat</Card.Title>
              <Card.Text>
                Fortnite Chat para mi stream
              </Card.Text>
              <Link to='/chat'>
                <Button>Chat</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Leaderboard</Card.Title>
              <Card.Text>
                Ve quienes son los donadores mas recientes
              </Card.Text>
              <Link to='/leaderboard'>
                <Button>Leaderboard</Button> 
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Predicciones</Card.Title>
              <Card.Text>
                Alerta tipo notificacion cuando hay una prediccion
              </Card.Text>
              <Link to='/predictions'>
                <Button>Predictions</Button> 
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Homepage;