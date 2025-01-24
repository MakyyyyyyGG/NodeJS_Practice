import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //post data in api with axios
    try {
      const res = await axios.post("http://localhost:5000/events/post", data);
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {}
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Input {...register("firstname", { required: "This is required" })} />
        {errors.firstname?.message}

        {/* include validation with required or other standard HTML validation rules */}
        <Input {...register("description", { required: "This is required" })} />
        {/* errors will return when field validation fails  */}
        {errors.description?.message}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Home;
