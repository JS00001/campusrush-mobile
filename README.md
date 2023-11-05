## CampusRush Mobile Application (React Native)

### Folder Layout

### UI Component Documentation

### Lib Function Documentation

### Validating Form Fields

The function for validating form fields is imported from `lib/validation/index.tsx`. Import it as shown below:

```typescript
import validate from "@/lib/validation";
```

Once imported, create a wrapper, with all the data needed. The `validate` function takes an object with the following properties:

```typescript
/**
 * The values of the form
 */
values: T;
/**
 * The fields to validate
 */
fields: (keyof T)[];
/**
 * The formik form instance
 */
form: FormikHelpers<T>;
/**
 * The validation function
 */
validatorFn: (values: T) => Partial<Record<keyof T, string>>;
```

The wrapper should look like this:

```typescript
// The validation function, takes certain fields so we dont update all errors at once
const validateFields = (fields: (keyof typeof form.values)[]) => {
  return validate({
    form,
    fields,
    values: form.values,
    validatorFn: validators.<Validation Function Name>,
  });
};
```

### Catching Errors in API Responses

The function for catching errors in API responses is imported from `lib/errors.tsx`. Import it as shown below:

```typescript
import errors from "@/lib/errors";
```

Once imported, wrap your request in a try catch, and add the following code to the catch block:

```typescript
errors.handleApiError(error, form);
```

The wrapper should look like this:

```typescript
// The response from the server
let response;

try {
  // Send the request
  response = await <Function to reques to API, such as mutation.mutateAsync(values)>
} catch (error) {
  errors.handleApiError(error, form);
}
// If there was an error, prevent the "success" code from running
if (!response) return;

/**
 * Perform actions on success
 */
```

You can also use it in a form's onSubmit function as such:

```typescript
// The function to run when the form is submitted
const onSubmit = async (values: typeof form.values) => {
  // The response from the server
  let response;

  try {
    // Attempt to update the organization
    response = await mutation.mutateAsync(values);
  } catch (error) {
    errors.handleApiError(error, form);
  }
  // If there was an error, prevent the "success" code from running
  if (!response) return;

  /**
   * Perform actions on success
   */
};
```
