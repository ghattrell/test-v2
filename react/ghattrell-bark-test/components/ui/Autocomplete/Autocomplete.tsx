import React, { useCallback } from 'react'
import AsyncSelect, { AsyncProps, Props as SelectAsyncProps } from 'react-select/async'
import { Props as SelectProps, OptionTypeBase } from 'react-select'
import debounce from "lodash.debounce"


interface Props extends SelectProps<OptionTypeBase, false> {
    className?: string
    loadOptionsFor: 'locations' | 'services'
    defaultOptions?: SelectOption[] | []
    label?: string
    name: string
    setDropdownData: (...args: any) => any
    setValue: (...args: any) => void
}

interface AutoCompleteVars {
    type: Variant
    value: string
    setDropdownData: (...args: any) => any
}

interface APIResponse {
    value: number
    text: string
}

type SelectOption = {
    value: number
    label: string
}

type Variant = 'services' | 'locations'

const Autosuggest: React.FC<Props> = ({ name, label, loadOptionsFor, setDropdownData, defaultOptions, placeholder, setValue }) => {

    const handleAutoComplete = async ({ type, value, setDropdownData }: AutoCompleteVars, callback: (data: SelectOption[]) => any) => {
        const baseApi = 'http://localhost:4000/api/';

        if (value) {
            let response = await fetch(`${baseApi}${type}/?q=${value}`)
            let body: APIResponse[] = await response.json();

            let dropDownData: SelectOption[] = body.map(({ value, text }) => {
                return {
                    value,
                    label: text
                }
            })

            setDropdownData(dropDownData)
            return callback(dropDownData)
        }
    }

    const handleAutoCompleteChange = useCallback(debounce(handleAutoComplete, 500), []);

    const handleChange = (inputValue: any): void => {
        setValue(inputValue?.value || null);
    }

    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <AsyncSelect
                isClearable
                instanceId={name}
                loadOptions={(inputValue, callback) => { handleAutoCompleteChange({ type: loadOptionsFor, value: inputValue, setDropdownData }, callback) }}
                onChange={handleChange}
                defaultOptions={defaultOptions}
                placeholder={placeholder}
                name={name}
            />
        </>
    )
}

export default Autosuggest