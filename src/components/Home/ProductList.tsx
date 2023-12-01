// import NoResults from '@/components/ui/no-results';
import ProductCard from './ProductCard';

export interface Product {
  name: string;
  description: string;
  price: string;
  images: {
    url: string;
  }[];
  category: string;
  // size: Size;
  // color: Color;
}

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className='space-y-4'>
      <h3 className='font-bold text-xl sm:text-3xl'>{title}</h3>
      {/* {items.length === 0 && <NoResults />} */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.map((item) => (
          <ProductCard key={item.name} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
