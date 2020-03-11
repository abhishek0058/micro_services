const getData = async (url) => {
  console.log(url)
  try {
    const obj = {};
    const token = localStorage.getItem("__TOKEN__");
    if (token) obj["headers"] = { "x-access-token": token };

    const response = await fetch(url, obj);
    const result = await response.json();

    if (!result.status && result.message) {
      alert(result.message);
    }

    return result;
  } catch (e) {
    console.log(url, e)
  }
}

const postData = async (url, body) => {
  console.log(url, body);
  try {
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(body)
    };

    const token = localStorage.getItem("__TOKEN__");
    if (token) obj["headers"]["x-access-token"] = token;

    const response = await fetch(url, obj);
    const result = await response.json();
    if (!result.status && result.message) {
      alert(result.message);
    }
    return result;
  } catch (e) {
    console.log(url, e)
    return e;
  }
}

const putData = async (url, body) => {
  console.log(url, body);
  try {
    const obj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(body)
    };

    const token = localStorage.getItem("__TOKEN__");
    if (token) obj["headers"]["x-access-token"] = token;

    const response = await fetch(url, obj);
    const result = await response.json();
    if (!result.status && result.message) {
      alert(result.message);
    }
    return result;
  } catch (e) {
    console.log(url, e)
    return e;
  }
}

export { getData, postData, putData };