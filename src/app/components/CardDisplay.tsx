"use client";

import React from "react";
import Card from "./Card";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { initializeUserView } from "../../../slices/counterSlice";

export default function CardDisplay() {
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const userListData = useSelector((state: RootState) => state.counter.listUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      const dataFromServer = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      const responeFromServer = dataFromServer;

      if (responeFromServer.data.data.length !== 0) {
        dispatch(initializeUserView(responeFromServer.data.data));
      } else {
        alert("Page " + currentPage + " data not found");
      }
      setLoading(false);
    };

    getUserDetails();
  }, [currentPage]);

  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="displayCard">
        {userListData?.map((data: any) => {
          return <Card key={data.id} email={data.email} imageurl={data.avatar} body={data.first_name} />;
        })}
      </div>
      <div className="body-container">
        <Pagination count={10} page={currentPage} onChange={handleChange} />
      </div>
    </>
  );
}
