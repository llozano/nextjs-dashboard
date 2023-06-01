'use client';

import { useRef, MutableRefObject, useState } from 'react';
import { Button, Card } from "@tremor/react";
import { PaperAirplaneIcon } from "@heroicons/react/outline";

const errors: {[key: string]: string } = {
  valueMissing: 'Field is required',
  tooLong: 'Field exceeds the max number of characters',
  typeMismatch: 'Invalid value'
}

/**
 * Validate a single field ValidityState
 * @type {[type]}
 */
const validateField = (state: ValidityState): Array<string> | null => {
  if (!state || state.valid) {
    return null;
  }

  const invalid = [];

  state.valueMissing && invalid.push('valueMissing');
  state.tooLong && invalid.push('tooLong');
  state.typeMismatch && invalid.push('typeMismatch');

  return invalid;
}

/**
 * HTML5 form validation. Collection of errors
 */
const validateForm = (form: {[key: string]: MutableRefObject<any>}): {[key: string]: any } => {
  const invalidFields: {[key: string]: string } = {};
  const fields = Object.keys(form);

  for (const field of fields) {
    const validation = validateField(form[field].current.validity);
    if (Array.isArray(validation) && validation.length > 0) {
      invalidFields[field] = validation[0]; // Only the first error
    }
  }

  const formResults: {[key: string]: any } = {};
  for (const [key, value] of Object.entries(invalidFields)) {
    formResults[key] = errors[value];
  }

  formResults['invalid'] = (Object.keys(formResults).length > 0);

  return formResults;
}

export default function Contact() {
  const textClassName = `mt-1 p-2 block w-full rounded-md bg-gray-100 border-transparent
    focus:border-gray-500 focus:bg-white focus:ring-0`;
  const numOfRows = 5;
  const form = {
    it: useRef<HTMLFormElement>(null),
    fullname: useRef(null),
    email: useRef(null),
    comments: useRef(null),
    doyouloveit: useRef(null)
  };
  const [formValidation, setFormValidation] = useState({});

  /**
   * Handle form submit event
   */
  const handleSubmit = (event: any): void => {
    event.preventDefault();

    const validation = validateForm(form);
    setFormValidation(validation); // Refresh validation only onSubmit

    if (!validation.invalid) {
      const formEl = event.target!;
      const formData = new FormData(formEl);

      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);

      form.it.current?.reset();
    }
  };

  return (
    <Card>
      <form method="post" onSubmit={handleSubmit} ref={form.it} noValidate autoComplete="off">
        <div className="grid grid-cols-1 gap-6 mt-6 ml-8 mr-8">

          <label className="block">
            <span className="text-gray-700">Full name</span>
            <input type="text" name="fullname" className={textClassName} placeholder=""
              ref={form.fullname} required maxLength={300} />
            <span className="text-xs text-red-500">
              { /** @ts-expect-error */ }
              {formValidation.fullname}
            </span>
          </label>

          <label className="block">
            <span className="text-gray-700">Email address</span>
            <input type="email" name="email" className={textClassName} placeholder="pewpew@email.com"
              ref={form.email} required maxLength={300} />
            <span className="text-xs text-red-500">
              { /** @ts-expect-error */ }
              {formValidation.email}
              </span>
          </label>

          <label className="block">
            <span className="text-gray-700">comments</span>
            <textarea name="comments" className={textClassName} rows={numOfRows}
              ref={form.comments} maxLength={500}></textarea>
            <span className="text-xs text-red-500">
              { /** @ts-expect-error */ }
              {formValidation.comments}
            </span>
          </label>

          <div className="block">
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input type="checkbox" name="doyouloveit" className="rounded bg-gray-200 border-transparent
                    focus:border-transparent focus:bg-gray-200 text-gray-700
                    focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                    ref={form.doyouloveit} />
                  <span className="ml-2">Love this sample app!</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" icon={PaperAirplaneIcon}>
              Send
            </Button>
          </div>

        </div>
      </form>
    </Card>
  );
}
