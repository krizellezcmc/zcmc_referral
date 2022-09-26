import React from "react";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import DefaultMentionStyle from "./DefaultMentionStyle";
import DefaultStyle from "./DefaultStyle";

const users = [
  {
    id: "alyana",
    display: "Alyana",
  },
  {
    id: "krizelle",
    display: "Krizelle",
  },
];

const fetchUsers = (query, callback) => {
  if (!query) return;

  setTimeout(() => {
    const filteredUsers = users.filter((user) =>
      user.display.toLowerCase().includes(query)
    );
    callback(filteredUsers);
  }, 1000);
};

const MentionSample = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <MentionsInput
        style={DefaultStyle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        a11ySuggestionsListLabel={"Suggested mentions"}
      >
        <Mention style={DefaultMentionStyle} data={fetchUsers} />
      </MentionsInput>
    </div>
  );
};

export default MentionSample;
