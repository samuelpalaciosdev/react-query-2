const baseUrl = 'http://localhost:3000/products';

export const getProducts = async () => {
  const res = await fetch(`${baseUrl}/`);
  const data = await res.json();
  return data;
};

export const createProduct = async product => {
  const res = await fetch(`${baseUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return res;
};

export const deleteProduct = id => {
  const res = fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  return res;
};

export const updateProduct = async product => {
  const res = await fetch(`${baseUrl}/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return res;
};
