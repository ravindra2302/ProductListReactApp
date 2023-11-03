import React, { useState } from 'react';
import styled from 'styled-components';

const products = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 19.99,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 29.99,
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Description for Product 3',
    price: 14.99,
  },
  {
    id: 4,
    title: 'Product 4',
    description: 'Description for Product 4',
    price: 24.99,
  },
  {
    id: 5,
    title: 'Product 5',
    description: 'Description for Product 5',
    price: 22.99,
  },
  // Add more products here
];


const ProductList = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sort === 'price') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'title') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <Filters>
        <input
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </Filters>
      <ProductGrid>
        {currentProducts.map((product) => (
          <ProductCard key={product.id}>
            <img src={`product${product.id}.jpg`} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </ProductCard>
        ))}
      </ProductGrid>
      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <PageNumber
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </PageNumber>
          )
        )}
      </Pagination>
    </div>
  );
};

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  input {
    padding: 5px;
  }
  select {
    padding: 5px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  transition: transform 0.2s;
  img {
    max-width: 100%;
  }
  h3 {
    margin: 10px 0;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  cursor: pointer;
  margin: 0 10px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export default ProductList;
