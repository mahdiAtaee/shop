import React, { useMemo, useState } from 'react'
import "../../theme/zaman.css"
import { DatePicker } from "zaman";
import Content from '../partial/Content'
import { Button, FormControl, FormControlLabel, FormGroup, Input, TextField, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import useForm from '../util/useForm';
import { validateForm } from '../util/validationForm';
import ICoupon from './ICoupon';
import Http from '../../services/Http';
import {useNavigate} from 'react-router-dom'


function important<T>(value: T): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: "block",
            width: "50%",
            margin: important(theme.spacing(2, 1)),
        },
        button: {
            margin: important(theme.spacing(2))
        },
        error: {
            color: "red"
        }
    })
);

const CreateCoupon = () => {
    const navigate = useNavigate()
    const httpClient = useMemo(() => new Http(), [])
    const styles = useStyles()
    const [date, setDate] = useState(new Date)
    const initialValues: Partial<ICoupon> = {
        code: '',
        limit: 0,
        percent: 0,
        expires_at: new Date,
        constraints: {
            user: '',
            minPrice: 0,
            maxPrice: 0,
            firstPurchase: false as boolean
        }
    };

    const {
        values,
        errors,
        touched,
        handleInputChange,
        handleBlur,
        setErrors,
        setFieldValue,
        handleCheckBoxChange,
        resetForm
    } = useForm(initialValues, false, validateForm);

    const handleCreateCoupon = async (e: React.MouseEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            values.expires_at = date
            await httpClient.post('api/v1/admin/coupons', values)
                .then(response => {
                    console.log(response)
                    navigate('/coupons')
                })
                .catch(error => console.log(error))
            
            // resetForm(); // Optional: reset form after submission
        }
    };
    return (
        <Content title='ایجاد کوپن جدید'>
            <FormControl className={styles.formControl}>
                <TextField
                    id="code"
                    name='code'
                    label="کد تخفیف*"
                    value={values.code}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors['code'] ? true : false}
                    helperText={errors['code'] && (
                        errors['code']
                    )}
                />
            </FormControl>
            <FormControl className={styles.formControl}>
                <TextField
                    value={values.percent}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    id="percent"
                    name='percent'
                    label="درصد تخفیف*"
                    variant="outlined"
                    fullWidth
                    error={errors['percent'] ? true : false}
                    helperText={errors['percent'] && (
                        errors['percent']
                    )}
                />
            </FormControl>
            <FormControl className={styles.formControl}>
                <TextField
                    value={values.limit}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    id="limit"
                    name='limit'
                    label="تعداد*"
                    variant="outlined"
                    fullWidth
                    error={errors['limit'] ? true : false}
                    helperText={errors['limit'] ? (
                        errors['limit']
                    ) : "تعداد ۰ به معنای نامحدود می باشد"}
                />
            </FormControl>
            <FormControl className={styles.formControl}>
                <DatePicker
                    className='jalaliDate'
                    round="x4"
                    position="right"
                    onChange={(e) => setDate(e.value as Date)}
                />
                {/* <TextField id='expireAt' name='expireAt' type='date' variant='outlined' fullWidth helperText="عدم ثبت تاریخ یعنی کد هرگز منقضی نمی شود" /> */}
            </FormControl>
            <Content title='شرایط استفاده'>
                <FormControl className={styles.formControl}>
                    <TextField
                        value={values.constraints.user}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        id="constraints.user"
                        name='user'
                        label="کاربر"
                        variant="outlined"
                        fullWidth
                        helperText="فقط این کاربر میتواند از این کد تخفیف استفاده کند" />
                </FormControl>
                <FormControl className={styles.formControl}>
                    <TextField
                        value={values.constraints.minPrice}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        id="constraints.minPrice"
                        name='lowerBoundery'
                        label="حداقل قیمت سفارش"
                        variant="outlined"
                        fullWidth
                        helperText="زمانی قابل استفاده است که قیمت نهایی سفارش بیشتر از این مقدار باشد" />
                </FormControl>
                <FormControl className={styles.formControl}>
                    <TextField
                        value={values.constraints.maxPrice}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        id="constraints.maxPrice"
                        name='upperBoundary'
                        label="حداکثر قیمت سفارش"
                        variant="outlined"
                        fullWidth
                        helperText="زمانی قابل استفاده است که قیمت نهایی سفارش کمتر از این مقدار باشد" />
                </FormControl>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="constraints.firstPurchase"
                                name='firstPurchase'
                                checked={values.constraints.firstPurchase as boolean}
                                onChange={handleCheckBoxChange} />
                        }
                        label="فقط برای اولین خرید" />
                </FormGroup>
            </Content>
            <Button variant='contained' onClick={handleCreateCoupon} color='primary' className={styles.button}>
                ثبت کد تخفیف
            </Button>
        </Content>
    )
}

export default CreateCoupon