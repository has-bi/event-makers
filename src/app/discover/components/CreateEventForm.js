"use client";

import { useState } from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDatetime: "",
    endDatetime: "",
    location: "",
    capacity: "",
    status: "OPEN",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.startDatetime)
      newErrors.startDatetime = "Start date is required";
    if (!formData.endDatetime) newErrors.endDatetime = "End date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.capacity || formData.capacity < 1)
      newErrors.capacity = "Valid capacity is required";

    // Convert string dates to Date objects for comparison
    const startDate = new Date(formData.startDatetime);
    const endDate = new Date(formData.endDatetime);

    // Add console logs for debugging
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Start Date ISO:", formData.startDatetime);
    console.log("End Date ISO:", formData.endDatetime);

    // Ensure both dates are valid before comparing
    if (
      startDate.toString() !== "Invalid Date" &&
      endDate.toString() !== "Invalid Date"
    ) {
      if (endDate <= startDate) {
        newErrors.endDatetime = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const requestBody = {
        title: formData.title,
        description: formData.description,
        startDatetime: new Date(formData.startDatetime).toISOString(),
        endDatetime: new Date(formData.endDatetime).toISOString(),
        location: formData.location,
        capacity: parseInt(formData.capacity),
        status: formData.status,
        image: formData.image,
      };

      console.log("Sending request:", requestBody);

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Log the raw response
      console.log("Response status:", response.status);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData);
        throw new Error(errorData || "Failed to create event");
      }

      const data = await response.json();
      console.log("Success response:", data);

      // Only redirect if we get here
      router.push("/discover");
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        submit: error.message || "Failed to create event. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create New Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-60 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG or JPG (MAX. 2MB)</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <Input
          label="Event Title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          isInvalid={!!errors.title}
          errorMessage={errors.title}
        />

        <Textarea
          label="Description"
          placeholder="Describe your event"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          isInvalid={!!errors.description}
          errorMessage={errors.description}
          minRows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
          <Input
            type="datetime-local"
            label="Start Event"
            labelPlacement="inside"
            placeholder=" "
            value={formData.startDatetime}
            onChange={(e) =>
              setFormData({ ...formData, startDatetime: e.target.value })
            }
            isInvalid={!!errors.startDatetime}
            errorMessage={errors.startDatetime}
          />

          <Input
            type="datetime-local"
            label="End Event"
            labelPlacement="inside"
            placeholder=" "
            value={formData.endDatetime}
            onChange={(e) =>
              setFormData({ ...formData, endDatetime: e.target.value })
            }
            isInvalid={!!errors.endDatetime}
            errorMessage={errors.endDatetime}
          />
        </div>

        <Input
          label="Location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          isInvalid={!!errors.location}
          errorMessage={errors.location}
        />

        <Input
          type="number"
          label="Capacity"
          placeholder="Enter maximum number of participants"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
          isInvalid={!!errors.capacity}
          errorMessage={errors.capacity}
        />

        {errors.submit && (
          <div className="text-red-500 text-sm">{errors.submit}</div>
        )}

        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={isLoading}
          size="lg"
        >
          {isLoading ? "Creating Event..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
