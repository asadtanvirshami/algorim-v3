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
import { Label } from "../../label";
import { Button } from "../../button";
import { Input } from "../../input";

const NewsLetterSection = () => {
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
    <section className="w-full max-w-5xl px-4 mx-auto text-center md:text-left space-y-12">
      <Card className="bg-white dark:text-black">
        <CardHeader>
          <CardTitle className="text-2xl">Join Our Newsletter</CardTitle>
          <CardDescription>
            Get updates, smart tips, and special offers from Algorim. No spam,
            just value!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            ref={form}
            onSubmit={handleFormSubmission}
            className="space-y-2 container"
          >
            <div className="flex w-full gap-4">
              <span className="space-y-2 w-full pb-2">
                <Label>Email</Label>
                <Input
                  placeholder="xyz@gmail.com"
                  className="border dark:border-black"
                  name="user_email"
                />
              </span>
              <span className="flex justify-end mt-5">
                <Button className="bg-black text-white" variant="default" type="submit">Subscribe</Button>
              </span>
            </div>
          </form>
          {condition && <p className="text-green-500">You have subscribed</p>}
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsLetterSection;
