import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from '../api/axios';

function AddProduct() {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        stock: '',
        category_id: '',
        images: [], $
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: Array.from(files), 
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('slug', formData.slug);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('category_id', formData.category_id);

        // Append each image to the FormData
        formData.images.forEach((image) => {
            data.append('images[]', image); // Use 'images[]' to indicate an array
        });

        try {
            const add = await api.post("/v1/admin/products", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(add);
        } catch (error) {
            console.log(error.response?.data);
        }

        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add a product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSlug">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="Enter slug"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock quantity"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategoryId">
                            <Form.Label>Category ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                placeholder="Enter category ID"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control
                                type="file"
                                name="images"
                                onChange={handleChange}
                                multiple // Allow multiple file selection
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProduct;