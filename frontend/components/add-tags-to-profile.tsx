"use client";

import { random } from "@/utils/functions";
import React from "react";
import { Button } from "@/ui/button";

const AddTagsToProfile = () => {
  return (
    <div>
      <Button size="sm" onClick={random}>
        Click me
      </Button>
    </div>
  );
};

export default AddTagsToProfile;
