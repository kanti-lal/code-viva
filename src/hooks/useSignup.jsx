import { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { allRoutes } from '../constants/allRoutes';
import { useAuth } from '../context/AuthContext';
import { alphanumericRegex, validateAge } from '../helpers';
import AxiosInstance from '../helpers/AxiosRequest';

const useSignUp = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingResendPass, setLoadingResendPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSocialInfoModal, setShowSocialInfoModal] = useState(false);

  const [showForgotPassInfoModal, setShowForgotPassInfoModal] = useState(false);
  const [userResId, setUserResId] = useState();
  const [socialKey, setSocialKey] = useState();

  const navigate = useNavigate();

  console.log('in hook', showModal);
  const intl = useIntl();

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
      dateOfBirth: Yup.date()
        .nullable()
        .test('is-adult', 'You must be at least 18 years old', validateAge)
        .required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),
      favouriteCar: Yup.string().required('Favorite car is required'),
    });
  };

  const signInfoValidationSchema = () => {
    return Yup.object().shape({
      // name: Yup.string().required('Name is required').matches(alphanumericRegex, 'Name must be alphanumeric'),
      username: Yup.string().required('Username is required'),
      dateOfBirth: Yup.date()
        .nullable()
        .test('is-adult', 'You must be at least 18 years old', validateAge)
        .required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),
      favouriteCar: Yup.string().required('Favorite car is required'),
    });
  };

  const OtpModalClose = () => {
    setShowModal(false);
  };

  const forgotPassInfoModalClose = () => {
    setShowForgotPassInfoModal(false);
  };

  const SignupInfoModalClose = () => {
    setShowSocialInfoModal(false);
  };

  const SignupInstaInfoModalClose = () => {
    setShowInstaInfoModal(false);
  };

  

  const handleOtpVerify = async (otp, _id) => {
    try {
      if (otp) {
        setLoadingOtpVerify(true);

        const verifyOtpBody = {
          id: userResId,
          otp,
        };

        const verifyOtpRes = await AxiosInstance.post('/user/verify-otp', verifyOtpBody);
        console.log('verifyOtpRes = ', verifyOtpRes?.data);
        localStorage.setItem('accessToken', verifyOtpRes?.data?.token);
        localStorage.setItem('user', JSON.stringify(verifyOtpRes?.data?.data));
        toast.success(verifyOtpRes?.data?.message);
        setShowModal(false);
        navigate(allRoutes.home);
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 200);
      }
    } catch (error) {
      if (error.error?.statusCode === 400 && error.error?.message === 'OTP is invalid or expired') {
        toast.error(error?.response?.data?.message);
        setShowModal(true);
      }
      console.log('Error 9', error?.message, error?.response?.data?.message);
      toast.error(error?.response?.data?.message || error?.message);
      // setShowModal(false);
    } finally {
      setLoadingOtpVerify(false);
    }
  };


  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      console.log('values = ', values);

      const res = await register(values.email, values.password);

      console.log('res = ', res);

      const body = { idToken: res?.user?.accessToken, ...values };

      delete body.email;
      delete body.password;
      delete body.confirmPassword;

      console.log('body', body);
      const response = await AxiosInstance.post('/user/signup', body);
      console.log('response = ', response);
      const { _id } = response.data.data;
      setUserResId(_id);

      console.log('sign', values, response);
      // navigate(allRoutes.statistics);
      // toast.success(intl.formatMessage({ id: 'login.success' }));

      setShowModal(true);
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
        console.log('google login', res);
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

  useEffect(() => {
    let redirectTimeout;

    const getCodeFromUrl = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code && code !== undefined) {
          console.log('hook:', code);
          const res = await AxiosInstance.post('/user/instagram-login', { code });
          // console.log('insta ', res?.data);

          // localStorage.setItem('insta', JSON.stringify(res?.data));
          setInstaToken(res?.data?.data?.token);
          // console.log('tok status', res?.data);

          const dataKeys = Object.keys(res.data.data);
          // console.log('datakey', dataKeys, dataKeys.length);

          if (res.data.data && dataKeys.length <= 1) {
            setShowInstaInfoModal(true);
          } else {
            localStorage.setItem('accessToken', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data));
            console.log('res.data.data insta', res.data.data);
            console.log('res.data.data insta 2', res.data);
            toast.success(res.data.message);
            navigate(allRoutes.home);
            setTimeout(() => {
              window.location.href = window.location.origin;
            }, 200);
          }
        }
      } catch (error) {
        console.error('Error while fetching Instagram login:', error);
        // Handle error, maybe show a message to the user
      }
    };

    getCodeFromUrl();

    // return () => {
    //   clearTimeout(redirectTimeout);
    // };
  }, []);

 

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
        console.log('oobCode in handle', code);
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
    showModal,
    handleOtpVerify,
    handleGetOtp,
    handleGoogleAuth,
    handleFacebookAuth,
    handlResendOtp,
    loadingGetOtp,
    loadingOtpVerify,
    showSocialInfoModal,
    handleSocialInfo,
    signInfoValidationSchema,
    loadingInfo,
    loadingResendPass,
    OtpModalClose,
    SignupInfoModalClose,
    handleInstagramLogin,
    handleInstaSocialInfo,
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