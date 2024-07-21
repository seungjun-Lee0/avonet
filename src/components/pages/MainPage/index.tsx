// src/components/pages/MainPage/index.tsx
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import React, { useEffect, useState } from 'react';
import Footer from 'src/components/common/Footer';
import ProductItem from 'src/components/common/ProductItem';
import {
  MainPageAppBarLeft,
  MainPageAppBarRight,
} from 'src/components/common/Stackflow';
import { ItemsWrapper } from 'src/components/pages/MainPage/styled';
import { ProductInterface } from 'src/schemas/Product';
import { getProductList } from 'src/services/product';
import { useFlow } from 'src/utils/stackflow';

const MainPage: ActivityComponentType = () => {
  const { push } = useFlow();

  const goToDetailPage = (id: number) => {
    console.log('Navigating to DetailPage with id:', id);

    push('DetailPage', { id: id.toString() });
  };

  const [products, setProducts] = useState<ProductInterface[]>([]);

  const loadProducts = async () => {
    try {
      const productsData = await getProductList();
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

 

  return (
    <AppScreen
      appBar={{
        appendLeft: MainPageAppBarLeft,
        appendRight: MainPageAppBarRight,
      }}
    >
      <ItemsWrapper>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            item={product}
            onClickItem={() => {
              goToDetailPage(product.id);
            }}
          ></ProductItem>
        ))}
      </ItemsWrapper>
      <Footer />
    </AppScreen>
  );
};

export default MainPage;
