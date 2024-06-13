export const StoreManager =
  'http://admin-staging-env.eba-83mm9fea.ap-south-1.elasticbeanstalk.com/api/v1/';
// export const accessKey = 'cb910d4a-bf60-11ed-814d-0252190a7100';

export const AccountManager = 'https://accountstaging.krenai.in/api/v4/';

export const GetPrefernces = () =>
  `http://admin-staging-env.eba-83mm9fea.ap-south-1.elasticbeanstalk.com/api/v4/catalogue/product/abstract?id=0&isFeatured=0&isNotFeatured=0&adminId=0&statusIds=1&brandIds=&categoryIds=&subCategoryIds=&subSubCategoryIds=&sortOrder=asc&sortBy=name&itemsPerPage=18&currentPage=1&search=&adminIds=&isManualOrder=0&searchTag=`;

export const SocialLogin = () => `${StoreManager}fasto/customer/social-login`;

export const RefreshToken = (refreshToken, idToken) =>
  `${AccountManager}user/refresh/access/token?refreshToken=${refreshToken}&idToken=${idToken}`;

export const CreatePrefernce = () => `${StoreManager}fasto/customer/perfrences`;

export const linkQrList = () =>
  `${StoreManager}fasto/customer/linked-qr?itemsPerPage=10&currentPage=1`;

export const PostLinkQr = () => `${StoreManager}fasto/customer/scan-qr`;

export const SuggestedProductList = () =>
  `${StoreManager}fasto/customer/perfrences`;

export const deleteSupplier = () => `${StoreManager}fasto/customer/linked-qr`;

export const addAddress = () => `${StoreManager}fasto/customer/address`;

export const fetchAddress = () =>
  `${StoreManager}fasto/customer/address?itemsPerPage=10&currentPage=1`;
