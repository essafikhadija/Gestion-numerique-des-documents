import React from 'react';
import DatePicker from "react-datepicker";


const renderField = ({input, label, classCss, type, meta: {touched, error}}) => (
    <fieldset>
        <div className="form-group row MuiTableCell-root">
            <label className="label">{label}</label>
            <input {...input} placeholder={label} type={type} className={classCss + " col-md-10"}/>
            {touched && ((error &&
                <span className="spanError">{error}</span>))}
        </div>
    </fieldset>
);
const renderFieldTextarea = ({input, label, classCss, type, meta: {touched, error, warning}}) => (
    <fieldset>
        <div className="form-group row MuiTableCell-root">
            <label className="label">{label}</label>
            <textarea {...input} placeholder={label} type={type} className={classCss + " col-md-10"}/>
            {touched && ((error &&
                <span className="spanError">{error}</span>) || (warning &&
                <span>{warning}</span>))}
        </div>
    </fieldset>
);
const datePicker = ({input, label, className, selected,disabled, meta: {touched, error}}) => {
    return (
        <fieldset>
            <div className="form-group row MuiTableCell-root">
                <label className="label">{label}</label>
                <DatePicker {...input}
                            selected={selected || new Date()}
                            placeholder={label}
                            disabled={disabled}
                            dateFormat="yyyy-MM-dd"
                            className={className}
                />
                {touched && error && <span style={{fontSize: 14, color: "red"}} className="error_field">{error}</span>}
            </div>
        </fieldset>
    )
};

export default {renderField, datePicker, renderFieldTextarea};