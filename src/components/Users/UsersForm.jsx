import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Users.css';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    if (userSelected !== null) {
      //   alert('cambio user selected');
      setFirstName(userSelected.first_name);
      setLastName(userSelected.last_name);
      setEmail(userSelected.email);
      setPassword(userSelected.password);
      setBirthday(userSelected.birthday);
    }
  }, [userSelected]);

  /*Funcion del boton para enviar el formulario */ /* e.preventDefault(); = para que la pagina no se recargue al hacer submit */

  const submit = (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      birthday: birthday,
    };
    // console.log(user);
    ///Este es para actualizar
    if (userSelected !== null) {
      alert('Actualizando ');
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
          user
        )
        .then(() => {
          getUsers();
          reset();
          deselectUser();
        });
    } else {
      axios
        .post('https://users-crud1.herokuapp.com/users/', user)
        .then(() => {
          getUsers();
          reset();
        })
        .catch((error) => console.log(error.response));
    }
  };

  /**Para resetear los campos del imput  */

  const reset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setBirthday('');
  };

  const cancel = () => {
    reset();
    deselectUser();
  };

  return (
    <form onSubmit={submit}>
      <div className="container-form">
        <div className="container-cars-from">
          <h1>CRUD USERS</h1>
          <div className="cantainer-info">
            <label htmlFor="firstName">Name: </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="cantainer-info">
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="cantainer-info">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="cantainer-info">
            <label htmlFor="password">Pass: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="cantainer-info">
            <label htmlFor="birthday">Birthday: </label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <button className="button-submit">Submit</button>
          <button className="button-cancel" type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UsersForm;
