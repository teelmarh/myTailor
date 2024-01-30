import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import ClothType from "./dropdown";
import { useNavigate } from 'react-router-dom';

const Createorder = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log(values);
    navigate("/create-order/form2");
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header
        title="CREATE ORDER"
        subtitle="Create a New Order"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue, // Added for setting the clothType value
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Other form fields */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerName}
                name="customerName"
                error={!!touched.customerName && !!errors.customerName}
                helperText={touched.customerName && errors.customerName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

              {/* ClothType dropdown */}
              <ClothType
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={(value) => {
                  // Set the clothType value
                  setFieldValue("clothType", value);
                  handleChange("clothType")(value); // Manually trigger the change event
                }}
              />

              {/* Additional fields based on the selected clothType */}
              {values.clothType === "shirt" && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Additional Field"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.additionalField}
                  name="additionalField"
                  error={!!touched.additionalField && !!errors.additionalField}
                  helperText={touched.additionalField && errors.additionalField}
                  sx={{ gridColumn: "span 4" }}
                />
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="end"
              mt="20px"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Continue
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  customerName: yup.string().required("required"),
  gender: yup.string().required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  clothType: yup.string().required("required"),
  additionalField: yup.string(), // Validation for additional field, adjust as needed
});

const initialValues = {
  customerName: "",
  gender: "",
  phone: "",
  clothType: "",
  additionalField: "", // Initial value for additional field
};

export default Createorder;
