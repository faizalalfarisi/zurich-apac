"use client";
import * as React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import AppBars from "../components/AppBars";
import CardDisplay from "../components/CardDisplay";

export default function Profile() {
  return (
    <>
      <Provider store={store}>
        <AppBars />
        <CardDisplay />
      </Provider>
    </>
  );
}
