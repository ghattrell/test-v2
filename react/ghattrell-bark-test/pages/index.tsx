import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "@components/core";
import { Container, Text, Input, Button, Autocomplete } from "@components/ui";

type SelectOption = {
    value: number
    label: string
}

export default function Bark() {
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [locationId, setLocationId] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [categoryData, setCategoryData] = useState<SelectOption[] | []>([]);
    const [locationData, setLocationData] = useState<SelectOption[] | []>([]);

    const handleSubmitBark = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault()
        console.log(categoryId, locationId)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    };

    const handleChange = (setter) => (optionValue, actionMeta) => {
        setter(optionValue ? optionValue.value : null);
    }

    return (
        <Layout>
            <Container>
                <form onSubmit={handleSubmitBark}>
                    <Text variant="heading" className="mb-1">
                        Find the perfect professional for you
                    </Text>
                    <Text variant="body" className="mb-4 text-accents-7">Get free quotes within minutes</Text>
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="category-select"
                            setDropdownData={setCategoryData}
                            onChange={handleChange(setCategoryId)}
                            loadOptionsFor="services"
                            defaultOptions={categoryData}
                            placeholder="Enter a service (Personal Trainers etc)"
                            name="category-select"
                        />
                    </div>
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="location-select"
                            onChange={handleChange(setLocationId)}
                            setDropdownData={setLocationData}
                            loadOptionsFor="locations"
                            defaultOptions={locationData}
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
