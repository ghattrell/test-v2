import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "@components/core";
import { Container, Text, Input, Button, Autocomplete } from "@components/ui";
import {ValueType, ActionMeta, OptionTypeBase} from 'react-select';
import { ApiError } from "next/dist/next-server/server/api-utils";

type SelectOption = {
    value: number
    label: string
}

type Error = {
    message: string
}

interface CreateLeadResponse {
    errors?: []
    status: boolean
}

export default function Bark() {
    const [categoryData, setCategoryData] = useState<SelectOption | null>(null);
    const [locationData, setLocationData] = useState<SelectOption | null>(null);
    const [email, setEmail] = useState("");
    const [phone, setTelephone] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [categoryDropdownOptions, setCategoryDropdownOptions] = useState<SelectOption[] | []>([]);
    const [locationDropdownOptions, setLocationDropdownOptions] = useState<SelectOption[] | []>([]);
    const [error, setError] = useState<Error | false>(false);

    const validate = (): boolean => {
        let isValid = email.length && name.length && phone.length > 6 && categoryData && categoryData.value > 0 && locationData && locationData.value > 0

        return !!isValid;
    }

    const handleValidation = () => {
        let isValid = validate()

        if (isValid) {
            setError(false);
        } else {
            setError({message: 'There was a problem creating your request please try again.'})
        }

        return isValid
    }

    const handleSubmitBark = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault()

        setLoading(true);
        if (handleValidation() === false) {
            setLoading(false);
            return
        }

        let formData = {
            service_id_text: categoryData?.label,
            service_id: categoryData?.value,
            location_id: locationData?.value,
            location_id_text: locationData?.value,
            name,
            email,
            phone
        }

        try {
            let response = await fetch('http://localhost:4000/api/leads', {
                method: 'post',
                body: JSON.stringify(formData)
            })

            const { status }: CreateLeadResponse = await response.json();

            if (status === true) {
                console.log('yeah, we have created your project')
            }

            setLoading(false);
        } catch ({errors}) {
            setLoading(false);
        }
    };

    const handleAutoCompleteChange = (setter: React.Dispatch<React.SetStateAction<SelectOption | null>>) => (optionChosen: ValueType<OptionTypeBase, false>) => {
        if (!optionChosen) {
            setter(null)
            return
        }

        let value = (optionChosen as SelectOption)
        setter(value)
    }


    return (
        <Layout>
            <Container>
                <form onSubmit={handleSubmitBark}>
                    <Text variant="heading" className="mb-1">
                        Find the perfect professional for you
                    </Text>
                    <Text variant="body" className="mb-4 text-accents-7">Get free quotes within minutes</Text>
                    {error && (
                        <div className="text-red border border-red p-3 mb-5">{error.message}</div>
                    )}
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="category-select"
                            setDropdownData={setCategoryData}
                            onChange={handleAutoCompleteChange(setCategoryData)}
                            loadOptionsFor="services"
                            defaultOptions={setCategoryDropdownOptions}
                            placeholder="Enter a service (Personal Trainers etc)"
                            name="category-select"
                        />
                    </div>
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="location-select"
                            onChange={handleAutoCompleteChange(setLocationData)}
                            setDropdownData={setLocationData}
                            loadOptionsFor="locations"
                            defaultOptions={setLocationDropdownOptions}
                            placeholder="Enter a location (London etc)"
                            name="location-select"
                        />
                    </div>
                    <div className="pb-4"></div>
                    <Input
                        label="Your Name"
                        name="fullname"
                        type="text"
                        placeholder="Enter name"
                        onChange={setName}
                    />
                    <div className="pb-4"></div>
                    <Input
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={setEmail}
                    />
                    <div className="pb-4"></div>
                    <Input
                        label="Telephone"
                        name="telephone"
                        type="text"
                        placeholder="Enter a location telephone"
                        onChange={setTelephone}
                    />
                    <div className="pb-4"></div>
                    <div className="pt-3">
                        <Button
                            variant="slim"
                            type="submit"
                            loading={loading}
                            disabled={disabled}
                        >
                            Find Professionals
                        </Button>
                    </div>
                </form>
            </Container>
        </Layout>
    );
}
