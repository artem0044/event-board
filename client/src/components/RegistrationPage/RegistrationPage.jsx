import styles from './RegistrationPage.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fieldValidators } from '../../modules/validators.js';

const RegistrationPage = () => {
  const { state: { eventId } } = useLocation();
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    source: 'friends',
    eventId,
    registrationDate: Date.now(),
  });
  const navigation = useNavigate();

  const check = (formData) => {
    let errors = {};

    for (let field of Object.keys(formData)) {

      if(typeof formData[field] !== 'string') continue;

      const value = formData[field].trim() || '';
      const validators = fieldValidators[field] || [];

      if (!validators.length) continue;

      const error = validators.map(validator => validator(value)).find(error => error);

      if (error) {
        errors = { ...errors, [field]: error }
      }
    }

    return errors;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData)
    const errors = check(formData);

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const res = await fetch('https://eventboard-6yuf.onrender.com/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData, birthDate: new Date(formData.birthDate).getTime()})
    });

    if (res.ok) {
      navigation("/");
    }
  }

  const isRadioSelected = (value) => formData.source === value;

  return (
    <div>
      <h1>Event Registration</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.infoFieled}>
          <label htmlFor='name'>Full name</label>
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="name" />
          {errors.name && <p className={styles.error} >{errors.name}</p>}
        </div>
        <div className={styles.infoFieled}>
          <label htmlFor='email'>Email</label>
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id="email" />
          {errors.email && <p className={styles.error} >{errors.email}</p>}
        </div>
        <div className={styles.infoFieled}>
          <label htmlFor='birthDate'>Birth date</label>
          <input value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} type="date" id="birthDate" />
          {errors.birthDate && <p className={styles.error} >{errors.birthDate}</p>}
        </div>
        <h4 className={styles.radioHeader}>Where did you hear about this event ?</h4>
        <div className={styles.radio}>
          <div>
            <input checked={isRadioSelected("social media")} onChange={(e) => setFormData({ ...formData, source: e.target.value })} type="radio" id="варіант1" name="source" value="social media" />
            <label htmlFor="варіант1">social media</label>
          </div>
          <div>
            <input checked={isRadioSelected("friends")} onChange={(e) => setFormData({ ...formData, source: e.target.value })} type="radio" id="варіант2" name="source" value="friends" />
            <label htmlFor="варіант2">friends</label>
          </div>
          <div>
            <input checked={isRadioSelected("found myself")} onChange={(e) => setFormData({ ...formData, source: e.target.value })} type="radio" id="варіант3" name="source" value="found myself" />
            <label htmlFor="варіант3">found myself</label>
          </div>
        </div>
        <button className={styles.submitBut}>submit</button>
      </form>
    </div>
  );
}

export default RegistrationPage;