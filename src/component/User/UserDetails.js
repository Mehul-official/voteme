import React from 'react';
const userData = (localStorage.userDetails) ? JSON.parse(localStorage.userDetails) : '';
export const userDetails = (userData.Data && userData.Data.user) ? userData.Data.user : '';
export const token = (userData.Data && userData.Data.AuthoToken) ? userData.Data.AuthoToken : '';
export const tokenExpireIn = (userData.Data && userData.Data.TokenExpireIn) ? userData.Data.TokenExpireIn : '';
export const UserImage = (userDetails.Image && userDetails.Image != '') ? userDetails.Image : '';
export const user_id = (userDetails._id && userDetails._id != '') && userDetails._id;