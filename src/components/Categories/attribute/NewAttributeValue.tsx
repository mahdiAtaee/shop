import React, { ChangeEvent } from 'react'
import { TextField, FormControl, Box, FormLabel, RadioGroup, Radio, FormControlLabel, SelectChangeEvent, Theme, FormGroup } from "@mui/material"
import FilterValueEnum from './FilterValueEnum'
import { makeStyles, createStyles } from "@mui/styles";
import BadgeInput from './BadgeInput';
import { useCategoriesState } from '../context';

// STYLES
function important<T>(value: T): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (value + " !important") as any;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            padding: important(theme.spacing(1)),
            fontSize: ".9em",
        },
        formControl: {
            margin: important(theme.spacing(1, 0)),
            flexGrow: 1,
            maxWidth: "50%"
        },
        formGroup: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: important("row"),
            gap: "1rem"
        },
    })
);

// Props Validation
interface INewAttributeValueProps {
    hash: string
}

const NewAttributeValue = ({ hash }: INewAttributeValueProps) => {
    const styles = useStyles()
    const { dispatch } = useCategoriesState()

    const handleChangeAttributeType = (e: SelectChangeEvent<FilterValueEnum>, child: React.ReactNode) => {
        const value = e.target.value
        dispatch({
            type: "UPDATE_ATTRIBUTE_TYPE",
            payload: { type: value }
        })
    }

    const handleChangeAttributeName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch({
            type: "UPDATE_ATTRIBUTE_NAME",
            payload: { name: value }
        })
    }

    const handleChangeAttributeSlug = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch({
            type: "UPDATE_ATTRIBUTE_SLUG",
            payload: { slug: value }
        })
    }



    return (
        <Box marginTop="1rem">
            <FormGroup className={styles.formGroup}>
                <FormControl className={styles.formControl}>
                    <TextField
                        id="name"
                        name="name"
                        label="عنوان ویژگی"
                        variant="outlined"
                        onChange={handleChangeAttributeName}
                    />
                </FormControl>
                <FormControl className={styles.formControl}>
                    <TextField
                        id="slug"
                        name="slug"
                        label="اسلاگ - انگلیسی"
                        variant="outlined"
                        placeholder="مثلا: size,colors,material,brand"
                        onChange={handleChangeAttributeSlug}
                    />
                </FormControl>
            </FormGroup>
            <FormGroup className={styles.formGroup}>
                <FormControl className={styles.formControl}>
                    <FormLabel id="demo-radio-buttons-group-label">
                        نوع ویژگی
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={handleChangeAttributeType}
                    >
                        <FormControlLabel value={FilterValueEnum.NUMBER} control={<Radio />} label="ارقام: مثل مبلغ" />
                        <FormControlLabel value={FilterValueEnum.TEXT} control={<Radio />} label="حروف: مثل برند" />
                        <FormControlLabel value={FilterValueEnum.MULTI_SELECT} control={<Radio />} label="لیست کشویی چندتایی:‌مثل رنگ ها" />
                        <FormControlLabel value={FilterValueEnum.SELECT} control={<Radio />} label="لیست کشویی : برند ها" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={styles.formControl}>
                    <BadgeInput title="مقادیر ویژگی" placeholder="مثلا:مشکی،سفید،آبی" hashID={hash} />
                </FormControl>
            </FormGroup>
        </Box>
    )
}

export default NewAttributeValue