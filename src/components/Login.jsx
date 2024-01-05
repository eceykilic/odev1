import React, { useEffect, useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const initialForm = {
  code: '',
  terms: false,
};

const initialErrors = {
  code: false,
  terms: false,
};

const errorMessages = {
  code: 'Lütfen kodu doğru giriniz',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    let newErrors = { ...errors, [name]: false };

    if (
      (name === 'terms' && !value) ||
      (name === 'code' && value.trim().length < 4)
    ) {
      newErrors = { ...errors, [name]: true };
    }

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => !error);
    setIsValid(isFormValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find((item) => item.code == form.code);
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <div className="App">
    <Form onSubmit={handleSubmit}>
      <h1>Cypress Login</h1>
      <FormGroup>
        <Label for="code">Kod</Label>
        <Input
          id="code"
          name="code"
          placeholder="Kodu giriniz "
          type="text"
          onChange={handleChange}
          value={form.code}
          invalid={errors.code}
        />
        {errors.code && <FormFeedback>{errorMessages.code}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          invalid={errors.terms}
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          Kendime ait kodu girdiğimi onaylıyorum
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button data-cy="login-submit" disabled={!isValid} color="light">
          Giriş Yap
        </Button>
      </FormGroup>
    </Form>
    </div>
  );
}
