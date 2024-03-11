'use client'
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Select } from "antd";
const { Option } = Select;

import { changeUserLanguage } from "@/features/userSlice/userSlice";

import { languagesList } from "@/mockData/languagesList";

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