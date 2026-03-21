import axios, {
  AxiosError,
  type AxiosResponse,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://103.173.226.3:8080/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = await TOKEN_STORAGE.getTokens();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      // await TOKEN_STORAGE.clearTokens();
      //check if current screen is login or register
      // if (
      //   router.getCurrentRoute()?.name === "auth/login" ||
      //   router.getCurrentRoute()?.name === "auth/register"
      // ) {
      //   return;
      // }
      // router.dismissAll();
      // router.replace("/auth/login");
      // toastService.error("Đăng nhập hết hạn", "Vui lòng đăng nhập lại");
    }
    if (error?.code === 'ERR_NETWORK') {
      console.log(error)
      // toastService.error(
      //   "Lỗi kết nối",
      //   "Vui lòng kiểm tra kết nối mạng của bạn"
      // );
    }
    return Promise.reject(
      typeof error.response?.data === 'object' &&
        error.response.status !== HttpStatusCode.NotFound
        ? error.response?.data
        : error,
    )
  },
)
