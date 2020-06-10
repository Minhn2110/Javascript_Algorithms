/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
const Ajax = {

  AjaxGetNoToken: (url, dataType) => new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: url,
      // data: data,
      dataType: dataType || 'json',
      contentType: 'application/json; charset=utf-8',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      crossDomain: true,
    }).done((response) => {
      resolve(response);
    }).fail((jqXHR, textStatus, errorThrown) => {
      reject(textStatus, jqXHR, errorThrown);
    });
  }),
  getDataFromAjaxGetNoToken: async (url, dataType) => {
    const dataResult = await Ajax.AjaxGetNoToken(url, dataType);
    return dataResult;
  },
  AjaxGet: (url, token) => new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // beforeSend(request) {
      //   request.setRequestHeader('RequestVerificationToken', token);
      // }
    }).done((response) => {
      resolve(response);
    }).fail((jqXHR, textStatus, errorThrown) => {
      reject(textStatus, jqXHR, errorThrown);
    });
  }),
  getDataFromAjaxGet: async (url, token) => {
    const dataResult = await Ajax.AjaxGet(url, token);
    return dataResult;
  },
  AjaxPostWithToken: (type, url, data, token, dataType) => new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url: url,
      data: JSON.stringify(data),
      dataType: dataType || 'json',
      contentType: 'application/json; charset=utf-8',
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // crossDomain: true,
      beforeSend(request) {
        request.setRequestHeader('RequestVerificationToken', token);
      },
    }).done((response) => {
      resolve(response);
    }).fail((jqXHR, textStatus, errorThrown) => {
      reject(textStatus, jqXHR, errorThrown);
    });
  }),
  getDataFromAjaxPostWithToken: async (type, url, data, token, dataType) => {
    const dataResult = await Ajax.AjaxPostWithToken(type, url, data, token, dataType);
    return dataResult;
  },
  getFileFromAjax: (url, body, file_Name, file_Type, token) => {
    const req = new XMLHttpRequest();
    req.open('POST', url, true);
    // req.setRequestHeader('Content-Type', 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL');
    req.responseType = 'blob';
    if (token) {
      req.setRequestHeader('RequestVerificationToken', token);
    }
    req.send(body);
    req.onload = () => {
      console.log('STATUS ', req.status, req.message);
      if (req.status == 200) {
        const blob = req.response;
        const fileName = `${file_Name}_${Ajax.getCurrentDate()}.${file_Type}`;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      } else {
        Ajax.openToastr(1500, 'toast-top-center', 'Không có dữ liệu', 'error');
      }
    };
  },
  AjaxFormData: (url, data, token) => new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      beforeSend(request) {
        request.setRequestHeader('RequestVerificationToken', token);
      },
    }).done((response) => {
      resolve(response);
    }).fail((jqXHR, textStatus, errorThrown) => {
      reject(textStatus, jqXHR, errorThrown);
    });
  }),
  getDataFromAjaxFormData: async (url, data, token) => {
    const dataResult = await Ajax.AjaxFormData(url, data, token);
    return dataResult;
  },
  // ================================================================================================================== //
  // =================================== XML=========================================================================== //
  // ================================================================================================================== //

  requestDataFromUrl: url => new Promise((resolve) => {
    const xhrHttp = new XMLHttpRequest();
    xhrHttp.responseType = 'json';
    xhrHttp.onreadystatechange = () => {
      if (xhrHttp.readyState === 4 && xhrHttp.status === 200) {
        resolve(xhrHttp.response);
      }
    };
    xhrHttp.open('GET', url, true);
    xhrHttp.send();
  }),
  getDataFromUrl: async (url) => {
    const dataResult = await Global.requestDataFromUrl(url);
    return dataResult;
  },
  requestDataFromUrlWithHeader: (url, header) => new Promise((resolve) => {
    const xhrHttp = new XMLHttpRequest();
    xhrHttp.responseType = 'json';
    xhrHttp.onreadystatechange = () => {
      if ((xhrHttp.readyState === 4 && xhrHttp.status === 200)
        || xhrHttp.readyState === XMLHttpRequest.DONE) {
        resolve(xhrHttp.response);
      }
    };
    xhrHttp.open('GET', url, true);
    xhrHttp.setRequestHeader('secret-key', header);
    xhrHttp.send();
  }),
  getDataFromUrlWithHeader: async (url, header) => {
    const dataResult = await Global.requestDataFromUrlWithHeader(url, header);
    return dataResult;
  },
  requestDataFromUrlPost: (url, data) => new Promise((resolve) => {
    const xhrHttp = new XMLHttpRequest();
    const jsonData = JSON.stringify(data);
    xhrHttp.responseType = 'json';
    xhrHttp.open('POST', url, true);
    xhrHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhrHttp.onload = () => {
      if (xhrHttp.readyState === 4 && xhrHttp.status === 200) {
        resolve(xhrHttp.response);
      }
    };
    xhrHttp.send(jsonData);
  }),
  getDataFromUrlPost: async (url, data) => {
    const dataResult = await Global.requestDataFromUrlPost(url, data);
    return dataResult;
  },
};


export default Ajax;
