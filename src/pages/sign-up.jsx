import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { CodeVivaLogo } from "@/components/generic/Icons";
import Meta from "@/components/generic/Meta";
import FormTitle from "@/components/generic/form/FormTitle";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/generic/form/Button";
import { NEXT_PUBLIC_BASE_URL } from "@/utils/config";
import { queryClient } from "@/utils/queryClient";

const SignUp = () => {
  const { register } = useAuth();
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("values", values);
    setSubmitting(true);
    try {
      const signupRes = await register(
        values.email,
        values.password,
        values.name
      );
      console.log("signupRes", signupRes);
      console.log("signupRes", signupRes?.accessToken);
      localStorage.setItem("user", JSON.stringify(signupRes?.providerData[0]));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(signupRes?.accessToken)
      );
      queryClient.refetchQueries(["user"]);
      router.push("/");
      toast.success("Signed up successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setFieldError("general", err.message);
        toast.error(err?.message);
      } else {
        setFieldError("general", "An unknown error occurred.");
        toast.error("An unknown error occurred while signing up");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
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
            <FormTitle title="Sign Up" />
          </div>
          <div className="flex justify-end mt-3 text-center font-jost text-[16px]">
            Already have an account?
            <Link href="/login" className="underline text-primary ">
              {" "}
              Login
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
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className="alert alert-danger">{msg}</div>}
                  </ErrorMessage>
                </div>

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
                  className="bg-primary hover:bg-purple-700 h-9"
                  fullWidth
                  title={isSubmitting ? "" : "SignUp"}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
