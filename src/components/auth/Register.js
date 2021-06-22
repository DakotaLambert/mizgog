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

              fetch("http://localhost:8088/books", {
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
                    fetch("http://localhost:8088/potions", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        name: "APPRENTICE POTION",
                        description:
                          "The basic potion for all apprentice Wizards. This potion grants you the ability to create more advanced potions.",
                        color: "#0a0eeb",
                        bookId: createdBook.id,
                      }),
                    })
                      .then((res) => res.json())
                      .then((createdPotion) => {
                        if (createdPotion.hasOwnProperty("id")) {
                          fetch("http://localhost:8088/potionIngredients", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              potionId: createdPotion.id,
                              ingredientId: 1,
                            }),
                          })
                            .then((res) => res.json())
                            .then(() => {
                              fetch("http://localhost:8088/potionIngredients", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  potionId: createdPotion.id,
                                  ingredientId: 2,
                                }),
                              });
                            })
                            .then(() => {
                              fetch("http://localhost:8088/potions", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  name: "QUICK HANDS",
                                  description:
                                    "Boosts agility for quicker potion creation, or other nefarious uses.",
                                  color: "#e1ff00",
                                  bookId: createdBook.id,
                                }),
                              })
                                .then((res) => res.json())
                                .then((createdPotionTwo) => {
                                  if (createdPotionTwo.hasOwnProperty("id")) {
                                    fetch(
                                      "http://localhost:8088/potionIngredients",
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          potionId: createdPotionTwo.id,
                                          ingredientId: 3,
                                        }),
                                      }
                                    ).then(() => {
                                      fetch(
                                        "http://localhost:8088/potionIngredients",
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            potionId: createdPotionTwo.id,
                                            ingredientId: 4,
                                          }),
                                        }
                                      ).then(() => {
                                        history.push("/");
                                      });
                                    });
                                  }
                                });
                            });
                        }
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
