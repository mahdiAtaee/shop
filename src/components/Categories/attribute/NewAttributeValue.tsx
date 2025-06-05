import React, { ChangeEvent, useState } from 'react'
import { TextField, FormControl, Box, FormLabel, RadioGroup, Radio, FormControlLabel, SelectChangeEvent, Theme, FormGroup, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import FilterValueEnum from './FilterValueEnum'
import { makeStyles, createStyles } from "@mui/styles";
import BadgeInput from './BadgeInput';
import { useCategoriesState } from '../context';
import { v4 as uuid } from 'uuid';

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
        AddAttributeValue: {
            padding: important(theme.spacing(2, 1)),
            width: '100%',
            backgroundColor: 'blue'
        },
        attrValue: {
            padding: important(theme.spacing(0.5, 2)),
            margin: important(theme.spacing(1, 0.5)),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.grey[300],
            width: "maxContent",
            display: 'inline-block'
        }
    })
);

// Props Validation
interface INewAttributeValueProps {
    hash: string
}

const NewAttributeValue = ({ hash }: INewAttributeValueProps) => {
    const [showAddAttributeValue, setShowAddAttributeValue] = useState<boolean>(false)
    const [attributeOption, setAttributeOption] = useState([{
        label: '',
        value: ''
    }])
    const [attributeRangeBucket, setAttributeRangeBucket] = useState([{
        min: 0,
        max: 0,
        label: ''
    }])
    const [attributeMin, setAttributeMin] = useState<number>(0)
    const [attributeMax, setAttributeMax] = useState<number>(0)
    const [attributeValue, setAttributeValue] = useState<string>('')
    const [attributeLabel, setAttributeLabel] = useState<string>('')
    const [attributeType, setAttributeType] = useState<FilterValueEnum>()
    const styles = useStyles()
    const { dispatch } = useCategoriesState()

    const handleChangeAttributeType = (e: SelectChangeEvent<FilterValueEnum>, child: React.ReactNode) => {
        const value = e.target.value
        setAttributeType(value as FilterValueEnum)
        dispatch({
            type: "UPDATE_ATTRIBUTE_TYPE",
            payload: { type: value, hash }
        })
    }

    const handleChangeAttributeName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch({
            type: "UPDATE_ATTRIBUTE_NAME",
            payload: { name: value, hash }
        })
    }

    const handleChangeAttributeSlug = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch({
            type: "UPDATE_ATTRIBUTE_SLUG",
            payload: { slug: value, hash }
        })
    }

    const addAttributeSelectValue = () => {
        if (attributeType == FilterValueEnum.SELECT || attributeType == FilterValueEnum.MULTI_SELECT) {
            setAttributeOption(prev => [
                ...prev,
                {
                    label: attributeLabel,
                    value: attributeValue
                }
            ])
            dispatch({
                type: "UPDATE_ATTRIBUTE_VALUES",
                payload: {
                    hash: hash,
                    value: attributeValue,
                    label: attributeLabel,
                    type: attributeType
                }
            })
        } else if (attributeType == FilterValueEnum.RANGE) {
            setAttributeRangeBucket(prev => [
                ...prev,
                {
                    min: attributeMin,
                    max: attributeMax,
                    label: attributeLabel
                }
            ])
            dispatch({
                type: "UPDATE_ATTRIBUTE_VALUES",
                payload: {
                    hash: hash,
                    min: attributeMin,
                    max: attributeMax,
                    label: attributeLabel,
                    type: attributeType
                }
            })
        }
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
                        <FormControlLabel value={FilterValueEnum.RANGE} control={<Radio />} label="رنج : مثل محدوده وزنی" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={styles.formControl}>
                    {(attributeType == FilterValueEnum.SELECT || attributeType == FilterValueEnum.RANGE) &&
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => setShowAddAttributeValue(true)}
                        >
                            اضافه کردن مقدار ویژگی(برای خاصیت های محدوده،لیست،لیست چندتایی)</Button>
                    }

                    <div>
                        {attributeType == FilterValueEnum.SELECT &&
                            attributeOption.map(option => (
                                <>
                                    {(option.label && option.value) &&
                                        <span className={styles.attrValue}>{option.label}:{option.value}</span>
                                    }
                                </>
                            ))
                        }
                        {attributeType == FilterValueEnum.RANGE &&
                            attributeRangeBucket.map(range => (
                                <div>
                                    {(range.min > 0 && range.max > 0) &&
                                        <div className={styles.attrValue}>
                                            <span>{range.label} </span>
                                            <span>از {range.min} تا {range.max}</span>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>

                    {/* // dialog for add values */}
                    <Dialog open={showAddAttributeValue} maxWidth="xs" fullWidth={true}>
                        <DialogTitle>مقادیر ویژگی</DialogTitle>
                        {attributeType == FilterValueEnum.SELECT &&
                            <DialogContent>
                                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                                    <TextField
                                        id="label"
                                        name="label"
                                        label="عنوان"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAttributeLabel(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                                    <TextField
                                        id="value"
                                        name="value"
                                        label="مقدار"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAttributeValue(e.target.value)
                                        }}
                                    />
                                </FormControl>
                            </DialogContent>
                        }
                        {attributeType == FilterValueEnum.RANGE &&
                            <DialogContent>
                                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                                    <TextField
                                        id="label"
                                        name="label"
                                        label="عنوان"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAttributeLabel(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                                    <TextField
                                        type='number'
                                        id="min"
                                        name="min"
                                        label="حداقل (از)"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAttributeMin(e.target.value as unknown as number)
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                                    <TextField
                                        id="max"
                                        name="max"
                                        label="حداکثر (تا)"
                                        variant="outlined"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setAttributeMax(e.target.value as unknown as number)
                                        }}
                                    />
                                </FormControl>
                            </DialogContent>
                        }
                        <DialogActions>
                            <Button onClick={() => setShowAddAttributeValue(false)}>
                                لغو
                            </Button>
                            <Button onClick={addAttributeSelectValue}>ایجاد</Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>
            </FormGroup>
        </Box>
    )
}

export default NewAttributeValue