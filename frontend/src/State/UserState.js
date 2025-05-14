import {proxy} from 'valtio'

let storedUser = null;

try {
  const user = localStorage.getItem("user");
  storedUser = user ? JSON.parse(user) : null;
  console.log("Stored user:", storedUser);
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const usrState = proxy({
    userId: storedUser,
})

export default usrState