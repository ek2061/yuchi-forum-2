export const InfoIncomplete = {
  status: 400,
  msg: "請求的欄位不全",
};
export const InfoError = {
  status: 400,
  msg: "請求的格式或內容錯誤",
};
export const GetDataError = {
  status: 500,
  msg: "取得資料發生錯誤",
};
export const ServerError = {
  status: 500,
  msg: "伺服器發生錯誤",
};
export const PostNotExist = {
  status: 404,
  msg: "貼文不存在",
};
export const CommentNotExist = {
  status: 404,
  msg: "評論不存在",
};
export const UserAlreadyExist = {
  status: 409,
  msg: "使用者帳戸已存在",
};
export const UserOrPasswordError = {
  status: 400,
  msg: "使用者帳戸或密碼錯誤",
};
export const TokenError = {
  status: 400,
  msg: "憑證無效",
};
export const PermissionDenied = {
  status: 400,
  msg: "拒絕不符合權限的操作",
};
