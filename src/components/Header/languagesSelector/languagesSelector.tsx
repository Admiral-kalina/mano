'use client'
import React from 'react';

//libraries
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import { Select } from "antd";
const { Option } = Select;

//utils
import {changeUserLanguage} from "@/features/userSlice/userSlice";

//mockData
import { languagesList } from "@/mockData/languagesList";

//styles
import styles from "./languagesSelector.module.scss";


export const LanguagesSelector = () => {
    const dispatch = useDispatch();
    const {preferredLanguage} = useSelector((store:RootState) => store.user);

    const handleChange = (value:string) => {
        dispatch(changeUserLanguage(value))
    };

    return (
        <div>
            <Select className={styles.select}
                    onChange={(e) => handleChange(e)}
                    value={preferredLanguage}
            >
                {languagesList.map(ln => (
                      <Option
                          key={ln.id}
                          value={ln.name}
                      >
                          {ln.name}
                      </Option>
                ))}
            </Select>
        </div>
    );
};

export default LanguagesSelector;