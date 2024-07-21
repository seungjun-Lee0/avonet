// import { AxiosResponse } from 'axios';
// import { UserInterface } from 'src/schemas/Product';
// import client from './_client';

// export const getUserData = (userId: number): Promise<AxiosResponse<UserInterface>> => {
//   return client.get(`users/${userId}`);
// };

// src/services/userService.ts
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { UserInterface } from 'src/schemas/Product';

export const getUserData = async (userId: number): Promise<UserInterface> => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('userID', '==', +userId));
  const usersSnapshot = await getDocs(q);

  if (usersSnapshot.empty) {
    throw new Error('User not found');
  }

  const userDoc = usersSnapshot.docs[0];
  const data = userDoc.data();

  return {
    profileImg: data.profileImg,
    userName: data.userName,
    rating: data.rating,
    userID: data.userID as number,
    location: data.location,
    other: data.other,
  } as UserInterface;
};
