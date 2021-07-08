import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardLink = ({ link, icon, tite, text }) => {
    return (
        <Col md={4}>
            <Link to={link} className="profile-card__link">
                <Card className="profile-card">
                    <i className={`${icon} profile-card__icon`}></i>
                    <Card.Body>
                        <Card.Title>{tite}</Card.Title>
                        <Card.Text>{text}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default CardLink;
