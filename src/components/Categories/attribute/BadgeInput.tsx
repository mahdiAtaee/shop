'use client';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import { Theme } from '@mui/material';
import { makeStyles, createStyles } from "@mui/styles";
import { useCategoriesState } from '../context';

const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    width: "100%",
    padding: theme.spacing(0)
  },
  badge: {
    //"bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center",
    padding: theme.spacing(1, 2.5),
    margin: theme.spacing(1, 0),
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    position: "relative"
  },
  removeBadge: {
    display: "flex",
    gap: "0.3rem",
  },
  removeIcon: {
    border: 'none',
    background: "transparent",
    color: theme.palette.error.light,
    cursor: "pointer",
    position: "absolute",
    top: "1px",
    left: "1px"
  }
}))

interface IBadgeInputProps {
  title: string,
  placeholder: string,
  hashID: string
}

export default function BadgeInput({ title, placeholder, hashID }: IBadgeInputProps) {
  const styles = useStyles()
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const { dispatch } = useCategoriesState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // اگه آخرش کاما بود، تبدیل به تگ بشه
    if (value.endsWith(',')) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput('');
      dispatch({
        type: "UPDATE_ATTRIBUTE_VALUES",
        payload: {
          hash: hashID,
          value: value.split(',')[0].toString()
        }
      })
    } else {
      setInput(value);
    }

  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        fullWidth
        id="values"
        name="values"
        value={input}
        label={title}
        variant="outlined"
        placeholder={placeholder}
        onChange={handleChange}
        helperText="مقادیر چندتایی را با ویرگول از هم جدا کنید"
      />
      <div className={styles.removeBadge}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={styles.badge}
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className={styles.removeIcon}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
