"use client";

import React from "react";
import emailjs from "@emailjs/browser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Button } from "../../button";

const ContactForm = () => {
  const [condition, setCondition] = React.useState<boolean>(false);

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (form.current) {
      try {
        const response = await emailjs.sendForm(
          "service_v1xftbh",
          "template_4u1jmt9",
          form.current,
          "d5v8gYI0Ev9r_ATt-"
        );

        if (response.status === 200) {
          setCondition(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Form reference is null");
    }
  };

  // Define `form` with the correct type `HTMLFormElement`
  const form = React.useRef<HTMLFormElement>(null);

  return (
    <section className="w-full max-w-5xl px-4 mx-auto md:text-left space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
          We love coming up with fresh ideas to increase conversions!
        </h1>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Form</CardTitle>
            <CardDescription>We are ready to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              ref={form}
              onSubmit={handleFormSubmission}
              className="space-y-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
                <div className="space-y-6 pb-2">
                  <Label>Name</Label>
                  <Input name="user_name" />
                </div>
                <div className="space-y-6 pb-2">
                  <Label>Email</Label>
                  <Input name="user_email" />
                </div>
              </div>
              <div className="space-y-6  pb-2">
                <Label>Subject</Label>
                <Input name="user_select" />
              </div>
              <div className="space-y-6 pb-2">
                <Label>Description</Label>
                <Textarea name="user_message" />
              </div>
              <span className="flex justify-end mt-5">
                <Button type="submit">Submit</Button>
              </span>
            </form>
            {condition && <p className="text-green-500">Message sent</p>}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
