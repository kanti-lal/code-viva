import {  useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { allRoutes } from '../constants/allRoutes';
import { useAuth } from '../context/AuthContext';
import { alphanumericRegex } from '../helpers';
import AxiosInstance from '../helpers/AxiosRequest';

const useSignUp = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingResendPass, setLoadingResendPass] = useState(false);
  const [showSocialInfoModal, setShowSocialInfoModal] = useState(false);

  const [showForgotPassInfoModal, setShowForgotPassInfoModal] = useState(false);
  const [socialKey, setSocialKey] = useState();

  const navigate = useNavigate();

  const { register, signInWithGoogle, forgotPassword, resetPassword, handleAuthError } = useAuth();
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required('Name is required').matches(alphanumericRegex, 'Name must be alphanumeric'),
      // username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),

    });
  };




  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await register(values.email, values.password);
      const body = { idToken: res?.user?.accessToken, ...values };
      delete body.email;
      delete body.password;
      delete body.confirmPassword;
      const response = await AxiosInstance.post('/user/signup', body);
      // const { _id } = response.data.data;
      console.log('response', response)
      // setUserResId(_id);
      toast.success('Login Successfully');

    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      console.log('Error occurred during login: --f', error);
      console.log('errormesg', error.message);
      toast.error(errorMsg || error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const handleGoogleAuth = () => {
    signInWithGoogle()
      .then(async (res) => {
        const reqObj = {
          idToken: res?.user?.accessToken || res?.accessToken,
          loginType: 'google',
          // notificationToken: messagingToken,
        };
        setSocialKey(res?.user?.accessToken || res?.accessToken);
        console.log('google login', socialKey);
        localStorage.setItem('googleAuthResponse', JSON.stringify(res));
        const { data } = await AxiosInstance.post('user/is-user-verified', { email: res?.user?.email });

        if (data?.statusCode === 200 && data?.data?.isVerified) {
          const { data: signInData } = await AxiosInstance.post('user/social-signin', reqObj);
          console.log('signIndata =', signInData);
          localStorage.setItem('accessToken', signInData?.token);

          localStorage.setItem('user', JSON.stringify(signInData.data));
          toast.success(signInData.message);
          navigate(allRoutes.home);
          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 200);
        } else {
          setShowSocialInfoModal(true);
        }
      })
      .catch((err) => {
        console.log('con errr', err, handleAuthError(err));
        // toast.error(err.message || err?.response?.data?.message);
        toast.error(handleAuthError(err));
      });
  };


  const handleForgotPassword = (values) => {
    setLoading(true);
    forgotPassword(values.email)
      .then((res) => {
        console.log('forgot res', res);
        setShowForgotPassInfoModal(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error forgot password:', error);
      });
  };

  const handleResendPassword = (values) => {
    setLoadingResendPass(true);
    forgotPassword(values.email)
      .then((res) => {
        console.log('forgot res', res);
        toast.success('La contraseña se reenvió exitosamente. Revisar correo electrónico.');
        setShowForgotPassInfoModal(false);
        navigate(allRoutes.resetPassword);
        setLoadingResendPass(false);
      })
      .catch((error) => {
        console.error('Error forgot password:', error);
      });
  };

  const handleResetPassword = async (code, values) => {
    setLoading(true);
    console.log('oobCode out handle', code);

    try {
      if (code) {
        const res = await resetPassword(code, values.password);
        console.log('oobcode handle', res);
        toast.success('Restablecer contraseña exitosamente');
        setLoading(false);
        navigate(allRoutes.login);
      } else {
        throw new Error('oobCode not found in URL');
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      toast.error('Error al restablecer la contraseña');
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
    validationSchema,
    handleGoogleAuth,
    handleFacebookAuth,
    handlResendOtp,
    loadingGetOtp,
    loadingOtpVerify,
    showSocialInfoModal,
    handleSocialInfo,
    loadingInfo,
    loadingResendPass,
    OtpModalClose,
    SignupInfoModalClose,
    SignupInstaInfoModalClose,
    loadingInstaInfo,
    handleForgotPassword,
    handleResetPassword,
    showForgotPassInfoModal,
    forgotPassInfoModalClose,
    handleResendPassword,
  };
};

export default useSignUp;