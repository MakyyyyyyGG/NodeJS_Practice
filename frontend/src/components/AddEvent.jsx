import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { useUser } from "@/context/UserContext";
import { Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const AddEvent = ({ onEventAdded }) => {
  const { userdata } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const fileInputRef = React.useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(true);

  const onSubmit = async (data) => {
    if (!date?.from) {
      setDateError(true);
      return;
    }

    const eventData = {
      ...data,
      user_id: userdata.user.user_id,
      startDate: date.from,
      endDate: date.to,
    };
    //post data in api with axios
    try {
      const res = await axios.post(
        "http://localhost:5000/events/post",
        eventData
      );
      if (res.status === 200) {
        console.log(res.data);
        if (onEventAdded) {
          onEventAdded();
        }
        // Reset form
        reset();
        setDate(null);
        setSelectedFiles([]);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Event</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>

            <DialogDescription>
              Add a new event to the calendar
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              placeholder="Title"
              {...register("title", { required: "This is required" })}
            />
            {errors.title?.message}

            <Textarea
              placeholder="Description"
              {...register("description", { required: "This is required" })}
            />
            {errors.description?.message}
            <div>
              <DatePickerWithRange
                date={date}
                setDate={(newDate) => {
                  setDate(newDate);
                  setDateError(false);
                }}
              />
              {dateError && <p className="text-red-500">Date is required</p>}
            </div>
            <div className="flex gap-2 items-center">
              <h1>Attach Image/s</h1>
              <Button type="button" onClick={handleUploadClick}>
                Upload
              </Button>
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                multiple
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <Button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-0 right-0 p-3 m-2  bg-red-500 text-white"
                  >
                    <Trash />
                  </Button>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEvent;
