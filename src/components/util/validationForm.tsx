// validation.ts
import { FormValues, FormErrors } from './useForm';

export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  if (!values.code) {
    errors.code = "مقدار کد تخفیف اجباری می باشد";
  } else if (values.code.length < 3) {
    errors.code = "کد تخفیف باید بیشتر از ۳ کاراکتر باشد";
  }
  
  if (!values.percent) {
    errors.percent = "مقدار درصد تخفیف اجباری می باشد";
  }

  if (!values.limit) {
    errors.limit = "مقدار تعداد اجباری می باشد";
  }
  
  return errors;
};