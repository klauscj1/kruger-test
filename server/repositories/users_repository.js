const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const readUsersFile = () => {
  try {
    const jsonString = fs.readFileSync("data/users.json");
    const users = JSON.parse(jsonString);
    return users;
  } catch (err) {
    console.log(err);
    return;
  }
};

const writeUsersFile = (users) => {
  try {
    const jsonString = JSON.stringify(users);
    fs.writeFileSync("data/users.json", jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
};

const insertUser = (user) => {
  user.id = uuidv4();
  const users = readUsersFile();
  const newUsers = [...users, user];
  writeUsersFile(newUsers);
  return readUsersFile();
};

const getUserByUsernameAndPassword = (username, password) => {
  try {
    const users = readUsersFile();
    const userFinded = users.find(
      (user) => user.username === username && user.password === password
    );
    return userFinded;
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = {
  insertUser,
  getUserByUsernameAndPassword,
};
