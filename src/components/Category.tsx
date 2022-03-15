function Category(props: CategoryProps) {
  return (
    <>
      <h2>{props.category.name}</h2>
      <p>{props.category.description}</p>
    </>
  );
}

export default Category;
