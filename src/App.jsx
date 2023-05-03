import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [ filterText, setFilterText ] = useState('')
  const [ isStockOnly, setIsStockOnly ] =useState(false)
  return (
    <div>
      <SearchBar 
      filterText={filterText}
      isStockOnly={isStockOnly}
      onFilterTextChange={setFilterText}
      onIsStockOnlyChange={setIsStockOnly} />
      <ProductTable 
      products={products} 
      filterText={filterText}
      isStockOnly={isStockOnly} />
    </div>
  );
}

function SearchBar({
  filterText,
  isStockOnly,
  onFilterTextChange,
  onIsStockOnlyChange,}) {
  return (
    <form>
    <input 
    type="text" 
    value={filterText} 
    placeholder="search here.." 
    onChange={(e)=> onFilterTextChange(e.target.value)}  />
    <label>
      <input 
      type="checkbox" 
      checked={isStockOnly}
      onChange={(e)=> onIsStockOnlyChange(e.target.checked)}/>
      {' '}
      Only show products in stock
    </label>
    </form>
  
  );
}

function ProductTable ({ products, filterText, isStockOnly }) {
  const rows = [];
  let nullCategory = null;

  products.forEach((product) => {
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase())=== -1){
      return;
    }
    if (isStockOnly && !product.stocked){
      return;
    }

    if(product.category !== nullCategory) {
      rows.push(
      <ProductCategoryRow 
      category={product.category}
      key={product.category} />
      )
    }
    rows.push(
      <ProductRow
      product={product}
      key={product.name} />
    )
    nullCategory = product.category;
  })

  return  (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow ({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductRow ({ product }) {
  const name = product.stocked ? product.name : 
  <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}


const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
