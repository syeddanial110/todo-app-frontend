import axios from "axios";

// import * as auth from './UserAuth'
// export const apiBaseUrl = "http://localhost:4041/api";
export const apiBaseUrl = "http://localhost:5000/api";
// export const apiBaseUrl = "https://7474-2400-adc1-1bf-e800-b996-b2f8-cb06-40d0.in.ngrok.io/api";
export const production = false;
export function getCommonHeaders(h) {
  var headers = {
    //    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
//   var token = getToken();
//   if (token) headers.Authorization = `Bearer ${token}`;
  if (h) headers = { ...h, ...headers };
  return headers;
}


export function apiPost(endpoint, body, onSuccess, headers) {
  axios
    .post(apiBaseUrl + endpoint, body, {
      headers: getCommonHeaders(headers),
    })
    .then((response) => {
      //if (onSuccess)
      onSuccess(response.data);
      // console.log(response)
      // return response
    })
    .catch((error) => {
      if (error.StatusCode === 401) {
        // localStorage.clear();
        //localStorage.setItem('tokenExpire', 'true');
        //window.location.href = '/?tokenExpire=true';
      }
      return error;
    });
}

export function apiGet(endpoint, onSuccess, onFailure, headers) {
  axios
    .get(apiBaseUrl + endpoint, {
      headers: getCommonHeaders(headers),
    })
    .then((response) => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch((error) => {

      if (onFailure) onFailure(error);
    });
}

export function apiPut(endPoint, body, onSuccess, onFailure, headers) {
  axios
    .put(apiBaseUrl + endPoint, body, {
      headers: getCommonHeaders(headers),
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      if (onFailure) onFailure(error);
    });
}



export function apiDelete(endpoint, onSuccess, onFailure, headers) {
  axios
    .delete(apiBaseUrl + endpoint, {
      headers: getCommonHeaders(headers),
    })
    .then((response) => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch((error) => {
      if (onFailure) onFailure(error);
    });
}

export function fileUpload(endpoint, file) {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + getToken());
  var formdata = new FormData();
  formdata.append("file", file, file.filename);
  // console.log('file', file)
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log("requestOptions", requestOptions);

  return (
    fetch(apiBaseUrl + endpoint, requestOptions)
      //  return fetch("https://pakfit-dev.herokuapp.com/api/admin/management/voicenote/save", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("result",result)
        // console.log(result.voiceNote)
        // console.log()
        return result;
        // return result.voiceNote.id
      })
      .catch((error) => console.log("error", error))
  );
}

export async function FetchAPI(
  endPoint,
  method = "GET",
  body,
  hasFile,
  file,
  onSuccess,
  onFailure,
  headers
) {
  var options = {
    method,
    headers: getCommonHeaders(headers, true),
    redirect: "follow",
  };

  if (method != "GET" && body) Object.assign(options, { body });

  if (hasFile) {
    var formdata = new FormData();
    formdata.append("file", file, file.filename);
    Object.assign(options, { body: file });
  }
  console.log("formdata", formdata);
  await fetch(apiBaseUrl + endPoint, options)
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      if (onFailure) onFailure(error);
    });
}
