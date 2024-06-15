import { Field, Form, Formik } from "formik";
import css from "../SearchBar/SearchBar.module.css";

const initialValues = {
  query: "",
};

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, action) => {
    if (values.query.trim() === "") return;

    onSubmit(values.query);
    action.resetForm();
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            name="query"
            className={css.field}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
