import React, { useState } from 'react';
import './Users.css';

const UsersList = ({ users, selectUser, deleteUser }) => {
  /**Para paginar los usuarios */

  const [page, setPage] = useState(1);
  const lastIndex = page * 4; //Muestra un Usuario por pagina
  const firsIndex = lastIndex - 4;
  const usersPaginated = users.slice(firsIndex, lastIndex);

  const lastPage = Math.ceil(users.length / 4); //Este es para saber cual es la ultima pagina
  const numbers = [];
  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }
  /*********************************** */
  return (
    <div className="container-list">
      <div className="section-list-button">
        <h1>Users List</h1>
        <button
          className="button-previo"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previo
        </button>
        {/* mostrando los numero de paginacion con la const numbers */}
        {numbers.map((number) => (
          // <div className="container-button-page">
          <button className="button-page" onClick={() => setPage(number)}>
            {number}
          </button>
        ))}

        <button
          className="button-next"
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage}
        >
          Next
        </button>
      </div>
      <div className="card-list">
        <ul>
          {usersPaginated.map((user) => (
            <li className="card-list-li">
              <h3>
                Full Name:{' '}
                <strong>
                  {' '}
                  {user.first_name} {user.last_name}{' '}
                </strong>
              </h3>
              <p>Birthday: {user.birthday}</p>
              <p>Email: {user.email}</p>
              <p>Pass: {user.password}</p>
              <button
                className="button-edit"
                type="button"
                onClick={() => selectUser(user)}
              >
                Edit
              </button>
              <button
                className="button-delete"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
