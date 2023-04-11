const url = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
let quote = document.querySelector("#quote");

let xhrButton = document.querySelector("#xhr");
xhrButton.addEventListener("click", () => {
  let XHR = new XMLHttpRequest();
  XHR.onreadystatechange = () => {
    if (XHR.readyState == 4 && XHR.status == 200) {
      let message = JSON.parse(XHR.responseText)[0];
      quote.innerText = message;
    }
  };
  XHR.open("GET", url);
  XHR.send();
});

let fetchButton = document.querySelector("#fetch");
fetchButton.addEventListener("click", () => {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(displayErrors);
});
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}
function parseJSON(res) {
    return res.json();
}
function updateProfile(data) {
  quote.innerText = data[0];
}
function displayErrors(err) {
  console.log(err);
}

$("#jquery").click(() => {
  $.getJSON(url)
    .done((data) => {
      let text = data[0];
      quote.innerText = text;
    })
    .fail(() => {
      alert("Something went wrong!");
    });
});

let axiosButton = document.querySelector("#axios");
axiosButton.addEventListener("click", () => {
  axios
    .get(url)
    .then((res) => {
      let response = res.data[0];
      quote.innerText = response;
    })
    .catch((err) => {
      if (err.response) {
        console.log("Problem with response ", err.response.status);
      } else if (err.request) {
        console.log("{Problem with request");
      } else {
        console.log("Error", err.message);
      }
    });
});
