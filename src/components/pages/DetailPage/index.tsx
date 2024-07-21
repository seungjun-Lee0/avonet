// src/components/pages/DetailPage/index.tsx
import { AppScreen } from '@stackflow/plugin-basic-ui';
import React, { useEffect, useState } from 'react';
import { DetailPageBackButton } from 'src/components/common/Stackflow';
import { useFlow } from 'src/utils/stackflow';
import styled from 'styled-components';
import { UserInterface } from 'src/schemas/Product';
import { ProductInterface } from '../../../schemas/Product';
import { getUserData } from 'src/services/user';
import { getProductData } from 'src/services/product';
import UserProfile from 'src/components/pages/DetailPage/components/UserProfile';
import ProductDetail from 'src/components/pages/DetailPage/components/ProductDetail';
import OtherItems from 'src/components/pages/DetailPage/components/OtherItems';

type DetailParams = {
  params: {
    id: string;
  };
};

const DetailPage: React.FC<DetailParams> = ({ params: { id } }) => {
  const { pop } = useFlow();

  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const productData = await getProductData(Number(id));
      if (!productData) {
        throw new Error('Product not found');
      }
      setProduct(productData);

      const userData = await getUserData(productData.userID);
      if (!userData) {
        throw new Error('User not found');
      }
      setUser(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <AppScreen
      appBar={{
        backButton: {
          render: () => <DetailPageBackButton onClick={pop} />,
        },
      }}
    >
      <ContentWrapper className={loading ? 'loading' : 'loaded'}>
        {loading ? (product &&
          user && (
            <section>
              <ProductImageWrapper>
                <img src={product.img} alt="product" width="100%" />
              </ProductImageWrapper>
              <UserProfile 
                profileImg={user.profileImg || ''} // Provide a default value
                userName={user.userName || 'Unknown User'} // Provide a default value
                rating={user.rating || 0} // Provide a default value
                location={user.location || 'Unknown Location'} // Provide a default value
              />
              <ProductDetail {...product} />
              <OtherItems userName={user.userName} other={user.other} />
            </section>
          )
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          product &&
          user && (
            <section>
              <ProductImageWrapper>
                <img src={product.img} alt="product" width="100%" />
              </ProductImageWrapper>
              <UserProfile 
                profileImg={user.profileImg || ''} // Provide a default value
                userName={user.userName || 'Unknown User'} // Provide a default value
                rating={user.rating || 0} // Provide a default value
                location={user.location || 'Unknown Location'} // Provide a default value
              />
              <ProductDetail {...product} />
              <OtherItems userName={user.userName} other={user.other} />
            </section>
          )
        )}
      </ContentWrapper>
    </AppScreen>
  );
};

export default DetailPage;

const ContentWrapper = styled.div`
 
`;

const ProductImageWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
