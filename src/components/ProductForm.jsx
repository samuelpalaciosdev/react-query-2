import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products-api';

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('Product added');
      queryClient.invalidateQueries('products'); // Refresh interface
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProduct.mutate({
      ...product,
      inStock: true,
    });
    console.log(product);
  };

  return (
    <>
      <h2>heys</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />

        <label htmlFor="price">Price</label>
        <input type="text" id="price" name="price" />

        <button>Add product</button>
      </form>
    </>
  );
};

export default ProductForm;
