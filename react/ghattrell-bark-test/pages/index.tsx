import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "@components/core";
import { Container, Text, Input, Button, Autocomplete } from "@components/ui";
import debounce from "lodash.debounce"
import AsyncSelect from "react-select/async";

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
    };

    return (
        <Layout>
            <Container>
                <form onSubmit={handleSubmitBark}>
                    <Text variant="heading" className="mb-1">
                        Find the perfect professional for you
                    </Text>
                    <Text variant="body">Get free quotes within minutes</Text>
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="category-select"
                            setDropdownData={setCategoryData}
                            loadOptionsFor="services"
                            defaultOptions={categoryData}
                            placeholder="Enter a service (Personal Trainers etc)"
                            name="category-select"
                            setValue={setCategoryId}
                        />
                    </div>
                    <div className="pb-4">
                        <Autocomplete
                            label={"What service are you looking for?"}
                            instanceId="location-select"
                            setDropdownData={setLocationData}
                            loadOptionsFor="locations"
                            defaultOptions={locationData}
                            placeholder="Enter a location (London etc)"
                            name="location-select"
                            setValue={setLocationId}
                        />
                    </div>
                    <Input
                        label="Your Name"
                        name="fullname"
                        type="text"
                        placeholder="Enter name"
                        onChange={setName}
                    />
                    <Input
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={setEmail}
                    />
                    <Input
                        label="Telephone"
                        name="telephone"
                        type="text"
                        placeholder="Enter a location telephone"
                        onChange={setTelephone}
                    />
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
