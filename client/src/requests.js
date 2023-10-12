const baseUrl = 'http://127.0.0.1:3000/api/v1/';

async function get(path) {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      credentials: 'include',
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function request(path, body, method) {
  try {
    const options = {
      method: method || 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${baseUrl}${path}`, options);

    if (response.ok) {
      return response.json();
    } else {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

const webApi = { get, request };

export const Transaction = {
  index() {
    return webApi.get('transactions');
  },
  create(body) {
    return webApi.request('transactions', body, 'POST');
  },
  update(id, body) {
    return webApi.request(`transactions/${id}`, body, 'PATCH');
  },
  destroy(id) {
    return webApi.request(`transactions/${id}`, {}, 'DELETE');
  },
};

export const Category = {
  index() {
    return webApi.get('categories');
  },
  create(body) {
    return webApi.request('categories', body, 'POST');
  },
};

export const Session = {
  create(requestBody) {
    return webApi.request('session', requestBody);
  },
  destroy() {
    return webApi.request('session', {}, 'DELETE');
  },
  current() {
    return webApi.get('session/current');
  },
};

export const User = {
  create(requestBody) {
    return webApi.request('users', requestBody);
  },
  current() {
    return webApi.get('users/current');
  },
};
