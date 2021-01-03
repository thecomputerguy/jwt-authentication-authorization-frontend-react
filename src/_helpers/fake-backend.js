let users = JSON.parse(localStorage.getItem("users")) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = (url, opts) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          let params = JSON.parse(opts.body);
          let filteredUsers = users.filter((user) => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: "fake-jwt-token",
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson)),
            });
          } else {
            reject("Username or password is incorrect");
          }

          return;
        }

        if (url.endsWith("/users") && opts.method === "GET") {
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users)),
            });
          } else {
            reject("Unauthorized");
          }

          return;
        }

        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            //find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter((user) => user.id === id);
            let user = matchedUsers.length ? matchedUsers[0] : null;
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(user)),
            });
          } else {
            reject("Unauthorized");
          }
          return;
        }

        if (url.endsWith("/users/register") && opts.method === "POST") {
          let newUser = JSON.parse(opts.body);
          let duplicateUser = users.filter(
            (user) => user.username === newUser.username
          );
          if (duplicateUser.length >= 1) {
            reject(`username with ${newUser.username} is already taken`);
            return;
          }

          newUser.id = users.length
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          resolve({ ok: true, text: () => Promise.resolve() });
          return;
        }

        //delete user
        if (url.match(/\/users\/\d+$/) && opts.method === "DELETE") {
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let index = 0; index < users.length; index++) {
              const user = users[index];
              if (user.id === id) {
                //delete user
                users.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(users));
                break;
              }
            }

            //response 200 ok
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            reject("Unauthorised");
          }

          return;
        }

        realFetch(url, opts).then((response) => resolve(response));
      }, 500);
    });
  };
}
