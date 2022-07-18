import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import UsersList from './components/Users/UsersList';
import UsersForm from './components/Users/UsersForm';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  /*******************CRUD USERS********************* */

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  /* para pasar el edit del UserLis al input en el UsersForm */

  useEffect(() => {
    axios
      .get('https://users-crud1.herokuapp.com/users/')
      .then((res) => setUsers(res.data));
  }, []);
  console.log(users);

  /* Para enviar el formulario ya no solo de forma local usar el get */
  const getUsers = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
  };

  /******************************************************************* */

  /******** Para Editar la info de cada card en el UsersList************* */
  const selectUser = (user) => {
    setUserSelected(user);
  };

  /**Para el boton cancelar de UserList */
  const deleteUser = (id) => {
    alert(id);
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
  };

  /**Para resetear los campos del imput  */
  const deselectUser = () => setUserSelected(null);

  return (
    <div>
      {/* <CarsList cars={cars} /> */}
      <UsersForm
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}
      />
      <UsersList
        users={users}
        selectUser={selectUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default App;
