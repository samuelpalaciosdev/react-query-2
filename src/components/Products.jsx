import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct } from '../api/products-api';

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
          <input type="checkbox" name="stock" id="stock" />
          <label htmlFor="stock">In stock</label>
        </div>
      ))}
    </>
  );
};

export default Products;
