import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const MovieForm = () => {
    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        Genre: {
            Name: '',
            Description: '',
        },
        Director: {
            Name: '',
            Bio: '',
        },
        Actors: [],
        ImageData: '', // Updated to accept base64 string
        Featured: false,
    });
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ImageData') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    ImageData: reader.result.split(',')[1], // Get base64 data after comma
                }));
            };
            reader.onerror = () => {
                console.error('Error reading file.');
            };
        } else if (name === 'GenreName' || name === 'GenreDescription') {
            // Update Genre object
            setFormData((prevData) => ({
                ...prevData,
                Genre: {
                    ...prevData.Genre,
                    [name === 'GenreName' ? 'Name' : 'Description']: value,
                },
            }));
        } else if (name === 'DirectorName' || name === 'DirectorBio') {
            // Update Director object
            setFormData((prevData) => ({
                ...prevData,
                Director: {
                    ...prevData.Director,
                    [name === 'DirectorName' ? 'Name' : 'Bio']: value,
                },
            }));
        } else if (name === 'Actors') {
            // Update Actors array
            setFormData((prevData) => ({
                ...prevData,
                Actors: value.split(',').map((actor) => actor.trim()), // Split actors by comma and trim whitespace
            }));
        } else {
            // Update other fields directly
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if required fields are empty
            if (!formData.Title || !formData.Description) {
                throw new Error('Title and Description are required.');
            }

            const formDataWithBase64 = {
                ...formData,
                ImageData: `data:image/png;base64,${formData.ImageData}`, // Add base64 prefix
            };

            // Send POST request to API endpoint with FormData containing base64 image and Authorization header
            const response = await axios.post('http://localhost:5000/movies', formDataWithBase64, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Specify content type for JSON data
                },
            });
            // Reset form after successful submission
            setFormData({
                Title: '',
                Description: '',
                Genre: {
                    Name: '',
                    Description: '',
                },
                Director: {
                    Name: '',
                    Bio: '',
                },
                Actors: [],
                ImageData: '', // Reset ImageData to empty string
                Featured: false,
            });
            alert('Movie added successfully!');
        } catch (err) {
            console.error('Error adding movie:', err.message);
            alert('Error adding movie. Please check the form and try again.');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="Title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                name="Title"
                                value={formData.Title}
                                onChange={handleChange}
                                placeholder="Enter title"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="Description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                                placeholder="Enter description"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="GenreName">
                            <Form.Label>Genre Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="GenreName"
                                value={formData.Genre.Name}
                                onChange={handleChange}
                                placeholder="Enter genre name"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="GenreDescription">
                            <Form.Label>Genre Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="GenreDescription"
                                value={formData.Genre.Description}
                                onChange={handleChange}
                                placeholder="Enter genre description"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="DirectorName">
                            <Form.Label>Director Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="DirectorName"
                                value={formData.Director.Name}
                                onChange={handleChange}
                                placeholder="Enter director name"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="DirectorBio">
                            <Form.Label>Director Bio:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="DirectorBio"
                                value={formData.Director.Bio}
                                onChange={handleChange}
                                placeholder="Enter director bio"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="Actors">
                            <Form.Label>Actors (comma-separated):</Form.Label>
                            <Form.Control
                                type="text"
                                name="Actors"
                                value={formData.Actors.join(', ')}
                                onChange={handleChange}
                                placeholder="Enter actors"
                                style={{ backgroundColor: 'white' }}
                            />
                        </Form.Group>

                        <Form.Group controlId="ImageData">
                            <Form.Label>Image:</Form.Label>
                            <Form.Control
                                type="file"
                                name="ImageData"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="Featured">
                            <Form.Check
                                type="checkbox"
                                label="Featured"
                                name="Featured"
                                checked={formData.Featured}
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        Featured: e.target.checked,
                                    }))
                                }
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Movie
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieForm;
