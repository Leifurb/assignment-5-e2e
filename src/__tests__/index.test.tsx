import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, test, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "../pages/index";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here

// describe("Home", () => {
//   // TODO Add your react-testing-library tests here
// });
