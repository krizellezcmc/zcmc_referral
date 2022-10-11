import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Sample(props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  // let url =
  //   "https://res.cloudinary.com/djihwopsi/image/upload/v1665384710/sample";

  const handleUpload = async (e) => {
    e.preventDefault();
    // console.log(file);
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "nbqowi6h");
    setLoading(true);

    let res = await axios.post(
      "https://api.cloudinary.com/v1_1/djihwopsi/image/upload",
      data
    );
    const fileName = await res.data;
    console.log(fileName.secure_url);
  };

  // useEffect(() => {
  //   getImg();
  // }, []);
  return (
    <div>
      <Input type="file" onChange={(e) => setFile(e.target.files)} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default Sample;
