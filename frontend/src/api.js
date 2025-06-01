// src/api.js
const BASE_URL = 'http://localhost:3000/api/journals';

export const getEntries = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

export const addEntry = async (entry) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return await response.json();
};

export const updateEntry = async (id, updatedEntry) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEntry),
  });
  return await response.json();
};

export const deleteEntry = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};

export const getCurhatAIResponse = async (message) => {
  const response = await fetch(`${BASE_URL}/curhat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return await response.json();
};