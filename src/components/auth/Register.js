import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const username = useRef();
  const conflictDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(
      `http://localhost:8088/users?username=${username.current.value}`
    )
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.current.value,
          }),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("wizard", createdUser.id);

              fetch("http://localhost:8088/Books", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: "Beginners",
                  userId: createdUser.id,
                }),
              })
                .then((res) => res.json())
                .then((createdBook) => {
                  if (createdBook.hasOwnProperty("id")) {
                    fetch("http://localhost:8088/Potions", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: "Apprentice Potion",
                        description:
                          "The basic potion for all apprentice Wizards. This potion grants you the ability to create more advanced potions.",
                        color: "#0a0eeb",
                        bookId: createdBook.id,
                      }),
                    })
                      .then((res) => res.json())
                      .then(() => {
                        fetch("http://localhost:8088/Potions", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: "Quick Hands",
                            description:
                              "Boosts agility for quicker potion creation, or other nefarious uses.",
                            color: "#e1ff00",
                            bookId: createdBook.id,
                          }),
                        }).then(() => {
													history.push("/")
												});
                      });
                  }
                });
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that username address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="mizgogPageHeader">Please Register</h1>
        <fieldset>
          <label htmlFor="inputusername"> Create Username </label>
          <input
            ref={username}
            type="username"
            name="username"
            className="form-control"
            placeholder="Create Username"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Sign in </button>
        </fieldset>
      </form>
    </main>
  );
};


//2 posts for each potion for ingredients, post for PotionIngredients table, book detail, potion detail, styling