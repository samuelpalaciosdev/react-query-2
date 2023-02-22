import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct, updateProduct } from '../api/products-api';

const Products = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: products,
    isError,
    erro,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products'); // Refresh interface
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products'); // Refresh interface
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <h3>{product.description}</h3>
          <h3>{product.price}</h3>
          <button onClick={() => deleteProductMutation.mutate(product.id)}>
            Delete
          </button>
          <input
            type="checkbox"
            checked={product.inStock}
            id={product.id}
            onChange={e => {
              console.log({
                ...product,
                inStock: e.target.checked,
              });
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              });
            }}
          />
          <label htmlFor={product.id}>In stock</label>
        </div>
      ))}
    </>
  );
};

export default Products;
