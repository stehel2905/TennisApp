import React, {useEffect} from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";

function logData(data){
    console.log(data);
}

export function RegistrerSpiller(){
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    useEffect(() => {
      logData(data)
    }, [data]);
    return (
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>

            <input {...register("firstName")} placeholder="Fornavn" />
            <input {...register("lastName")} placeholder="Etternavn" />

            <input type="submit" />
        </form>
    );
}
