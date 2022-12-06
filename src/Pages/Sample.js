import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import whatsappApi from "../API/WhatsappApi";

function Sample(props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [recipient, setRecipient] = useState("");

  // let url =
  //   "https://res.cloudinary.com/djihwopsi/image/upload/v1665384710/sample";

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   // console.log(file);
  //   const data = new FormData();
  //   data.append("file", file[0]);
  //   console.log(file[0]);
  //   data.append("upload_preset", "nbqowi6h");
  //   setLoading(true);

  //   let res = await axios.post(
  //     "https://api.cloudinary.com/v1_1/djihwopsi/image/upload",
  //     data
  //   );
  //   const fileName = await res.data;
  //   console.log(fileName.secure_url);
  // };

  const send = async (e) => {
    try {
      let res = await whatsappApi.post("/messages", {
        messaging_product: "whatsapp",
        to: "639357326457",
        type: "template",
        template: { name: "hello_world", language: { code: "en_US" } },
      });

      if (res.status === 200) {
        console.log("success");
      } else {
        console.log("Failed to send");
      }
    } catch (error) {
      console.log(error.response.data.error.error_data.details); // this is the main part. Use the response property from the error object
    }
  };

  // useEffect(() => {
  //   getImg();
  // }, []);
  return (
    <div>
      {/* <Input type="file" onChange={(e) => setFile(e.target.files)} />
      <Button onClick={handleUpload}>Upload</Button> */}

      <Input onChange={(e) => setRecipient(e.target.value)} />
      <Button onClick={send}>Send</Button>
    </div>
  );
}

export default Sample;
