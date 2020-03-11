import { getData } from "./Fetch";

const KEY = "__TOKEN__";

async function GetUserByTokenFromServer () {
  const token = localStorage.getItem(KEY);
  
  if (!token) return null;

  const url = `/validate-token`;  
  const response = await getData(url);

  console.log("response", response);

  return response;
}

async function SaveJWTTokenInLocalStorage (token) {
  try {
    console.log("SaveJWTTokenInLocalStorage -> ", token);
    if (!token) throw new Error("Token cannot be null");
    await localStorage.setItem(KEY, token);
    return true;
  } catch (error) {
    console.log("SaveJWTTokenInLocalStorage", error);
    throw error;
  }
}

async function logout (url) {
  try {
    await getData(url);
    localStorage.removeItem(KEY);
    window.location.href = "/";
  } catch (error) {
    console.log("RemoveJWTToken", error);
    throw error;
  }
}

export { GetUserByTokenFromServer, SaveJWTTokenInLocalStorage, logout };