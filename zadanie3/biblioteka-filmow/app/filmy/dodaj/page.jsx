'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import useFetch from '../../../hooks/useFetch'


const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Min 2 characters long')
    .required('Required field'),

  year: Yup.number()
    .integer('Must be an integer')
    .min(1888, 'Must be more than 1888')
    .max(2030, 'Must be less than 2030')
    .required('Required field'),

  genre: Yup.string().required('Required field'),
})

export default function AddFilmPage() {
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const router = useRouter()

    async function handleAddTask(values) {
    

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`/api/filmy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? `HTTP ${response.status}`);
      }

      router.push('/filmy')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to add task');
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <div>
      <h1>Dodaj film</h1>

      <Formik
        initialValues={{
          title: '',
          year: 1888,
          genre: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAddTask(values)}
      >
        {({ errors, touched }) => (
          <Form >
            <div>
              <Field
                name="title"
                placeholder="Title"
              />

              {touched.title && errors.title && (
                <p>{errors.title}</p>
              )}
            </div>

            <div>
              <Field
                name="year"
                type="number"
                placeholder="Year"
              />

              {touched.year && errors.year && (
                <p>{errors.year}</p>
              )}
            </div>

            <div>
              <Field
                name="genre"
                placeholder="Genre"
              />

              {touched.genre && errors.genre && (
                <p>{errors.genre}</p>
              )}
            </div>

            <button type="submit">
              Add Film
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}