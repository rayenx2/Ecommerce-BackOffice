const BASE_URL = "https://api.escuelajs.co/api/v1/";

export const GET = async (info, id = "") => {
  const res = await fetch(BASE_URL + info + id);
  return await res.json();
};

export const POST = (info, body) => {
  return fetch(BASE_URL + info, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const DELETE = (info, id) => {
  return fetch(BASE_URL + info + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT = (info, body, id) => {
  return fetch(BASE_URL + info + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
