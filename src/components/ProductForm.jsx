const ProductForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
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
