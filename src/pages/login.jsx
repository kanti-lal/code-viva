import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { NEXT_PUBLIC_BASE_URL } from "@/utils/config";
import Meta from "@/components/generic/Meta";
import Button from "@/components/generic/form/Button";
import { CodeVivaLogo, GoogleIcon } from "@/components/generic/Icons";
import FormTitle from "@/components/generic/form/FormTitle";
const Login = () => {
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("values", values);
    setSubmitting(true);
    try {
      await login(values.email, values.password);
      router.push("/");
      toast.success('Login successfully!')
    } catch (err) {
      if (err instanceof Error) {
        setFieldError("general", err.message);
        console.log("err kkkk", err.message);
        toast.error(err.message);
      } else {
        setFieldError("general", "An unknown error occurred.");
        toast.error("An unknown error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogleClickHandle = () => {
    signInWithGoogle()
  };

  return (
    <div className="container  mx-auto">
      <div className="min-h-screen flex items-center justify-center">

        <Meta
          title="Login"
          keyword="login, user login, codeviva"
          description="Login to your account to access the platform."
          canonicalUrl={NEXT_PUBLIC_BASE_URL}
        />
        <div className="p-8 box auth-form w-full lg:w-1/3 border mx-auto">
          <div className="flex justify-center">
            <CodeVivaLogo />
          </div>
          <div className="my-3">
            <FormTitle title="Log In" />
          </div>
          <div className="my-3 text-center flex justify-end font-jost texy-[16px]">
          Dont have an account?
            <Link href="/sign-up" className="underline text-primary ">
              {" "}
            Sign-Up
            </Link>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ErrorMessage name="general">
                  {(msg) => <div className="alert alert-danger">{msg}</div>}
                </ErrorMessage>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                  Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className="alert alert-danger">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                  Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div className="alert alert-danger">{msg}</div>}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  defaultStyle
                  btnLoader={isSubmitting}
                  className="bg-primary hover:bg-purple-700"
                  fullWidth
                  title={isSubmitting ? "" : "Log In"}
                // title={isSubmitting ? "Logging In..." : "Log In"}
                />
              </Form>
            )}
          </Formik>
          <div className="text-center mt-6">
            <h2>Login Via</h2>

            <div className="flex justify-center mt-2">
              <Button
                title=""
                onClick={onGoogleClickHandle}
                icon={<GoogleIcon />}
              />
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default Login;
