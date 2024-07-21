// import { AxiosResponse } from 'axios';
// import { ProductInterface } from 'src/schemas/Product';
// import client from './_client';

// // 메인페이지 리스트
// export const getProductList = (): Promise<AxiosResponse<ProductInterface[]>> => {
//   return client.get('/product');
// };

// export const getProductData = (productId: number): Promise<AxiosResponse<ProductInterface>> => {
//   return client.get(`/product/${productId}`);
// };


// src/services/productService.ts
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { ProductInterface } from 'src/schemas/Product';

export const getProductData = async (productId: number): Promise<ProductInterface> => {
  const productsCollection = collection(db, 'products');
  const q = query(productsCollection, where("id", "==", +productId));

  const productsSnapshot = await getDocs(q);

  if (productsSnapshot.empty) {
    throw new Error('Product not found');
  }

  const productDoc = productsSnapshot.docs[0];
  const data = productDoc.data();
  console.log(data)

  return {
    id: data.id as number,
    views: data.views,
    userID: data.userID,
    img: data.img,
    dates: data.dates,
    info: data.info,
    favorites: data.favorites,
    name: data.name,
    price: data.price,
    category: data.category,
    chats: data.chats,
    location: data.location,
  } as ProductInterface;
};

export const getProductList = async (): Promise<ProductInterface[]> => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  console.log(productsSnapshot)

  const productList: ProductInterface[] = productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    
    // 타입을 명시적으로 변환합니다.
    return {
      id: data.id as number, // 명시적으로 number로 변환
      views: data.views,
      userID: data.userID,
      img: data.img,
      dates: data.dates,
      info: data.info,
      favorites: data.favorites,
      name: data.name,
      price: data.price,
      category: data.category,
      chats: data.chats,
      location: data.location,
    } as ProductInterface;
  });

  return productList;
};