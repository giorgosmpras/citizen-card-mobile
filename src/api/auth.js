import client from "./client";

// function to use the login api
export const logUser = async (userInfo) => {
  try {
    const { data } = await client.post(
      `/api/mobile/user-login?mobile=${userInfo.mobile}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};

// function to use the otp-confirm api to crosscheck with the otp sent to user
export const validateUser = async (userInfo) => {
  try {
    const { data } = await client.post(
      `/api/mobile/otp-confirm?mobile=${userInfo.mobile}&OTP=${userInfo.otp}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
